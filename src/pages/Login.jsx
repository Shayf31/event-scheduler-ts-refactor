// Axios for API requests
import axios from "axios";

// React hook for form actions
import React, { useActionState } from "react";

// React Router navigation hook
import { useNavigate } from "react-router";

export default function Login({ setUsers }) {

  // useActionState handles form submission state
  const [state, formAction, isPending] = useActionState(submitHandler, {});

  // Used to redirect users programmatically
  const navigate = useNavigate()

  // Runs when form is submitted
  async function submitHandler(prev, formData) {

    // Get form values
    const email = formData.get("email");
    const password = formData.get("pass");

    // Send login request to API
    const res = await axios.post(
      "http://localhost:3001/api/auth/login",
      {
        email: email,
        password: password,
      }
    );

    // Save JWT token into localStorage
    localStorage.setItem(
      "token",
      JSON.stringify(res.data.token)
    )

    // Redirect user to home page
    navigate('/')

    // TODO:
    // Could also update authenticatedUsers state here
  }

  return (
    <div>

      <h1>Loging</h1>

      {/* Form uses formAction from useActionState */}
      <form action={formAction}>

        {/* Email input */}
        <input
          className="input"
          type="text"
          name="email"
        />

        {/* Password input */}
        <input
          className="input"
          type="text"
          name="pass"
        />

        {/* Submit button */}
        <input
          type="submit"
          value={"Submit"}
          className="btn"
        />

      </form>
    </div>
  );
}