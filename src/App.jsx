// Import routing components from React Router
import { Route, Routes } from "react-router";
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
 const [authenticatedUsers, setAuthenticatedUsers] = useState([]);


 return (
   <div className="">
     {/* Navigation/header section */}
     <section className="flex justify-between items-center bg-amber-200">
       {/* Routes decides which component/page to render */}
       <Routes>
        {/* PUBLIC Routes */}
         <Route path="/" element={<Home />} />

{/* Dynamic route for event details */}
         <Route path="/events/:id" element={<EventDetails />} />

         {/* Passing setAuthenticatedUsers as a prop called setUsers */}
         <Route
           path="/login"
           element={<Login setUsers={setAuthenticatedUsers} />}
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
     </section>


     {/* Debug/testing section */}
     <section>
       {/* Shows number of authenticated users */}
       {authenticatedUsers.length}


       {/* Loops through users array and displays emails */}
       {authenticatedUsers.map((u) => (
         <p>{u.email}</p>
       ))}
     </section>
   </div>
 );
};


export default App;