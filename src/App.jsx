// Import routing components from React Router
import { Route, Routes } from "react-router";


// Import page components
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Secret from "./pages/Secret";
import Profile from "./pages/Profile";

import ProtectedLayout from "./pages/ProtectedLayout";
import CreateEvent from "./pages/CreateEvent";


import { useState } from "react";


const App = () => {
 // Stores authenticated users in state
 // Right now this is mostly demo/practice state
 const [authenticatedUsers, setAuthenticatedUsers] = useState([]);


 return (
   <div className="">
     {/* Navigation/header section */}
     <section className="flex justify-between items-center bg-amber-200">
       {/* Routes decides which component/page to render */}
       <Routes>
         <Route path="/" element={<Home />} />


         <Route path="/events/:id" element={<EventDetails />} />


         {/* /login route */}
         {/* Passing setAuthenticatedUsers as a prop called setUsers */}
         <Route
           path="/login"
           element={<Login setUsers={setAuthenticatedUsers} />}
         />


         {/* /register route */}
         <Route path="/register" element={<Register />} />


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