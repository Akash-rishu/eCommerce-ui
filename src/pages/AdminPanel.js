import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; 

function AdminPanel() {
  const navigate = useNavigate();

  // ROLE PROTECTION (extra safety)
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "ROLE_ADMIN") {
      navigate("/unauthorized");
    }
  }, [navigate]);

  return (
    <div>

      {/* NAVBAR */}
      <Navbar />

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h2>Admin Panel 🔥</h2>
        <p>Welcome Admin 👑</p>

        <br />

        {/* ACTIONS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", alignItems: "center" }}>

          <button onClick={() => navigate("/add-product")}>
            ➕ Add Product
          </button>

          <button onClick={() => navigate("/manage-categories")}>
            🗂 Manage Categories
          </button>

          <button onClick={() => navigate("/dashboard")}>
            📦 View Products
          </button>

        </div>
      </div>

    </div>
  );
}

export default AdminPanel;