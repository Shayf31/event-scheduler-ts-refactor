import axios from "axios";
import React, { useActionState, useState } from "react";
import { useNavigate } from "react-router";

export default function Login({ setUsers }) {
  const [state, formAction, isPending] = useActionState(submitHandler, {});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function submitHandler(prev, formData) {
    setError("");

    try {
      const email = formData.get("email");
      const password = formData.get("pass");

      const res = await axios.post("http://localhost:3001/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", JSON.stringify(res.data.token));

      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Login failed. Please check your email and password.");
    }
  }

  return (
    <div>
      <h1>Login</h1>

      {error && <p className="text-red-500">{error}</p>}

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
          value={isPending ? "Logging in..." : "Submit"}
          className="btn"
          disabled={isPending}
        />
      </form>
    </div>
  );
}