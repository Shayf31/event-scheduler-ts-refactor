import axios from "axios";
import React, { useActionState, useState } from "react";
import { useNavigate } from "react-router";

export default function Register() {
  const [state, formAction, isPending] = useActionState(submitHandler, {});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function submitHandler(prev, formData) {
    setError("");

    try {
      const email = formData.get("email");
      const password = formData.get("pass");

      await axios.post("http://localhost:3001/api/users", {
        email,
        password,
      });

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
