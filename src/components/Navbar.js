import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [role, setRole] = useState("");

  // Always sync role from localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("role");

    // Normalize role
    if (storedRole === "ADMIN") {
      setRole("ROLE_ADMIN");
    } else if (storedRole === "USER") {
      setRole("ROLE_USER");
    } else {
      setRole(storedRole);
    }
  }, [location]); // update on route change

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 20px",
      background: "#222",
      color: "#fff"
    }}>

      {/* LEFT */}
      <div style={{ display: "flex", gap: "15px" }}>

        <button
          onClick={() => navigate("/dashboard")}
          style={navStyle(isActive("/dashboard"))}
        >
          🏠 Home
        </button>

        <button
          onClick={() => navigate("/products")}
          style={navStyle(isActive("/products"))}
        >
          🛍 Products
        </button>

      </div>

      {/* RIGHT */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>

        {/* ROLE DISPLAY */}
        <span style={{ fontSize: "14px", color: "#ccc" }}>
          {role === "ROLE_ADMIN"
            ? "👑 Admin"
            : role === "ROLE_USER"
            ? "👤 User"
            : "Guest"}
        </span>

        {/* USER */}
        {role === "ROLE_USER" && (
          <button onClick={() => navigate("/cart")} style={btnStyle}>
            🛒 Cart
          </button>
        )}

        {/* ADMIN */}
        {role === "ROLE_ADMIN" && (
          <>
            <button onClick={() => navigate("/admin")} style={btnStyle}>
              ⚙ Admin
            </button>

            <button onClick={() => navigate("/add-product")} style={btnStyle}>
              ➕ Add Product
            </button>
          </>
        )}

        {/* LOGOUT */}
        <button onClick={logout} style={{ ...btnStyle, background: "red" }}>
          Logout
        </button>

      </div>
    </div>
  );
}

// Active style helper
const navStyle = (active) => ({
  background: active ? "#555" : "transparent",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  padding: "6px 10px",
  borderRadius: "5px"
});

const btnStyle = {
  background: "#444",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  cursor: "pointer",
  borderRadius: "5px"
};

export default Navbar;