import { useNavigate } from "react-router";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Home() {
  // This stores the events we get from the API
  const [events, setEvents] = useState([]);

const navigate = useNavigate();

  // This runs once when the Home page loads
  useEffect(() => {
    async function getEvents() {
      // Ask the backend API for all events
      const res = await axios.get("http://localhost:3001/api/events");

      console.log(res.data);
      // Save the events into React state
      setEvents(res.data.results);
    }

    getEvents();
  }, []);

 return (
  <div className="p-6">

    <h1 className="text-3xl font-bold mb-6">
      Upcoming Events
    </h1>

    <div className="grid gap-4">

      {events.map((event) => (

        <div
          key={event.id}
  onClick={() => navigate(`/events/${event.id}`)}
          className="bg-white shadow-md rounded-xl p-4 border cursor-pointer hover:scale-[1.01] transition"
        >

          <h2 className="text-xl font-bold mb-2">
            {event.title}
          </h2>

          <p className="text-gray-600 mb-2">
            {event.description}
          </p>

          <p className="text-sm">
            📅 {event.date}
          </p>

          <p className="text-sm">
            📍 {event.location}
          </p>

        </div>

      ))}

    </div>

  </div>
);
}