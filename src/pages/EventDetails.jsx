import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";


export default function EventDetails() {
 const { id } = useParams();
 const [event, setEvent] = useState(null);


 useEffect(() => {
   async function getEvent() {
     const res = await axios.get(`http://localhost:3001/api/events/${id}`);
     setEvent(res.data);
   }


   getEvent();
 }, [id]);


 if (!event) {
   return <p>Loading event...</p>;
 }


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
