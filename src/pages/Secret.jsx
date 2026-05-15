import React, { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Secret({ users }) {
  // React Router navigation
  const navigate = useNavigate();

  // Runs once on component mount
  useEffect(() => {
    // Check if token exists
    const isToken = JSON.parse(localStorage.getItem("token"));

    // If no token redirect to login
    if (isToken == null) navigate("/login");
  }, []);

  // Placeholder auth function
  function isAuthenticated() {
    // Could eventually:
    // validate token
    // check API
    // redirect users
  }

  return <div>Secret</div>;
}
