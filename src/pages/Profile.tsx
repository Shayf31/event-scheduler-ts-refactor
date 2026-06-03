import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

// Type for profile data returned from the API
interface ProfileData {
  email: string;
}

// This page fetches and displays the logged-in user's profile
export default function Profile() {
  // Stores profile data from API
  // Starts as null because we do not have profile data immediately
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  // Used for redirects/navigation
  const navigate = useNavigate();

  // Runs once when component mounts
  useEffect(() => {
    // Get token from localStorage
    const storedToken: string | null = localStorage.getItem("token");

if (storedToken == null) {
  navigate("/");
  return;
}

const token: string = JSON.parse(storedToken);

    // Async function to fetch profile
    async function getProfile(): Promise<void> {
      // GET request with Authorization header
      // Authorization header proves user is authenticated
      const res = await axios.get<ProfileData>(
        "http://localhost:3001/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res);

      // Save API response into state
      setProfileData(res.data);
    }

    // Call async function
    getProfile();
  }, [navigate]);

  {/* Displays user email from profile data */}
  return (
    <div>
      Profile and email: {profileData?.email}
    </div>
  );
}