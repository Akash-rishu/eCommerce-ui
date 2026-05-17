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

  // =========================
  // LOAD
  // =========================
  useEffect(() => {

    fetchProducts();

    fetchAddress();

  }, []);

  // =========================
  // FETCH PRODUCTS
  // =========================
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

  // =========================
  // FETCH ADDRESS
  // =========================
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
                "Bearer " + token
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

    <div style={styles.page}>

      <Navbar />

      {/* HERO */}
      <div style={styles.heroSection}>

        <div style={styles.heroLeft}>

          <h1 style={styles.heroTitle}>
            Big Billion Days
          </h1>

          <p style={styles.heroText}>
            Up To 80% OFF
            On Premium Products
          </p>

          <button
            style={styles.heroBtn}
          >
            Shop Now
          </button>

        </div>

        <div style={styles.heroRight}>

          <div style={styles.offerCard}>

            <h3>📱 Mobiles</h3>

            <p>
              Latest Smartphones
            </p>

          </div>

          <div style={styles.offerCard2}>

            <h3>👕 Fashion</h3>

            <p>
              Trending Styles
            </p>

          </div>

        </div>

      </div>

      {/* ADDRESS */}
      <div style={styles.addressBar}>

        <div>

          <p style={styles.deliveryText}>
            Deliver To
          </p>

          <h3 style={styles.location}>
            📍 {location}
          </h3>

        </div>

        <button
          style={styles.changeBtn}

          onClick={() =>
            navigate("/address")
          }
        >
          Change
        </button>

      </div>

      {/* CATEGORIES */}
      <div style={styles.categories}>

        {
          [
            "📱 Mobiles",
            "👕 Fashion",
            "💻 Electronics",
            "🏠 Home",
            "🎧 Audio",
            "⌚ Watches",
            "🧸 Toys",
            "📚 Books"
          ].map((item, i) => (

            <div
              key={i}
              style={styles.categoryCard}
            >
              {item}
            </div>
          ))
        }

      </div>

      {/* HEADER */}
      <div style={styles.sectionHeader}>

        <h2 style={styles.heading}>
          Trending Products
        </h2>

        <button
          style={styles.viewAll}

          onClick={() =>
            navigate("/products")
          }
        >
          View All
        </button>

      </div>

      {/* LOADING */}
      {
        loading && (

          <p style={{
            padding: "20px"
          }}>
            Loading...
          </p>
        )
      }

      {/* PRODUCTS */}
      <div style={styles.grid}>

        {
          products.map((p) => (

            <div
              key={p.id}

              style={styles.card}

              onMouseEnter={(e) => {

                e.currentTarget.style.transform =
                  "translateY(-5px)";
              }}

              onMouseLeave={(e) => {

                e.currentTarget.style.transform =
                  "translateY(0px)";
              }}
            >

              {/* IMAGE */}
              <div style={styles.imageBox}>

                <img

                  src={`http://localhost:8080/images/${p.image}`}

                  alt={p.productName}

                  style={styles.image}

                  onError={(e) => {

                    e.target.style.display =
                      "none";
                  }}
                />

              </div>

              {/* NAME */}
              <h3 style={styles.productName}>
                {p.productName}
              </h3>

              {/* PRICE */}
              <p style={styles.price}>
                ₹ {p.productPrice}
              </p>

              {/* BUTTON */}
              <button
                style={styles.productBtn}

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
  );
}

export default Home;

// =========================
// STYLES
// =========================
const styles = {

  page: {
    background: "#f1f3f6",
    minHeight: "100vh"
  },

  heroSection: {
    display: "grid",
    gridTemplateColumns:
      "2fr 1fr",
    gap: "16px",
    padding: "16px",
    maxWidth: "1400px",
    margin: "0 auto"
  },

  heroLeft: {
    background:
      "linear-gradient(135deg,#2563eb,#60a5fa)",
    borderRadius: "18px",
    padding: "35px",
    color: "white",
    minHeight: "220px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.08)"
  },

  heroTitle: {
    fontSize: "38px",
    fontWeight: "800",
    marginBottom: "10px"
  },

  heroText: {
    fontSize: "18px",
    marginBottom: "18px"
  },

  heroBtn: {
    width: "140px",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "white",
    color: "#2563eb",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "14px"
  },

  heroRight: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },

  offerCard: {
    flex: 1,
    background:
      "linear-gradient(135deg,#16a34a,#4ade80)",
    borderRadius: "18px",
    padding: "20px",
    color: "white",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.08)"
  },

  offerCard2: {
    flex: 1,
    background:
      "linear-gradient(135deg,#f97316,#fb923c)",
    borderRadius: "18px",
    padding: "20px",
    color: "white",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.08)"
  },

  addressBar: {
    background: "white",
    margin: "16px auto",
    padding: "16px 20px",
    borderRadius: "16px",
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.06)",
    maxWidth: "1400px"
  },

  deliveryText: {
    margin: 0,
    color: "#64748b",
    fontSize: "13px"
  },

  location: {
    marginTop: "4px",
    color: "#0f172a",
    fontSize: "18px"
  },

  changeBtn: {
    background:
      "linear-gradient(135deg,#2563eb,#3b82f6)",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700"
  },

  categories: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(120px,1fr))",
    gap: "14px",
    padding: "0 16px 16px 16px",
    maxWidth: "1400px",
    margin: "0 auto"
  },

  categoryCard: {
    background: "white",
    padding: "16px",
    borderRadius: "14px",
    textAlign: "center",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.06)",
    fontSize: "14px"
  },

  sectionHeader: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    padding: "10px 16px",
    maxWidth: "1400px",
    margin: "0 auto"
  },

  heading: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#0f172a"
  },

  viewAll: {
    background:
      "linear-gradient(135deg,#2563eb,#3b82f6)",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "18px",
    padding: "0 16px 30px 16px",
    maxWidth: "1400px",
    margin: "0 auto"
  },

  card: {
    background: "white",
    borderRadius: "16px",
    padding: "16px",
    textAlign: "center",
    transition: "0.3s",
    cursor: "pointer",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.06)"
  },

  imageBox: {
    width: "100%",
    height: "180px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: "12px",
    background: "#fff"
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain"
  },

  productName: {
    marginTop: "14px",
    fontSize: "16px",
    fontWeight: "600",
    minHeight: "45px",
    color: "#1e293b"
  },

  price: {
    color: "#16a34a",
    fontSize: "22px",
    fontWeight: "700",
    margin: "12px 0"
  },

  productBtn: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(135deg,#2563eb,#3b82f6)",
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "14px"
  }
};