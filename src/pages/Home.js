import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api";

function Home() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data.data || res.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>

      <Navbar />

      {/* CATEGORY BAR */}
      <div style={styles.categoryBar}>
        {[
          "For You", "Mobiles", "Fashion", "Electronics",
          "Home", "Appliances", "Toys", "Books"
        ].map((item, i) => (
          <span key={i} style={styles.categoryItem}>
            {item}
          </span>
        ))}
      </div>

      {/* BANNERS */}
      <div style={styles.bannerSection}>
        <img src="https://via.placeholder.com/800x250" style={styles.banner} />
        <img src="https://via.placeholder.com/800x250" style={styles.banner} />
        <img src="https://via.placeholder.com/300x250" style={styles.bannerSide} />
      </div>

      {/* PRODUCTS */}
      <div style={styles.productSection}>
        <h2>Top Products</h2>

        {loading && <p>Loading...</p>}

        {!loading && products.length === 0 && (
          <p>No products found</p>
        )}

        <div style={styles.grid}>
          {products.map((p) => (
            <div key={p.id} style={styles.card}>

              <img
              src={`http://localhost:8080/images/${p.image}`}
                alt="product"
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />

              <h4>{p.productName}</h4>
              <p style={{ color: "green" }}>₹ {p.productPrice}</p>

              <button style={styles.btn}>
                View
              </button>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Home;

const styles = {
  container: {
    background: "#f1f3f6",
    minHeight: "100vh"
  },

  categoryBar: {
    display: "flex",
    gap: "20px",
    padding: "10px 20px",
    background: "white",
    overflowX: "auto"
  },

  categoryItem: {
    fontSize: "14px",
    cursor: "pointer",
    whiteSpace: "nowrap"
  },

  bannerSection: {
    display: "flex",
    gap: "10px",
    padding: "10px"
  },

  banner: {
    width: "40%",
    borderRadius: "8px"
  },

  bannerSide: {
    width: "20%",
    borderRadius: "8px"
  },

  productSection: {
    padding: "20px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px"
  },

  card: {
    background: "white",
    padding: "15px",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },

  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    marginBottom: "10px"
  },

  btn: {
    padding: "8px 12px",
    background: "#2874f0",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};