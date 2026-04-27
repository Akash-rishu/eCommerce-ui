import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        // Redirect if no token
        if (!token) {
          navigate("/");
          return;
        }

        const res = await API.get("/users", {
          headers: {
            Authorization: "Bearer " + token
          }
        });

        console.log("Response:", res.data);

        // FIX: ensure always array
        setUsers(Array.isArray(res.data) ? res.data : []);

      } catch (err) {
        if (err.response) {
          setError("Unauthorized or error: " + err.response.status);

          // Auto logout if token invalid
          if (err.response.status === 401 || err.response.status === 403) {
            localStorage.removeItem("token");
            navigate("/");
          }
        } else {
          setError("Server error");
        }
      } finally {
        setLoading(false); // ✅ always stop loading
      }
    };

    fetchUsers();

  }, [navigate]);

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Dashboard</h2>

      <button onClick={logout}>Logout</button>

      <br /><br />

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display Users Safely */}
      {!loading && Array.isArray(users) && users.length > 0 && (
        <div>
          <h3>Users List</h3>
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                {user.name} - {user.email}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!loading && Array.isArray(users) && users.length === 0 && (
        <p>No users found</p>
      )}
    </div>
  );
}

export default Dashboard;