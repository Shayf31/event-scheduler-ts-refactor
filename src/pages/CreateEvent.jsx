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
      latitude: Number(formData.get("latitude")),
      longitude: Number(formData.get("longitude")),
    };

    // Send POST request to create a new event
    // The Authorization header sends the token to the backend
    const res = await axios.post("http://localhost:3001/api/events", newEvent, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
  const [state, formAction, isPending] = useActionState(submitHandler, {});

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Create Event</h1>

      {/* Create event form */}
      <form action={formAction} className="flex flex-col gap-4 max-w-xl">
        <input
          className="input input-bordered"
          name="title"
          placeholder="Title"
        />

        <textarea
          className="textarea textarea-bordered"
          name="description"
          placeholder="Description"
        />

        <input
          className="input input-bordered"
          type="datetime-local"
          name="date"
        />

        <input
          className="input input-bordered"
          name="location"
          placeholder="Location"
        />

        <button className="btn btn-primary" type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}
