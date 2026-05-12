import React, {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

import logo from "../images/logo.png";

import API from "../api";

function Navbar() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const [role,
    setRole] =
    useState("");

  const [search,
    setSearch] =
    useState("");

  const [locationText,
    setLocationText] =
    useState(
      "Select Address"
    );

  // LOAD ROLE + ADDRESS
  useEffect(() => {

    const storedRole =
      localStorage.getItem(
        "role"
      );

    if (
      storedRole === "ADMIN"
    ) {

      setRole(
        "ROLE_ADMIN"
      );

    } else if (
      storedRole === "USER"
    ) {

      setRole(
        "ROLE_USER"
      );

      fetchDefaultAddress();

    } else {

      setRole(
        storedRole || ""
      );
    }

  }, [location]);

  // FETCH DEFAULT ADDRESS
  const fetchDefaultAddress =
    async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await API.get(
          "/address",
          {
            headers: {
              Authorization:
                "Bearer " + token
            }
          }
        );

      if (
        res.data.length > 0
      ) {

        const a =
          res.data[0];

        setLocationText(

          `${a.city},
           ${a.state}
           - ${a.pincode}`

        );
      }

    } catch (error) {

      console.log(error);
    }
  };

  // LOGOUT
  const logout = () => {

    localStorage.clear();

    navigate("/");
  };

  // ACTIVE PAGE
  const isActive =
    (path) =>
      location.pathname
      === path;

  // SEARCH
  const handleSearch =
    () => {

    if (
      search.trim()
    ) {

      navigate(
        `/products?search=${search}`
      );
    }
  };

  return (

    <div style={styles.navbar}>

      {/* LEFT */}
      <div style={styles.left}>

        {/* LOGO */}
        <div
          style={styles.logoContainer}
          onClick={() =>
            navigate("/home")
          }
        >

          <img
            src={logo}
            alt="logo"
            style={styles.logo}
          />

          <div>

            <h2 style={styles.brand}>
              Wholesale Store
            </h2>

            <span style={styles.tagline}>
              Smart Shopping Platform
            </span>

          </div>

        </div>

        {/* LOCATION */}
        {
          role === "ROLE_USER"
          && (

            <div
              style={
                styles.locationBox
              }
              onClick={() =>
                navigate(
                  "/address"
                )
              }
            >

              <span
                style={{
                  fontSize:
                    "13px"
                }}
              >
                Deliver to
              </span>

              <strong>
                📍
                {" "}
                {locationText}
              </strong>

            </div>
          )
        }

      </div>

      {/* SEARCH */}
      <div style={styles.searchContainer}>

        <input
          placeholder="Search for products, brands and more"
          style={styles.search}
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          onKeyDown={(e) =>
            e.key === "Enter"
            && handleSearch()
          }
        />

        <button
          style={styles.searchBtn}
          onClick={handleSearch}
        >
          🔍
        </button>

      </div>

      {/* RIGHT */}
      <div style={styles.right}>

        {/* HOME */}
        <button
          onClick={() =>
            navigate("/home")
          }
          style={
            navBtn(
              isActive("/home")
            )
          }
        >
          🏠 Home
        </button>

        {/* USER */}
        {
          role === "ROLE_USER"
          && (

            <>

              {/* CART */}
              <button
                onClick={() =>
                  navigate("/cart")
                }
                style={navBtn(false)}
              >
                🛒 Cart
              </button>

              {/* MY ORDERS */}
              <button
                onClick={() =>
                  navigate("/my-orders")
                }
                style={navBtn(false)}
              >
                📦 My Orders
              </button>

              {/* ADDRESS */}
              <button
                onClick={() =>
                  navigate("/address")
                }
                style={navBtn(false)}
              >
                📍 Address
              </button>

            </>
          )
        }

        {/* ADMIN */}
        {
          role === "ROLE_ADMIN"
          && (

            <>

              <button
                onClick={() =>
                  navigate("/admin")
                }
                style={navBtn(false)}
              >
                ⚙ Admin
              </button>

              <button
                onClick={() =>
                  navigate("/add-product")
                }
                style={navBtn(false)}
              >
                ➕ Add Product
              </button>

            </>
          )
        }

        {/* ROLE */}
        <div style={styles.roleBox}>

          {
            role === "ROLE_ADMIN"
            ? "👑 Admin"

            : role === "ROLE_USER"
            ? "👤 User"

            : "Guest"
          }

        </div>

        {/* LOGOUT */}
        <button
          onClick={logout}
          style={styles.logout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;

// NAV BUTTON
const navBtn =
(active) => ({

  background:
    active
    ? "white"
    : "transparent",

  color:
    active
    ? "#2874f0"
    : "white",

  border: "none",

  padding: "10px 16px",

  cursor: "pointer",

  borderRadius: "10px",

  fontWeight: "600",

  fontSize: "15px",

  transition: "0.3s"
});

// STYLES
const styles = {

  navbar: {

    background:
      "linear-gradient(135deg,#2563eb,#3b82f6)",

    padding: "14px 25px",

    display: "flex",

    alignItems: "center",

    justifyContent:
      "space-between",

    color: "white",

    position: "sticky",

    top: 0,

    zIndex: 999,

    boxShadow:
      "0 4px 18px rgba(0,0,0,0.15)"
  },

  left: {

    display: "flex",

    alignItems: "center",

    gap: "25px"
  },

  logoContainer: {

    display: "flex",

    alignItems: "center",

    gap: "12px",

    cursor: "pointer"
  },

  logo: {

    width: "52px",

    height: "52px",

    objectFit: "contain"
  },

  brand: {

    margin: 0,

    fontSize: "24px",

    fontWeight: "800"
  },

  tagline: {

    fontSize: "12px",

    color: "#dbeafe"
  },

  locationBox: {

    display: "flex",

    flexDirection: "column",

    background:
      "rgba(255,255,255,0.15)",

    padding: "10px 16px",

    borderRadius: "14px",

    cursor: "pointer",

    backdropFilter:
      "blur(8px)",

    boxShadow:
      "0 4px 10px rgba(0,0,0,0.08)"
  },

  searchContainer: {

    display: "flex",

    alignItems: "center",

    width: "38%",

    background: "white",

    borderRadius: "14px",

    overflow: "hidden",

    boxShadow:
      "0 4px 10px rgba(0,0,0,0.08)"
  },

  search: {

    flex: 1,

    padding: "13px",

    border: "none",

    outline: "none",

    fontSize: "15px"
  },

  searchBtn: {

    background: "#facc15",

    border: "none",

    padding: "13px 18px",

    cursor: "pointer",

    fontSize: "16px",

    fontWeight: "700"
  },

  right: {

    display: "flex",

    gap: "14px",

    alignItems: "center"
  },

  roleBox: {

    background:
      "rgba(255,255,255,0.15)",

    padding: "9px 14px",

    borderRadius: "12px",

    fontWeight: "700",

    fontSize: "14px"
  },

  logout: {

    background:
      "linear-gradient(135deg,#ef4444,#f87171)",

    border: "none",

    padding: "10px 16px",

    color: "white",

    borderRadius: "12px",

    cursor: "pointer",

    fontWeight: "700",

    boxShadow:
      "0 4px 10px rgba(239,68,68,0.25)"
  }
};