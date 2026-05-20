import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

// This page fetches and displays the logged-in user's profile
export default function Profile() {

  // Stores profile data from API
  const [profileData, setProfileData] = useState({})

  // Used for redirects/navigation
  const navigate = useNavigate()

  // Runs once when component mounts
  useEffect(() => {

    // Get token from localStorage
    const token = JSON.parse(
      localStorage.getItem("token")
    );

    // If no token exists redirect home
    if(token == null) navigate('/')

    // Async function to fetch profile
    async function x () {

      // GET request with Authorization header
      // Authorization header proves user is authenticated
      const res = await axios(
        "http://localhost:3001/api/auth/profile",
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      )

      console.log(res);

      // Save API response into state
      setProfileData(res.data)
    }

    // Call async function
    x()

  }, [])
 {/* Displays user email from profile data */}
  return (
    
    <div>
      Profile and email: {profileData?.email}
    </div>
  )
}