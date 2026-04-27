import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // No token → redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Optional: check token expiry (basic)
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const isExpired = payload.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem("token");
      return <Navigate to="/" replace />;
    }
  } catch (err) {
    // Invalid token format
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }

  // Allow access
  return children;
};

export default ProtectedRoute;