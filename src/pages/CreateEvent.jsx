import axios from "axios";
import React, { useActionState } from "react";
// useNavigate lets us redirect after creating an event
import { useNavigate } from "react-router";

export default function CreateEvent() {
  // React Router navigation function
  const navigate = useNavigate();

  // Runs when the form is submitted
  async function submitHandler(prev, formData) {
    // Get token from localStorage
    // This proves the user is logged in
    const token = JSON.parse(localStorage.getItem("token"));

    // Create an event object using form input values
    const newEvent = {
      title: formData.get("title"),
      description: formData.get("description"),
      date: formData.get("date"),
      location: formData.get("location"),

      // Keeping these for backend compatibility
      latitude: 0,
      longitude: 0,
    };

    // Send POST request to create a new event
    // The Authorization header sends the token to the backend
    const res = await axios.post(
      "http://localhost:3001/api/events",
      newEvent,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // After event is created, redirect to specific event page
    navigate(`/events/${res.data.id}`);
  }

  // useActionState handles form submission state
  // state:
  // stores returned values, not heavily used here
  //
  // formAction:
  // connected to <form action={formAction}>
  //
  // isPending:
  // true while the event is being created
  const [state, formAction, isPending] =
    useActionState(submitHandler, {});

  return (
    // Full screen background image
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative grayscale"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1638132704904-58d5ebe85aa5?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Create Event Card */}
      <div className="relative z-10 w-full max-w-xl bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl">

        <h1 className="text-4xl font-bold text-center mb-2">
          Create Event
        </h1>

        <p className="text-center text-slate-500 mb-6">
          Share your next event with the community
        </p>

        {/* Create event form */}
        <form action={formAction} className="flex flex-col gap-4">

          <input
            className="input input-bordered w-full"
            name="title"
            placeholder="Event Title"
          />

          <textarea
            className="textarea textarea-bordered w-full"
            name="description"
            placeholder="Event Description"
          />

          <input
            className="input input-bordered w-full"
            type="datetime-local"
            name="date"
          />

          <input
            className="input input-bordered w-full"
            name="location"
            placeholder="Event Location"
          />

          <button
            className="btn btn-primary w-full mt-2"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Event"}
          </button>

        </form>

      </div>
    </div>
  );
}