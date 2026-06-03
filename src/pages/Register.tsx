import axios from "axios";
// useActionState = handles form actions/submissions
import React, { useActionState, useState } from "react";
import { useNavigate } from "react-router";

export default function Register() {
  // useActionState handles form submission state
  //
  // state:
  // stores returned state values (not heavily used here)
  //
  // formAction:
  // attached to form action={}
  //
  // isPending:
  // true while request is running
  const [state, formAction, isPending] = useActionState(
  submitHandler,
  undefined
);

  const [error, setError] = useState<string>("");

  // Used to redirect user after successful signup
  const navigate = useNavigate();

  // submitHandler runs when the form is submitted
  async function submitHandler(
  prev: void,
  formData: FormData
): Promise<void> {
    // Clear any previous errors before new request
    setError("");

    try {
      // Get values from form inputs
      // formData.get() reads input values by their "name"
      const email = formData.get("email");
      const password = formData.get("pass");

      // Send POST request to backend API
      // Creates a new user account
      await axios.post("http://localhost:3001/api/users", {
        email,
        password,
      });

      // If successful:
      // redirect user to login page
      navigate("/login");
    } catch (err) {
      console.log(err);
      setError("Registration failed. Try a different email or password.");
    }
  }

  return (
    // Full screen background image
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative grayscale"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1638132704795-6bb223151bf7?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Registration Card */}
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl">

        <h1 className="text-4xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-center text-slate-500 mb-6">
          Join Event Scheduler today
        </p>

        {error && (
          <p className="text-red-500 text-center mb-4">
            {error}
          </p>
        )}

        {/* Form */}
        {/* action={formAction} connects form to useActionState */}
        <form action={formAction} className="flex flex-col gap-4">

          <input
            className="input input-bordered w-full"
            type="text"
            name="email"
            placeholder="Email Address"
          />

          <input
            className="input input-bordered w-full"
            type="password"
            name="pass"
            placeholder="Password"
          />

          <input
            type="submit"
            value={isPending ? "Registering..." : "Create Account"}
            className="btn btn-primary w-full mt-2"
            disabled={isPending}
          />

        </form>
      </div>
    </div>
  );
}