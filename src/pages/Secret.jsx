import React, { useEffect } from "react";
import { useNavigate } from "react-router";

// Secret component
// part of the instructor starter code
// simple example of a protected page

export default function Secret({ users }) {
  // React Router navigation
  const navigate = useNavigate();

  // Runs once on component mount
  useEffect(() => {
    // Check if token exists in local storage
    //Token is created during login
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

  // If the user has a token,
 // they are allowed to see this page
  return <div>Secret</div>;
}
