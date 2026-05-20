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
  const [state, formAction, isPending] = useActionState(submitHandler, {});
  
  const [error, setError] = useState("");
  
  // Used to redirect user after successful signup
  const navigate = useNavigate();

  // submitHandler runs when the form is submitted
  async function submitHandler(prev, formData) {
    
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
    <div>
      <h1>Register</h1>

      {error && <p className="text-red-500">{error}</p>}

{/* Form */}
     {/* action={formAction} connects form to useActionState */}
      <form action={formAction}>
        <input className="input" type="text" name="email" placeholder="Email" />

        <input
          className="input"
          type="password"
          name="pass"
          placeholder="Password"
        />

        <input
          type="submit"
          value={isPending ? "Registering..." : "Submit"}
          className="btn"
          disabled={isPending}
        />
      </form>
    </div>
  );
}
