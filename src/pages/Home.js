import React, {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import Navbar from "../components/Navbar";
import API from "../api";

function Home() {

  const navigate =
    useNavigate();

  const [products,
    setProducts] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [location,
    setLocation] =
    useState(
      "Select Address"
    );

  // LOAD
  useEffect(() => {

    fetchProducts();

    fetchAddress();

  }, []);

  // FETCH PRODUCTS
  const fetchProducts =
    async () => {

    try {

      const res =
        await API.get(
          "/products"
        );

      setProducts(

        res.data.data ||
        res.data ||
        []

      );

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  // FETCH ADDRESS
  const fetchAddress =
    async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      if (!token) return;

      const res =
        await API.get(
          "/address",
          {
            headers: {
              Authorization:
                "Bearer "
                + token
            }
          }
        );

      if (
        res.data.length > 0
      ) {

        const a =
          res.data[0];

        setLocation(

          `${a.city},
           ${a.state}
           - ${a.pincode}`

        );
      }

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div style={styles.container}>

      <Navbar />

      {/* DELIVERY BAR */}
      <div style={styles.deliveryBar}>

        <div>

          <p style={styles.deliveryLabel}>
            Deliver To
          </p>

          <h3 style={styles.deliveryLocation}>
            📍 {location}
          </h3>

        </div>

        <button
          style={styles.changeBtn}
          onClick={() =>
            navigate(
              "/address"
            )
          }
        >
          Change
        </button>

      </div>

      {/* CATEGORY BAR */}
      <div style={styles.categoryBar}>

        {[
          "For You",
          "Mobiles",
          "Fashion",
          "Electronics",
          "Home",
          "Appliances",
          "Toys",
          "Books",
          "Beauty",
          "Sports"
        ].map((item, i) => (

          <span
            key={i}
            style={styles.categoryItem}
          >
            {item}
          </span>
        ))}

      </div>

      {/* HERO SECTION */}
      <div style={styles.heroSection}>

        {/* MAIN BANNER */}
        <div style={styles.mainBanner}>

          <div>

            <h1 style={styles.bannerTitle}>
              Big Summer Sale
            </h1>

            <p style={styles.bannerText}>
              Up To 70% OFF
            </p>

            <button
              style={styles.shopBtn}
            >
              Shop Now
            </button>

          </div>

        </div>

        {/* SIDE BANNERS */}
        <div style={styles.sideBanners}>

          <div style={styles.sideBanner}>

            <h3>
              Electronics
            </h3>

            <p>
              Best Deals
            </p>

          </div>

          <div style={styles.sideBanner2}>

            <h3>
              Fashion
            </h3>

            <p>
              Trending Styles
            </p>

          </div>

        </div>

      </div>

      {/* PRODUCTS */}
      <div style={styles.productSection}>

        <div style={styles.headingRow}>

          <h2 style={styles.heading}>
            Top Products
          </h2>

          <button
            style={styles.viewAll}
            onClick={() =>
              navigate(
                "/products"
              )
            }
          >
            View All
          </button>

        </div>

        {
          loading &&
          <p>Loading...</p>
        }

        {
          !loading &&
          products.length === 0 && (
            <p>No products found</p>
          )
        }

        <div style={styles.grid}>

          {
            products.map((p) => (

              <div
                key={p.id}
                style={styles.card}

                onMouseEnter={(e) => {

                  e.currentTarget.style.transform =
                    "translateY(-8px)";

                  e.currentTarget.style.boxShadow =
                    "0 12px 28px rgba(0,0,0,0.15)";
                }}

                onMouseLeave={(e) => {

                  e.currentTarget.style.transform =
                    "translateY(0px)";

                  e.currentTarget.style.boxShadow =
                    "0 6px 18px rgba(0,0,0,0.08)";
                }}
              >

                {/* IMAGE */}
                <div
                  style={
                    styles.imageContainer
                  }
                >

                  <img
                    src={`http://localhost:8080/images/${p.image}`}
                    alt="product"
                    style={styles.image}

                    onMouseEnter={(e) => {

                      e.currentTarget.style.transform =
                        "scale(1.08)";
                    }}

                    onMouseLeave={(e) => {

                      e.currentTarget.style.transform =
                        "scale(1)";
                    }}

                    onError={(e) =>
                      (
                        e.target.src =
                        "https://picsum.photos/300"
                      )
                    }
                  />

                </div>

                {/* PRODUCT NAME */}
                <h3 style={styles.productName}>
                  {p.productName}
                </h3>

                {/* PRICE */}
                <p style={styles.price}>
                  ₹ {p.productPrice}
                </p>

                {/* BUTTON */}
                <button
                  style={styles.btn}
                  onClick={() =>
                    navigate(
                      `/product/${p.id}`
                    )
                  }
                >
                  View Product
                </button>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  );
}

export default Home;

// STYLES
const styles = {

  container: {
    background: "#f1f5f9",
    minHeight: "100vh"
  },

  deliveryBar: {
    background: "white",
    margin: "15px",
    padding: "18px 25px",
    borderRadius: "18px",
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.08)"
  },

  deliveryLabel: {
    margin: 0,
    color: "#64748b",
    fontSize: "13px"
  },

  deliveryLocation: {
    marginTop: "5px",
    color: "#0f172a"
  },

  changeBtn: {
    background:
      "linear-gradient(135deg,#2563eb,#3b82f6)",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700"
  },

  categoryBar: {
    display: "flex",
    gap: "22px",
    padding: "15px 20px",
    background: "white",
    overflowX: "auto",
    borderBottom:
      "1px solid #e2e8f0"
  },

  categoryItem: {
    fontSize: "15px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    fontWeight: "700",
    color: "#334155"
  },

  heroSection: {
    display: "grid",
    gridTemplateColumns:
      "2fr 1fr",
    gap: "15px",
    padding: "15px"
  },

  mainBanner: {
    height: "320px",
    background:
      "linear-gradient(135deg,#2563eb,#60a5fa)",
    borderRadius: "24px",
    color: "white",
    display: "flex",
    alignItems: "center",
    padding: "40px",
    boxShadow:
      "0 8px 24px rgba(37,99,235,0.25)"
  },

  bannerTitle: {
    fontSize: "50px",
    marginBottom: "10px"
  },

  bannerText: {
    fontSize: "24px",
    marginBottom: "20px"
  },

  shopBtn: {
    background: "white",
    color: "#2563eb",
    border: "none",
    padding: "14px 24px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "16px"
  },

  sideBanners: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  sideBanner: {
    flex: 1,
    background:
      "linear-gradient(135deg,#16a34a,#4ade80)",
    borderRadius: "24px",
    color: "white",
    padding: "25px",
    boxShadow:
      "0 8px 20px rgba(34,197,94,0.2)"
  },

  sideBanner2: {
    flex: 1,
    background:
      "linear-gradient(135deg,#f97316,#fb923c)",
    borderRadius: "24px",
    color: "white",
    padding: "25px",
    boxShadow:
      "0 8px 20px rgba(249,115,22,0.2)"
  },

  productSection: {
    padding: "20px"
  },

  headingRow: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "25px"
  },

  heading: {
    fontSize: "34px",
    fontWeight: "800",
    color: "#0f172a"
  },

  viewAll: {
    background:
      "linear-gradient(135deg,#2563eb,#3b82f6)",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "25px"
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow:
      "0 6px 18px rgba(0,0,0,0.08)",
    transition: "0.3s",
    cursor: "pointer"
  },

  imageContainer: {
    width: "100%",
    height: "250px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    background: "#fff",
    borderRadius: "14px"
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    transition: "0.3s"
  },

  productName: {
    marginTop: "15px",
    fontSize: "20px",
    fontWeight: "700",
    minHeight: "55px",
    color: "#1e293b"
  },

  price: {
    color: "#16a34a",
    fontSize: "26px",
    fontWeight: "800",
    margin: "15px 0"
  },

  btn: {
    padding: "12px 22px",
    background:
      "linear-gradient(135deg,#2563eb,#3b82f6)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "700",
    marginTop: "10px",
    boxShadow:
      "0 4px 12px rgba(37,99,235,0.3)"
  }
};