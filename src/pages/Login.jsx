import axios from "axios";
import React, { useActionState, useState } from "react";
import { useNavigate } from "react-router";

// This page authenticates users
export default function Login({ setUsers }) {

  // useActionState = handles form submissions
 // state:
 // stores returned values (not heavily used here)
 //
 // formAction:
 // attached to form action={}
 //
 // isPending:
 // true while login request is running
  const [state, formAction, isPending] = useActionState(submitHandler, {});


  const [error, setError] = useState("");
  
  // Used to redirect user after successful login
  const navigate = useNavigate();

  // submitHandler runs when the login form is submitted
  async function submitHandler(prev, formData) {
    
    // Clear previous errors before new login attempt
    setError("");

    try {

      // Get values from form inputs
     // Reads inputs by their "name"
      const email = formData.get("email");
      const password = formData.get("pass");

      // Send POST request to backend login endpoint
     // Backend validates credentials
      const res = await axios.post("http://localhost:3001/api/auth/login", {
        email,
        password,
      });

      // Backend returns a JWT token
     // Save token into localStorage
     //
     // localStorage persists even after page refresh
      localStorage.setItem("token", JSON.stringify(res.data.token));


      // Redirect user to homepage after successful login
      navigate("/");
    } catch (err) {
      console.log(err);

      // // Show error message to user
      setError("Login failed. Please check your email and password.");
    }
  }

  return (
    <div>
      <h1>Login</h1>

      {error && <p className="text-red-500">{error}</p>}

{/* action={formAction} connects form to useActionState */}
      <form action={formAction}>
        <input className="input" type="text" name="email" placeholder="Email" />

        <input
          className="input"
          type="password"
          name="pass"
          placeholder="Password"
        />
{/*// Button text changes while loading*/}
        <input
          type="submit"
          value={isPending ? "Logging in..." : "Submit"}
          className="btn"
          // Prevent multiple submissions while request is pending
          disabled={isPending}
        />
      </form>
    </div>
  );
}