import axios from "axios";
import React, { useEffect, useState } from "react";

// useParams gets dynamic values from the URL
// Example: /events/3 gives us id = "3"
import { useParams } from "react-router";

// EventDetails component
// This page displays ONE event based on the ID in the URL
export default function EventDetails() {
  // Get the event id from the URL
  // If URL is /events/3, id will be "3"
  const { id } = useParams();

  // State to store the single event we fetch from the API
  // Starts as null because we do not have the event yet
  const [event, setEvent] = useState(null);

  // Runs when the page loads
  // Also runs again if the id changes
  useEffect(() => {
    // Async function to fetch one event
    async function getEvent() {
      // Send GET request to backend for one event by ID
      const res = await axios.get(`http://localhost:3001/api/events/${id}`);

      // Save the event data into state
      setEvent(res.data);
    }

    // Call the function / [id] any change
    getEvent();
  }, [id]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-700">Loading event...</p>
      </div>
    );
  }

  // Once event data exists, show the event details
  return (
    // Full screen background image
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative grayscale px-4 py-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1638132704781-d1bdc0f43a6c?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Event details card */}
      <div className="relative z-10 w-full max-w-2xl bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-600 mb-2">
          Event Details
        </p>

        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          {event.title}
        </h1>

        <p className="text-slate-600 mb-6">{event.description}</p>

        <div className="space-y-3 border-t border-slate-200 pt-5 text-slate-700">
          <p>
            📅{" "}
            {new Date(event.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <p>📍 {event.location}</p>
        </div>
      </div>
    </div>
  );
}
