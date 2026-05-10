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

  const navigate = useNavigate();

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    try {

      const res =
        await API.get("/products");

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

  return (

    <div style={styles.container}>

      <Navbar />

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
          "Books"
        ].map((item, i) => (

          <span
            key={i}
            style={styles.categoryItem}
          >
            {item}
          </span>
        ))}

      </div>

      {/* BANNERS */}
      <div style={styles.bannerSection}>

        <img
          src="https://via.placeholder.com/800x250"
          alt=""
          style={styles.banner}
        />

        <img
          src="https://via.placeholder.com/800x250"
          alt=""
          style={styles.banner}
        />

        <img
          src="https://via.placeholder.com/300x250"
          alt=""
          style={styles.bannerSide}
        />

      </div>

      {/* PRODUCTS */}
      <div style={styles.productSection}>

        <h2 style={styles.heading}>
          Top Products
        </h2>

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
              >

                <div
                  style={
                    styles.imageContainer
                  }
                >

                  <img
                    src={`http://localhost:8080/images/${p.image}`}
                    alt="product"
                    style={styles.image}
                  />

                </div>

                <h3 style={styles.productName}>
                  {p.productName}
                </h3>

                <p style={styles.price}>
                  ₹ {p.productPrice}
                </p>

                <button
                  style={styles.btn}
                  onClick={() =>
                    navigate(
                      `/product/${p.id}`
                    )
                  }
                >
                  View
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

const styles = {

  container: {
    background: "#f1f3f6",
    minHeight: "100vh"
  },

  categoryBar: {
    display: "flex",
    gap: "20px",
    padding: "12px 20px",
    background: "white",
    overflowX: "auto",
    borderBottom:
      "1px solid #ddd"
  },

  categoryItem: {
    fontSize: "15px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    fontWeight: "500"
  },

  bannerSection: {
    display: "flex",
    gap: "10px",
    padding: "10px"
  },

  banner: {
    width: "40%",
    height: "250px",
    objectFit: "cover",
    borderRadius: "8px"
  },

  bannerSide: {
    width: "20%",
    height: "250px",
    objectFit: "cover",
    borderRadius: "8px"
  },

  productSection: {
    padding: "20px"
  },

  heading: {
    marginBottom: "20px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px"
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.1)",
    transition: "0.3s"
  },

  imageContainer: {
    width: "100%",
    height: "250px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    background: "#fff",
    borderRadius: "10px"
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain"
  },

  productName: {
    marginTop: "15px",
    fontSize: "24px",
    fontWeight: "600"
  },

  price: {
    color: "green",
    fontSize: "22px",
    fontWeight: "bold",
    margin: "15px 0"
  },

  btn: {
    padding: "10px 18px",
    background: "#2874f0",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "15px"
  }
};