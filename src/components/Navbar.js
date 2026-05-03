import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../images/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [role, setRole] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");

    if (storedRole === "ADMIN") {
      setRole("ROLE_ADMIN");
    } else if (storedRole === "USER") {
      setRole("ROLE_USER");
    } else {
      setRole(storedRole || "");
    }
  }, [location]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  // SEARCH FUNCTION
  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/products?search=${search}`);
    }
  };

  return (
    <div style={styles.navbar}>

      {/* LOGO */}
      <div style={styles.logoContainer} onClick={() => navigate("/home")}>
        <img src={logo} alt="logo" style={styles.logo} />

        <div>
          <h3 style={{ margin: 0 }}>Wholesale Store</h3>
          <span style={styles.tagline}>Smart Shopping Platform</span>
        </div>
      </div>

      {/* SEARCH */}
      <input
        placeholder="Search for products, brands and more"
        style={styles.search}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      {/* RIGHT */}
      <div style={styles.right}>

        <button
          onClick={() => navigate("/home")}
          style={navBtn(isActive("/home"))}
        >
          Home
        </button>

        {/* ROLE */}
        <span style={styles.role}>
          {role === "ROLE_ADMIN"
            ? "👑 Admin"
            : role === "ROLE_USER"
            ? "👤 User"
            : "Guest"}
        </span>

        {/* USER */}
        {role === "ROLE_USER" && (
          <button onClick={() => navigate("/cart")} style={navBtn(false)}>
            🛒 Cart
          </button>
        )}

        {/* ADMIN */}
        {role === "ROLE_ADMIN" && (
          <>
            <button onClick={() => navigate("/admin")} style={navBtn(false)}>
              ⚙ Admin
            </button>

            <button onClick={() => navigate("/add-product")} style={navBtn(false)}>
              ➕ Add Product
            </button>
          </>
        )}

        {/* LOGOUT */}
        <button onClick={logout} style={styles.logout}>
          Logout
        </button>

      </div>
    </div>
  );
}

export default Navbar;

const navBtn = (active) => ({
  background: active ? "white" : "transparent",
  color: active ? "#2874f0" : "white",
  border: "none",
  padding: "6px 12px",
  cursor: "pointer",
  borderRadius: "4px",
  fontWeight: "bold"
});

const styles = {
  navbar: {
    background: "#2874f0",
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "white"
  },

  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer"
  },

  logo: {
    width: "40px",
    height: "40px"
  },

  tagline: {
    fontSize: "11px",
    color: "#e0e0e0"
  },

  search: {
    width: "40%",
    padding: "8px",
    borderRadius: "4px",
    border: "none",
    outline: "none"
  },

  right: {
    display: "flex",
    gap: "15px",
    alignItems: "center"
  },

  role: {
    fontSize: "14px"
  },

  logout: {
    background: "#ff4d4d",
    border: "none",
    padding: "6px 12px",
    color: "white",
    borderRadius: "4px",
    cursor: "pointer"
  }
};