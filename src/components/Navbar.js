import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "10px",
      background: "#eee"
    }}>

      {/* LEFT */}
      <div>
        <button onClick={() => navigate("/dashboard")}>
          Home
        </button>
      </div>

      {/* RIGHT */}
      <div style={{ display: "flex", gap: "10px" }}>

        {/* USER */}
        {role === "ROLE_USER" && (
          <button onClick={() => navigate("/cart")}>
            🛒 Cart
          </button>
        )}

        {/* ADMIN */}
        {role === "ROLE_ADMIN" && (
          <>
            <button onClick={() => navigate("/admin")}>
              ⚙ Admin
            </button>

            <button onClick={() => navigate("/add-product")}>
              ➕ Add Product
            </button>
          </>
        )}

        {/* LOGOUT */}
        <button onClick={logout}>
          Logout
        </button>

      </div>
    </div>
  );
}

export default Navbar;