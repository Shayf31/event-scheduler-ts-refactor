import { Navigate, Outlet } from "react-router";

export default function ProtectedLayout() {
  const token = JSON.parse(localStorage.getItem("token"));

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}