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
   return <p>Loading event...</p>;
 }

// Once event data exists, show the event details

 return (
   <div className="p-6">
     <div className="bg-white shadow-md rounded-xl p-6 border max-w-2xl">
       <h1 className="text-3xl font-bold mb-4">{event.title}</h1>


       <p className="text-gray-600 mb-4">{event.description}</p>


       <p>📅 {event.date}</p>
       <p>📍 {event.location}</p>
     </div>
   </div>
 );
}
