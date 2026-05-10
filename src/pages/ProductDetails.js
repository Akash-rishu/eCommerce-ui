import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  const [quantity, setQuantity] =
    useState(1);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {

    try {

      const res =
        await API.get(`/products/${id}`);

      setProduct(
        res.data.data ||
        res.data
      );

    } catch (err) {

      console.log(err);
    }
  };

  // ADD TO CART
  const handleAddToCart = async () => {

    try {

      const token =
        localStorage.getItem("token");

      await API.post(
        `/cart?productId=${product.id}&quantity=${quantity}`,
        {},
        {
          headers: {
            Authorization:
              "Bearer " + token
          }
        }
      );

      alert("Added to cart");

    } catch (err) {

      console.log(
        err.response?.data ||
        err.message
      );

      alert("Add to cart failed");
    }
  };

  if (!product) {

    return (
      <p style={{ padding: "20px" }}>
        Loading...
      </p>
    );
  }

  return (

    <div style={styles.page}>

      <Navbar />

      <div style={styles.container}>

        {/* LEFT IMAGE */}
        <div style={styles.imageSection}>

          <div style={styles.imageCard}>

            <img
              src={`http://localhost:8080/images/${product.image}`}
              alt="product"
              style={styles.image}
              onError={(e) =>
                (
                  e.target.src =
                  "https://picsum.photos/400"
                )
              }
            />

          </div>

        </div>

        {/* RIGHT DETAILS */}
        <div style={styles.detailsSection}>

          <h1 style={styles.title}>
            {product.productName}
          </h1>

          <p style={styles.price}>
            ₹ {product.productPrice}
          </p>

          <p style={styles.stock}>
            In Stock:
            {" "}
            {product.stock}
          </p>

          <div style={styles.divider}></div>

          <h3>Description</h3>

          <p style={styles.description}>
            {product.description}
          </p>

          <div style={styles.divider}></div>

          <h3>Specifications</h3>

          <pre style={styles.specifications}>
            {product.specifications}
          </pre>

          {/* QUANTITY */}
          <div style={styles.quantityContainer}>

            <h3>
              Quantity
            </h3>

            <div style={styles.qtyBox}>

              <button
                style={styles.qtyBtn}
                onClick={() =>
                  setQuantity((q) =>
                    Math.max(1, q - 1)
                  )
                }
              >
                -
              </button>

              <span style={styles.qtyValue}>
                {quantity}
              </span>

              <button
                style={styles.qtyBtn}
                onClick={() =>
                  setQuantity((q) =>
                    q + 1
                  )
                }
              >
                +
              </button>

            </div>

          </div>

          {/* BUTTONS */}
          {
            localStorage.getItem("role")
            === "ROLE_USER" && (

              <div style={styles.buttonGroup}>

                <button
                  style={styles.cartBtn}
                  onClick={handleAddToCart}
                >
                  Add To Cart
                </button>

                <button
                  style={styles.buyBtn}
                >
                  Buy Now
                </button>

              </div>
            )
          }

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;

const styles = {

  page: {
    background: "#f1f3f6",
    minHeight: "100vh"
  },

  container: {
    display: "flex",
    gap: "40px",
    padding: "40px",
    maxWidth: "1300px",
    margin: "30px auto",
    background: "white",
    borderRadius: "20px",
    boxShadow:
      "0 6px 20px rgba(0,0,0,0.08)"
  },

  imageSection: {
    flex: 1,
    display: "flex",
    justifyContent: "center"
  },

  imageCard: {
    width: "450px",
    height: "450px",
    background: "#fafafa",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain"
  },

  detailsSection: {
    flex: 1.3
  },

  title: {
    fontSize: "38px",
    marginBottom: "10px",
    color: "#222"
  },

  price: {
    color: "green",
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "10px"
  },

  stock: {
    fontSize: "18px",
    color: "#444"
  },

  divider: {
    height: "1px",
    background: "#e5e7eb",
    margin: "25px 0"
  },

  description: {
    color: "#555",
    lineHeight: "1.8",
    fontSize: "16px"
  },

  specifications: {
    background: "#f9fafb",
    padding: "15px",
    borderRadius: "12px",
    fontSize: "15px",
    lineHeight: "1.8",
    whiteSpace: "pre-wrap"
  },

  quantityContainer: {
    marginTop: "25px"
  },

  qtyBox: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginTop: "10px"
  },

  qtyBtn: {
    width: "40px",
    height: "40px",
    border: "none",
    background: "#2874f0",
    color: "white",
    borderRadius: "8px",
    fontSize: "20px",
    cursor: "pointer"
  },

  qtyValue: {
    fontSize: "20px",
    fontWeight: "600"
  },

  buttonGroup: {
    display: "flex",
    gap: "20px",
    marginTop: "35px"
  },

  cartBtn: {
    flex: 1,
    background: "#ff9f00",
    color: "white",
    padding: "16px",
    border: "none",
    borderRadius: "12px",
    fontSize: "17px",
    fontWeight: "600",
    cursor: "pointer"
  },

  buyBtn: {
    flex: 1,
    background: "#fb641b",
    color: "white",
    padding: "16px",
    border: "none",
    borderRadius: "12px",
    fontSize: "17px",
    fontWeight: "600",
    cursor: "pointer"
  }
};