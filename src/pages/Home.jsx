// useNavigate lets us move users to another page programmatically
import { useNavigate } from "react-router";

import axios from "axios";
import React, { useEffect, useState } from "react";

// Main homepage component - displays all events
export default function Home() {
  // This stores the events we get from the API - starts as empty
  const [events, setEvents] = useState([]);

  // React Router navigation function
  const navigate = useNavigate();

  // This runs only once when the Home page loads
  //  [] means "run only once"
  useEffect(() => {
    // Async function to fetch events from backend
    async function getEvents() {
      // Send GET request to backend API
      // Backend returns all events
      const res = await axios.get("http://localhost:3001/api/events");

      // Debugging: can remove later
      console.log(res.data);

      // Save the events into React state
      // IMPORTANT:
      // API returns an object:
      // {
      //   results: [...]
      // }
      //
      // So we specifically store:
      // res.data.results
      //
      // Earlier bug:
      // accidentally stored res.data
      // which caused:
      // "events.map is not a function"
      //
      // because res.data was an object,
      // not an array.

      setEvents(res.data.results);
    }

    // Call async function
    getEvents();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header section */}
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-600">
          Discover what is happening next
        </p>

        <h1 className="text-4xl font-bold text-slate-900">
          Upcoming Events
        </h1>

        <p className="mt-2 max-w-2xl text-slate-600">
          Browse events, view details, and create your own when you are logged in.
        </p>
      </div>

      {/* Grid container for event cards */}
      {/* Mobile: 1 column | Tablet: 2 columns | Desktop: 3 columns */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* Loop through all events */}
        {/* map() creates one card per event */}
        {events.map((event) => (
          <div
            // React requires unique key for lists
            key={event.id}
            // When card clicked:
            // navigate user to dynamic event page
            //
            // Example:
            // /events/1
            // /events/2
            onClick={() => navigate(`/events/${event.id}`)}
            className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Small category/date style badge */}
            <div className="mb-4 inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
              Event
            </div>

            <h2 className="mb-3 text-2xl font-bold text-slate-900 group-hover:text-cyan-700">
              {event.title}
            </h2>

            <p className="mb-5 line-clamp-3 text-slate-600">
              {event.description}
            </p>

            <div className="space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-700">
              <p>📅 {event.date}</p>

              <p>📍 {event.location}</p>
            </div>

            <p className="mt-5 text-sm font-semibold text-cyan-600">
              View details →
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}