// Import routing components from React Router
import { Route, Routes, Link } from "react-router";
import { useState } from "react";

// Import page components
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Secret from "./pages/Secret";
import Profile from "./pages/Profile";
import CreateEvent from "./pages/CreateEvent";

// checks if a JWT token exists before allowing access
import ProtectedLayout from "./pages/ProtectedLayout";

// Imported starter code from instructor
// Not heavily used anymore because we now use JWT tokens in localStorage
const App = () => {
  type AuthenticatedUser = {
  email: string;
};

const [authenticatedUsers, setAuthenticatedUsers] =
  useState<AuthenticatedUser[]>([]);

  return (
    <div className="">
      {/* Navigation/header section */}
            {/* Navigation/header section */}
      <section className="bg-slate-900 text-white shadow-md">

        <div className="max-w-6xl mx-auto px-6 py-4">

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

            {/* Project title/logo */}
            <h1 className="text-2xl font-bold text-cyan-400">
              Event Scheduler
            </h1>

            {/* Navigation links */}
            {/* React Router Link changes routes without refreshing the page */}
            <div className="grid grid-cols-2 md:flex gap-3">

              <Link to="/" className="btn btn-info">
                Home
              </Link>

              <Link to="/login" className="btn btn-outline btn-info">
                Login
              </Link>

              <Link to="/register" className="btn btn-outline btn-success">
                Register
              </Link>

              <Link to="/create-event" className="btn btn-success">
                Create Event
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* Routes decides which component/page to render */}
      <Routes>
        {/* PUBLIC Routes */}
        <Route path="/" element={<Home />} />

        {/* Dynamic route for event details */}
        <Route path="/events/:id" element={<EventDetails />} />

        {/* Passing setAuthenticatedUsers as a prop called setUsers */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* /register route */}
        <Route path="/register" element={<Register />} />

        {/* ProtectedLayout wraps routes that require authentication */}
        {/* It checks if a JWT token exists in localStorage */}
        {/* If no token:
            redirect to /login
        */}
        <Route element={<ProtectedLayout />}>
          <Route path="/secret" element={<Secret />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-event" element={<CreateEvent />} />
        </Route>
      </Routes>

      {/* Debug/testing section */}
      <section>
        {/* Shows number of authenticated users - removed */}

        {/* Loops through users array and displays emails */}
        {authenticatedUsers.map((u) => (
          <p key={u.email}>{u.email}</p>
        ))}
      </section>
    </div>
  );
};

export default App;