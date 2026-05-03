import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data.data || res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ADD TO CART
  const handleAddToCart = async () => {
  try {
    await API.post(
      `/cart?productId=${product.id}&quantity=${quantity}`
    );

    alert("Added to cart ✅");
  } catch (err) {
    console.log(err.response?.data || err.message);
    alert("Add to cart failed ❌");
  }
};

  if (!product) return <p style={{ padding: "20px" }}>Loading...</p>;

  return (
    <div style={{ background: "#f1f3f6", minHeight: "100vh" }}>
      <Navbar />

      <div style={styles.container}>

        {/* LEFT IMAGE */}
        <div style={styles.imageBox}>
          <img
            src={`http://localhost:8080/images/${product.image}`}
            onError={(e) =>
              (e.target.src = "https://picsum.photos/300")
            }
            alt="product"
            style={styles.image}
          />
        </div>

        {/* RIGHT DETAILS */}
        <div style={styles.details}>

          <h2>{product.productName}</h2>

          <p style={styles.price}>
            ₹ {product.productPrice}
          </p>

          <p style={styles.desc}>
            {product.productDescription}
          </p>

          <p>
            <b>Stock:</b> {product.stock}
          </p>

          {/* QUANTITY */}
          <div style={styles.qtyBox}>
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>

          {/* ADD TO CART */}
          {localStorage.getItem("role") === "ROLE_USER" && (
            <button style={styles.cartBtn} onClick={handleAddToCart}>
              🛒 Add to Cart
            </button>
          )}

        </div>

      </div>
    </div>
  );
}

export default ProductDetails;

const styles = {
  container: {
    display: "flex",
    gap: "40px",
    padding: "40px",
    background: "white",
    margin: "20px"
  },

  imageBox: {
    flex: 1,
    textAlign: "center"
  },

  image: {
    width: "300px",
    height: "300px",
    objectFit: "cover",
    borderRadius: "10px"
  },

  details: {
    flex: 2
  },

  price: {
    color: "green",
    fontSize: "22px",
    fontWeight: "bold",
    margin: "10px 0"
  },

  desc: {
    color: "#555",
    marginBottom: "15px"
  },

  qtyBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "15px 0"
  },

  cartBtn: {
    background: "#ff9f00",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer"
  }
};