import { Navigate, Outlet } from "react-router-dom";

export default function ProtectRoutes() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
