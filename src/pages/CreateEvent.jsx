import axios from "axios";
import React, { useActionState } from "react";
import { useNavigate } from "react-router";

export default function CreateEvent() {
  const navigate = useNavigate();

  async function submitHandler(prev, formData) {
    const token = JSON.parse(localStorage.getItem("token"));

    const newEvent = {
      title: formData.get("title"),
      description: formData.get("description"),
      date: formData.get("date"),
      location: formData.get("location"),
      latitude: Number(formData.get("latitude")),
      longitude: Number(formData.get("longitude")),
    };

    const res = await axios.post(
      "http://localhost:3001/api/events",
      newEvent,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    navigate(`/events/${res.data.id}`);
  }

  const [state, formAction, isPending] = useActionState(submitHandler, {});

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Create Event</h1>

      <form action={formAction} className="flex flex-col gap-4 max-w-xl">
        <input className="input input-bordered" name="title" placeholder="Title" />

        <textarea
          className="textarea textarea-bordered"
          name="description"
          placeholder="Description"
        />

        <input className="input input-bordered" type="datetime-local" name="date" />

        <input className="input input-bordered" name="location" placeholder="Location" />

        <input className="input input-bordered" name="latitude" placeholder="Latitude" />

        <input className="input input-bordered" name="longitude" placeholder="Longitude" />

        <button className="btn btn-primary" type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}