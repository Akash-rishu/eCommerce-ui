import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

function AdminLayout({ children }) {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.clear();

    navigate("/");
  };

  return (

    <div style={styles.container}>

      {/* SIDEBAR */}
      <div style={styles.sidebar}>

        <div style={styles.logoBox}>

          <img
            src={logo}
            style={styles.logo}
            alt="logo"
          />

          <h3>Wholesale Store</h3>

        </div>

        {/* MENU */}
        <div style={styles.menu}>

          {/* Dashboard */}
          <p
            style={styles.menuItem}
            onClick={() => navigate("/admin")}
          >
            🏠 Dashboard
          </p>

          {/* Add Product */}
          <p
            style={styles.menuItem}
            onClick={() => navigate("/add-product")}
          >
            ➕ Add Product
          </p>

          {/* Manage Products */}
          <p
            style={styles.menuItem}
            onClick={() => navigate("/admin/products")}
          >
            📦 Products
          </p>

          {/* Orders */}
          <p
            style={styles.menuItem}
            onClick={() => navigate("/admin/orders")}
          >
            📑 Orders
          </p>

        </div>

        {/* Logout */}
        <button
          style={styles.logoutBtn}
          onClick={logout}
        >
          Logout
        </button>

      </div>

      {/* MAIN */}
      <div style={styles.main}>
        {children}
      </div>

    </div>
  );
}

export default AdminLayout;

const styles = {

  container: {
    display: "flex",
    height: "100vh"
  },

  sidebar: {
    width: "220px",
    background: "#eef2ff",
    padding: "20px"
  },

  logoBox: {
    display: "flex",
    gap: "10px",
    alignItems: "center"
  },

  logo: {
    width: "25px"
  },

  menu: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  menuItem: {
    cursor: "pointer",
    padding: "8px",
    borderRadius: "5px"
  },

  logoutBtn: {
    marginTop: "20px",
    background: "red",
    color: "white",
    border: "none",
    padding: "8px",
    cursor: "pointer"
  },

  main: {
    flex: 1,
    padding: "20px",
    background: "#f1f3f6"
  }
};