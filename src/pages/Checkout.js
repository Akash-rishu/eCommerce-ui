import React, {
  useEffect,
  useState
} from "react";

import API from "../api";

import {
  useNavigate
} from "react-router-dom";

import {
  QRCodeCanvas
} from "qrcode.react";

function Checkout() {

  const navigate =
    useNavigate();

  const [cartItems,
    setCartItems] =
    useState([]);

  const [address,
    setAddress] =
    useState("");

  const [paymentMethod,
    setPaymentMethod] =
    useState("COD");

  const [showQR,
    setShowQR] =
    useState(false);

  const [loading,
    setLoading] =
    useState(false);

  // YOUR REAL UPI ID
  const upiId =
    "9155868288-3@ybl";

  // FETCH CART
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await API.get(
          "/cart",
          {
            headers: {
              Authorization:
                "Bearer "
                + token
            }
          }
        );

      setCartItems(
        res.data || []
      );

    } catch (error) {

      console.log(
        "Cart Error:",
        error
      );
    }
  };

  // PRICE CALCULATIONS
  const subtotal =
    cartItems.reduce(
      (total, item) =>
        total +
        (
          item.product
            .productPrice *
          item.quantity
        ),
      0
    );

  const discount =
    subtotal > 5000
    ? 500
    : 0;

  const deliveryCharge =
    subtotal > 1000
    ? 0
    : 80;

  const platformFee = 10;

  const gst =
    Math.floor(
      subtotal * 0.18
    );

  const totalAmount =
    subtotal -
    discount +
    deliveryCharge +
    platformFee +
    gst;

  // PLACE ORDER
  const placeOrder =
    async () => {

    try {

      // ADDRESS CHECK
      if (!address) {

        alert(
          "Please Enter Address"
        );

        return;
      }

      // EMPTY CART CHECK
      if (
        cartItems.length === 0
      ) {

        alert(
          "Cart is empty"
        );

        return;
      }

      // SHOW QR
      if (
        paymentMethod
        === "UPI"
      ) {

        setShowQR(true);

        return;
      }

      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      const body = {
        address,
        paymentMethod
      };

      await API.post(
        "/orders/checkout",
        body,
        {
          headers: {
            Authorization:
              "Bearer "
              + token
          }
        }
      );

      alert(
        "Order Placed Successfully"
      );

      navigate(
        "/dashboard"
      );

    } catch (error) {

      console.log(
        error.response?.data
      );

      alert(
        error.response?.data
        || "Checkout Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  // COMPLETE PAYMENT
  const completePayment =
    async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      await API.post(
        "/orders/checkout",
        {
          address,
          paymentMethod:
            "UPI"
        },
        {
          headers: {
            Authorization:
              "Bearer "
              + token
          }
        }
      );

      alert(
        "Payment Successful"
      );

      setShowQR(false);

      navigate(
        "/dashboard"
      );

    } catch (error) {

      console.log(
        error.response?.data
      );

      alert(
        error.response?.data
        || "Payment Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  const upiLink =
`upi://pay?pa=${upiId}&pn=AkashStore&am=${totalAmount}&cu=INR`;

  return (

    <div style={styles.page}>

      {/* LEFT */}
      <div style={styles.left}>

        <h1 style={styles.heading}>
          🛒 Secure Checkout
        </h1>

        {/* ADDRESS */}
        <div style={styles.card}>

          <h3>
            Delivery Address
          </h3>

          <textarea
            placeholder="Enter Full Address"
            value={address}
            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }
            style={styles.textarea}
          />

        </div>

        {/* PAYMENT */}
        <div style={styles.card}>

          <h3>
            Payment Method
          </h3>

          <label
            style={
              styles.paymentLabel
            }
          >

            <input
              type="radio"
              value="COD"
              checked={
                paymentMethod
                === "COD"
              }
              onChange={(e) =>
                setPaymentMethod(
                  e.target.value
                )
              }
            />

            Cash On Delivery

          </label>

          <label
            style={
              styles.paymentLabel
            }
          >

            <input
              type="radio"
              value="UPI"
              checked={
                paymentMethod
                === "UPI"
              }
              onChange={(e) =>
                setPaymentMethod(
                  e.target.value
                )
              }
            />

            UPI / GPay / PhonePe

          </label>

        </div>

        {/* ORDER ITEMS */}
        <div style={styles.card}>

          <h3>
            Order Items
          </h3>

          {
            cartItems.length > 0
            ? (

              cartItems.map(
                (item) => (

                <div
                  key={item.id}
                  style={styles.item}
                >

                  <img
                    src={`http://localhost:8080/images/${item.product.image}`}
                    alt="product"
                    style={styles.image}
                    onError={(e) =>
                      (
                        e.target.src =
                        "https://picsum.photos/200"
                      )
                    }
                  />

                  <div
                    style={
                      styles.itemDetails
                    }
                  >

                    <h4>
                      {
                        item.product
                          .productName
                      }
                    </h4>

                    <p>
                      Quantity:
                      {" "}
                      {
                        item.quantity
                      }
                    </p>

                    <p
                      style={
                        styles.price
                      }
                    >
                      ₹
                      {
                        item.product
                          .productPrice
                      }
                    </p>

                  </div>

                </div>
              ))

            ) : (

              <p>
                No products in cart
              </p>
            )
          }

        </div>

      </div>

      {/* RIGHT */}
      <div style={styles.right}>

        <div style={styles.summary}>

          <h2>
            🧾 Price Details
          </h2>

          <div style={styles.row}>
            <span>
              Subtotal
            </span>

            <span>
              ₹ {subtotal}
            </span>
          </div>

          <div style={styles.row}>
            <span>
              Discount
            </span>

            <span
              style={
                styles.green
              }
            >
              - ₹ {discount}
            </span>
          </div>

          <div style={styles.row}>
            <span>
              GST (18%)
            </span>

            <span>
              ₹ {gst}
            </span>
          </div>

          <div style={styles.row}>
            <span>
              Delivery
            </span>

            <span>
              ₹
              {
                deliveryCharge
              }
            </span>
          </div>

          <div style={styles.row}>
            <span>
              Platform Fee
            </span>

            <span>
              ₹
              {
                platformFee
              }
            </span>
          </div>

          <hr />

          <div style={styles.total}>
            <span>
              Total
            </span>

            <span>
              ₹
              {
                totalAmount
              }
            </span>
          </div>

          <p style={styles.deliveryText}>
            Estimated Delivery:
            2-4 Days
          </p>

          <button
            style={styles.button}
            onClick={placeOrder}
            disabled={loading}
          >

            {
              loading
              ? "Processing..."
              : paymentMethod
                === "UPI"
                ? "Proceed To Pay"
                : "Place Order"
            }

          </button>

        </div>

      </div>

      {/* QR MODAL */}
      {
        showQR && (

          <div
            style={
              styles.overlay
            }
          >

            <div
              style={styles.qrBox}
            >

              <h2>
                Scan & Pay
              </h2>

              <QRCodeCanvas
                value={upiLink}
                size={250}
              />

              <p
                style={{
                  marginTop:
                    "20px"
                }}
              >
                Scan using
                GPay / PhonePe / Paytm
              </p>

              <button
                style={
                  styles.payBtn
                }
                onClick={
                  completePayment
                }
              >
                Payment Completed
              </button>

              <button
                style={
                  styles.closeBtn
                }
                onClick={() =>
                  setShowQR(
                    false
                  )
                }
              >
                Close
              </button>

            </div>

          </div>
        )
      }

    </div>
  );
}

export default Checkout;

// STYLES
const styles = {

  page: {
    display: "flex",
    gap: "25px",
    padding: "25px",
    background: "#f1f3f6",
    minHeight: "100vh"
  },

  left: {
    flex: 2
  },

  right: {
    flex: 1
  },

  heading: {
    fontSize: "38px",
    marginBottom: "20px",
    fontWeight: "700"
  },

  card: {
    background: "white",
    padding: "25px",
    borderRadius: "18px",
    marginBottom: "20px",
    boxShadow:
      "0 4px 14px rgba(0,0,0,0.08)"
  },

  textarea: {
    width: "100%",
    minHeight: "130px",
    resize: "vertical",
    marginTop: "15px",
    padding: "15px",
    borderRadius: "12px",
    border:
      "1px solid #ddd",
    fontSize: "15px",
    outline: "none"
  },

  paymentLabel: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "18px",
    fontSize: "17px",
    background: "#f9fafb",
    padding: "15px",
    borderRadius: "12px",
    cursor: "pointer",
    border:
      "1px solid #e5e7eb"
  },

  item: {
    display: "flex",
    gap: "15px",
    marginTop: "20px",
    paddingBottom: "15px",
    borderBottom:
      "1px solid #eee"
  },

  image: {
    width: "110px",
    height: "110px",
    objectFit: "contain",
    background: "#fff",
    borderRadius: "12px",
    padding: "5px"
  },

  itemDetails: {
    flex: 1
  },

  price: {
    color: "green",
    fontWeight: "bold",
    marginTop: "10px",
    fontSize: "18px"
  },

  summary: {
    background: "white",
    padding: "25px",
    borderRadius: "18px",
    position: "sticky",
    top: "20px",
    boxShadow:
      "0 4px 14px rgba(0,0,0,0.08)"
  },

  row: {
    display: "flex",
    justifyContent:
      "space-between",
    margin: "16px 0",
    fontSize: "16px"
  },

  green: {
    color: "green",
    fontWeight: "600"
  },

  total: {
    display: "flex",
    justifyContent:
      "space-between",
    fontSize: "28px",
    fontWeight: "bold",
    marginTop: "20px"
  },

  deliveryText: {
    marginTop: "18px",
    color: "#16a34a",
    fontWeight: "600",
    textAlign: "center"
  },

  button: {
    width: "100%",
    padding: "16px",
    marginTop: "25px",
    background: "#fb641b",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "700",
    boxShadow:
      "0 6px 18px rgba(251,100,27,0.3)"
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent:
      "center",
    alignItems: "center",
    zIndex: 999
  },

  qrBox: {
    background: "white",
    padding: "35px",
    borderRadius: "22px",
    textAlign: "center",
    width: "340px"
  },

  payBtn: {
    width: "100%",
    padding: "14px",
    marginTop: "25px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600"
  },

  closeBtn: {
    width: "100%",
    padding: "14px",
    marginTop: "15px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600"
  }
};