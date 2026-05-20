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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>

      <div className="grid gap-4">
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
            className="bg-white shadow-md rounded-xl p-4 border cursor-pointer hover:scale-[1.01] transition"
          >
            <h2 className="text-xl font-bold mb-2">{event.title}</h2>

            <p className="text-gray-600 mb-2">{event.description}</p>

            <p className="text-sm">📅 {event.date}</p>

            <p className="text-sm">📍 {event.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
