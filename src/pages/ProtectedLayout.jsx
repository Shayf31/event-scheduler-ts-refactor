// Navigate redirects users to another route
// Outlet renders the protected child route if access is allowed

import { Navigate, Outlet } from "react-router";

// ProtectedLayout component
// This acts like a guard for protected pages
export default function ProtectedLayout() {
  
  // Get token from localStorage
 // The token was saved when the user logged in
  const token = JSON.parse(localStorage.getItem("token"));

  // If there is no token,
 // the user is considered logged out
  if (!token) {

    // Redirect logged-out users to login page
    return <Navigate to="/login" />;
  }

  // If token exists,
 // allow the protected route to render
 //
 // Outlet:
 // "show the child route here"
 //
 // Example protected children:
 // /profile
 // /create-event

  return <Outlet />;
}