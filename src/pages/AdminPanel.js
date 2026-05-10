import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

function AdminPanel() {
  const navigate = useNavigate();

  // 🔐 ROLE PROTECTION
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "ROLE_ADMIN") {
      navigate("/unauthorized");
    }
  }, [navigate]);

  // 🔥 LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={styles.container}>

      {/* 🔥 SIDEBAR */}
      <div style={styles.sidebar}>

        {/* 🔥 LOGO + BRAND */}
        <div style={styles.logoBox}>
          <div style={styles.logoCircle}>
            <img src={logo} alt="logo" style={styles.logo} />
          </div>

          <div>
            <h3 style={styles.brand}>Wholesale Store</h3>
            <p style={styles.subText}>Smart Shopping Platform</p>
          </div>
        </div>

        {/* 🔥 MENU */}
        <div style={styles.menu}>
          <p style={styles.menuItem} onClick={() => navigate("/admin")}>
            🏠 Dashboard
          </p>

          <p style={styles.menuItem} onClick={() => navigate("/admin/products")}>
            📦 Products
          </p>

          <p style={styles.menuItem} onClick={() => navigate("/add-product")}>
            ➕ Add Product
          </p>

          <p style={styles.menuItem} onClick={() => navigate("/admin/orders")}>
            📑 Orders
          </p>

          <p style={styles.menuItem} onClick={() => navigate("/admin/analytics")}>
            📊 Analytics
          </p>
        </div>

        {/* 🔥 LOGOUT */}
        <button style={styles.logoutBtn} onClick={handleLogout}>
          🚪 Logout
        </button>

      </div>

      {/* 🔥 MAIN */}
      <div style={styles.main}>

        {/* 🔥 TOPBAR */}
        <div style={styles.topbar}>
          <input
            placeholder="Search products..."
            style={styles.search}
          />

          <div style={styles.profile}>
            👑 Admin
          </div>
        </div>

        {/* 🔥 CONTENT */}
        <h2>Welcome Admin 👋</h2>
        <p style={{ color: "#777" }}>
          Manage your store efficiently
        </p>

        {/* 🔥 CARDS */}
        <div style={styles.cards}>
          <div style={styles.card}>
            <h4>Total Products</h4>
            <p>--</p>
          </div>

          <div style={styles.card}>
            <h4>Total Orders</h4>
            <p>--</p>
          </div>

          <div style={styles.card}>
            <h4>Revenue</h4>
            <p>₹ --</p>
          </div>
        </div>

        {/* 🔥 ACTIONS */}
        <div style={styles.actions}>
          <button
            style={styles.btn}
            onClick={() => navigate("/add-product")}
          >
            ➕ Add Product
          </button>

          <button
            style={styles.btn}
            onClick={() => navigate("/admin/products")}
          >
            📦 Manage Products
          </button>
        </div>

      </div>
    </div>
  );
}

export default AdminPanel;

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial"
  },

  /* 🔥 SIDEBAR */
  sidebar: {
    width: "240px",
    background: "linear-gradient(180deg,#eef2ff,#e0e7ff)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },

  /* 🔥 LOGO */
  logoBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px"
  },

  logoCircle: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#dbeafe",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  logo: {
    width: "22px",
    height: "22px",
    objectFit: "contain"
  },

  brand: {
    margin: 0,
    fontSize: "15px",
    fontWeight: "600",
    color: "#333"
  },

  subText: {
    margin: 0,
    fontSize: "11px",
    color: "#888"
  },

  /* 🔥 MENU */
  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "20px"
  },

  menuItem: {
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.3s"
  },

  /* 🔥 LOGOUT */
  logoutBtn: {
    padding: "10px",
    background: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  /* 🔥 MAIN */
  main: {
    flex: 1,
    padding: "20px",
    background: "#f1f3f6"
  },

  /* 🔥 TOPBAR */
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px"
  },

  search: {
    padding: "8px",
    width: "260px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },

  profile: {
    fontWeight: "bold"
  },

  /* 🔥 CARDS */
  cards: {
    display: "flex",
    gap: "20px",
    marginTop: "20px"
  },

  card: {
    flex: 1,
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },

  /* 🔥 ACTIONS */
  actions: {
    marginTop: "30px",
    display: "flex",
    gap: "15px"
  },

  btn: {
    padding: "10px 15px",
    border: "none",
    background: "#2874f0",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  }
};