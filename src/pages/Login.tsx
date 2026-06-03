import axios from "axios";
import React, { useActionState, useState } from "react";
import { useNavigate } from "react-router";

// Type for the login API response
// Backend sends back a JWT token after successful login
interface LoginResponse {
  token: string;
}

// This page authenticates users
export default function Login() {
  // useActionState = handles form submissions
  // state:
  // stores returned values (not heavily used here)
  //
  // formAction:
  // attached to form action={}
  //
  // isPending:
  // true while login request is running
  const [state, formAction, isPending] = useActionState(submitHandler, undefined);

  const [error, setError] = useState<string>("");

  // Used to redirect user after successful login
  const navigate = useNavigate();

  // submitHandler runs when the login form is submitted
  async function submitHandler(
    prev: void,
    formData: FormData
  ): Promise<void> {
    // Clear previous errors before new login attempt
    setError("");

    try {
      // Get values from form inputs
      // Reads inputs by their "name"
      const email = formData.get("email") as string;
      const password = formData.get("pass") as string;

      // Send POST request to backend login endpoint
      // Backend validates credentials
      const res = await axios.post<LoginResponse>(
        "http://localhost:3001/api/auth/login",
        {
          email,
          password,
        }
      );

      // Backend returns a JWT token
      // Save token into localStorage
      //
      // localStorage persists even after page refresh
      localStorage.setItem("token", JSON.stringify(res.data.token));

      // Redirect user to homepage after successful login
      navigate("/");
    } catch (err) {
      console.log(err);

      // Show error message to user
      setError("Login failed. Please check your email and password.");
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

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-slate-500 mb-6">
          Sign in to manage your events
        </p>

        {error && (
          <p className="text-red-500 text-center mb-4">
            {error}
          </p>
        )}

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

          {/* Button text changes while loading */}
          <input
            type="submit"
            value={isPending ? "Logging in..." : "Login"}
            className="btn btn-primary w-full mt-2"
            // Prevent multiple submissions while request is pending
            disabled={isPending}
          />
        </form>
      </div>
    </div>
  );
}