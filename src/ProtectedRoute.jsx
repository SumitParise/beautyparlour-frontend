import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // If token doesn’t exist, redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the protected component
  return children;
}
