import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // No token
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Check token validity
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    // Token expired
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return <Navigate to="/" replace />;
    }

  } catch (err) {
    // Invalid token
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return <Navigate to="/" replace />;
  }

  // ROLE CHECK
  if (role && userRole !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;