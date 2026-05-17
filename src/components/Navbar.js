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

  const [showDropdown,
    setShowDropdown] =
    useState(false);

  // LOAD
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

  // FETCH ADDRESS
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

        {/* ADDRESS */}
        {
          role === "ROLE_USER"
          && (

            <div
              style={styles.locationBox}
              onClick={() =>
                navigate("/address")
              }
            >

              <span style={{
                fontSize: "12px"
              }}>
                Deliver to
              </span>

              <strong>
                📍 {locationText}
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
        <div
          style={styles.menuItem}
          onClick={() =>
            navigate("/home")
          }
        >
          🏠
          <span>Home</span>
        </div>

        {/* USER */}
        {
          role === "ROLE_USER"
          && (

            <>

              <div
                style={styles.menuItem}
                onClick={() =>
                  navigate("/cart")
                }
              >
                🛒
                <span>Cart</span>
              </div>

              <div
                style={styles.menuItem}
                onClick={() =>
                  navigate("/my-orders")
                }
              >
                📦
                <span>Orders</span>
              </div>

              <div
                style={styles.menuItem}
                onClick={() =>
                  navigate("/address")
                }
              >
                📍
                <span>Address</span>
              </div>

            </>
          )
        }

        {/* ADMIN */}
        {
          role === "ROLE_ADMIN"
          && (

            <>

              <div
                style={styles.menuItem}
                onClick={() =>
                  navigate("/admin")
                }
              >
                ⚙
                <span>Admin</span>
              </div>

              <div
                style={styles.menuItem}
                onClick={() =>
                  navigate("/add-product")
                }
              >
                ➕
                <span>Add Product</span>
              </div>

            </>
          )
        }

        {/* USER DROPDOWN */}
        <div style={styles.userWrapper}>

          <div
            style={styles.userBtn}

            onClick={() =>
              setShowDropdown(
                !showDropdown
              )
            }
          >
            👤 User
          </div>

          {
            showDropdown && (

              <div style={styles.dropdown}>

                <div
                  style={styles.dropdownItem}

                  onClick={() => {

                    navigate("/profile");

                    setShowDropdown(false);
                  }}
                >
                  👤 My Profile
                </div>

                <div
                  style={styles.dropdownItem}

                  onClick={() => {

                    navigate("/my-orders");

                    setShowDropdown(false);
                  }}
                >
                  📦 Orders
                </div>

                <div
                  style={styles.dropdownItem}

                  onClick={() => {

                    navigate("/cart");

                    setShowDropdown(false);
                  }}
                >
                  🛒 Cart
                </div>

                <div
                  style={styles.dropdownItem}

                  onClick={() => {

                    navigate("/address");

                    setShowDropdown(false);
                  }}
                >
                  📍 Address
                </div>

                <div
                  style={styles.dropdownItem}

                  onClick={() => {

                    logout();

                    setShowDropdown(false);
                  }}
                >
                  🚪 Logout
                </div>

              </div>
            )
          }

        </div>

      </div>

    </div>
  );
}

export default Navbar;

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
      "0 6px 20px rgba(0,0,0,0.15)"
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
      "blur(8px)"
  },

  searchContainer: {

    display: "flex",

    alignItems: "center",

    width: "35%",

    background: "white",

    borderRadius: "14px",

    overflow: "hidden",

    boxShadow:
      "0 4px 12px rgba(0,0,0,0.1)"
  },

  search: {

    flex: 1,

    padding: "14px",

    border: "none",

    outline: "none",

    fontSize: "15px"
  },

  searchBtn: {

    background: "#facc15",

    border: "none",

    padding: "14px 18px",

    cursor: "pointer",

    fontWeight: "700"
  },

  right: {

    display: "flex",

    alignItems: "center",

    gap: "20px"
  },

  menuItem: {

    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    gap: "5px",

    cursor: "pointer",

    fontWeight: "700",

    fontSize: "14px"
  },

  userWrapper: {

    position: "relative"
  },

  userBtn: {

    background:
      "rgba(255,255,255,0.15)",

    padding: "14px 18px",

    borderRadius: "18px",

    cursor: "pointer",

    fontWeight: "700",

    backdropFilter:
      "blur(8px)"
  },

  dropdown: {

    position: "absolute",

    top: "70px",

    right: 0,

    width: "240px",

    background: "white",

    borderRadius: "20px",

    overflow: "hidden",

    boxShadow:
      "0 10px 35px rgba(0,0,0,0.18)"
  },

  dropdownItem: {

    padding: "18px 20px",

    cursor: "pointer",

    color: "#1e293b",

    fontWeight: "600",

    borderBottom:
      "1px solid #f1f5f9"
  }
};