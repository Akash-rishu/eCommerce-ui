import React, { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  // FETCH CART
  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCartItems(res.data || []);
    } catch (err) {
      console.log("Cart fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // REMOVE ITEM
  const removeItem = async (id) => {
    try {
      await API.delete(`/cart/${id}`);
      setCartItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.log("Remove error:", err);
    }
  };

  // UPDATE QUANTITY
  const updateQty = async (cartId, qty) => {
    if (qty < 1) return;

    try {
      await API.put(`/cart/${cartId}?quantity=${qty}`);

      // Update UI instantly
      setCartItems(prev =>
        prev.map(item =>
          item.id === cartId ? { ...item, quantity: qty } : item
        )
      );
    } catch (err) {
      console.log("Update qty error:", err);
    }
  };

  // TOTAL PRICE
  const totalPrice = cartItems.reduce(
    (sum, item) =>
      sum + item.product.productPrice * item.quantity,
    0
  );

  return (
    <div style={{ background: "#f1f3f6", minHeight: "100vh" }}>
      <Navbar />

      <div style={styles.container}>

        {/* LEFT */}
        <div style={styles.left}>

          <h2>My Cart ({cartItems.length})</h2>

          {loading && <p>⏳ Loading...</p>}

          {!loading && cartItems.length === 0 && (
            <p>Your cart is empty 🛒</p>
          )}

          {cartItems.map(item => (
            <div key={item.id} style={styles.card}>

              {/* IMAGE */}
              <img
                src={`http://localhost:8080/images/${item.product.image}`}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/100")
                }
                alt="product"
                style={styles.image}
              />

              {/* DETAILS */}
              <div style={styles.details}>

                <h4>{item.product.productName}</h4>

                <p style={styles.price}>
                  ₹ {item.product.productPrice}
                </p>

                {/* QUANTITY */}
                <div style={styles.qtyBox}>
                  <button
                    style={styles.qtyBtn}
                    onClick={() => updateQty(item.id, item.quantity - 1)}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    style={styles.qtyBtn}
                    onClick={() => updateQty(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                {/* REMOVE */}
                <button
                  style={styles.removeBtn}
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>

              </div>

            </div>
          ))}

        </div>

        {/* RIGHT */}
        <div style={styles.right}>

          <h3>Price Details</h3>

          <p>Total Items: {cartItems.length}</p>

          <h2 style={{ color: "green" }}>
            ₹ {totalPrice}
          </h2>

          <button
            style={styles.checkoutBtn}
            onClick={() => navigate("/checkout")}
          >
            Place Order
          </button>

        </div>

      </div>
    </div>
  );
}

export default Cart;

const styles = {
  container: {
    display: "flex",
    gap: "20px",
    padding: "20px"
  },

  left: {
    flex: 2
  },

  right: {
    flex: 1,
    background: "white",
    padding: "15px",
    borderRadius: "8px",
    height: "fit-content"
  },

  card: {
    display: "flex",
    gap: "15px",
    background: "white",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  },

  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover"
  },

  details: {
    flex: 1
  },

  price: {
    color: "green",
    fontWeight: "bold"
  },

  // 🔥 THIS IS WHERE qtyBox IS USED
  qtyBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "10px"
  },

  qtyBtn: {
    padding: "4px 10px",
    border: "1px solid #ccc",
    cursor: "pointer",
    background: "white"
  },

  removeBtn: {
    marginTop: "10px",
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer"
  },

  checkoutBtn: {
    width: "100%",
    padding: "10px",
    background: "#fb641b",
    color: "white",
    border: "none",
    marginTop: "10px",
    borderRadius: "5px",
    cursor: "pointer"
  }
};