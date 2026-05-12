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

import Navbar from "../components/Navbar";

function Checkout() {

  const navigate =
    useNavigate();

  const [cartItems,
    setCartItems] =
    useState([]);

  const [addresses,
    setAddresses] =
    useState([]);

  const [selectedAddress,
    setSelectedAddress] =
    useState(null);

  const [paymentMethod,
    setPaymentMethod] =
    useState("COD");

  const [showQR,
    setShowQR] =
    useState(false);

  const [loading,
    setLoading] =
    useState(false);

  const upiId =
    "9155868288-3@ybl";

  // LOAD DATA
  useEffect(() => {

    fetchCart();

    fetchAddresses();

  }, []);

  // FETCH CART
  const fetchCart =
    async () => {

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
                "Bearer " + token
            }
          }
        );

      setCartItems(
        res.data || []
      );

    } catch (error) {

      console.log(error);
    }
  };

  // FETCH ADDRESS
  const fetchAddresses =
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

      setAddresses(
        res.data
      );

      if (
        res.data.length > 0
      ) {

        setSelectedAddress(
          res.data[0]
        );
      }

    } catch (error) {

      console.log(error);
    }
  };

  // CALCULATIONS
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

      if (
        !selectedAddress
      ) {

        alert(
          "Please Add Address"
        );

        return;
      }

      if (
        cartItems.length === 0
      ) {

        alert(
          "Cart is empty"
        );

        return;
      }

      // UPI
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

        address:

          `${selectedAddress.houseNo},
           ${selectedAddress.area},
           ${selectedAddress.city},
           ${selectedAddress.state}
           - ${selectedAddress.pincode}`,

        paymentMethod
      };

      await API.post(

        "/orders/checkout",

        body,

        {
          headers: {
            Authorization:
              "Bearer " + token
          }
        }
      );

      alert(
        "Order Placed Successfully"
      );

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

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

          address:

            `${selectedAddress.houseNo},
             ${selectedAddress.area},
             ${selectedAddress.city},
             ${selectedAddress.state}
             - ${selectedAddress.pincode}`,

          paymentMethod:
            "UPI"
        },

        {
          headers: {
            Authorization:
              "Bearer " + token
          }
        }
      );

      alert(
        "Payment Successful"
      );

      setShowQR(false);

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

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

    <div>

      <Navbar />

      <div style={styles.page}>

        {/* LEFT */}
        <div style={styles.left}>

          <h1 style={styles.heading}>
            🛒 Secure Checkout
          </h1>

          {/* ADDRESS */}
          <div style={styles.card}>

            <div style={styles.addressHeader}>

              <h2>
                Delivery Address
              </h2>

              <button
                style={styles.addBtn}
                onClick={() =>
                  navigate(
                    "/address"
                  )
                }
              >
                + Add Address
              </button>

            </div>

            {
              addresses.length > 0
              ? (

                addresses.map((a) => (

                  <div
                    key={a.id}

                    style={

                      selectedAddress?.id
                      === a.id

                      ? styles.selectedAddress

                      : styles.addressCard
                    }

                    onClick={() =>
                      setSelectedAddress(a)
                    }
                  >

                    <input
                      type="radio"
                      checked={
                        selectedAddress?.id
                        === a.id
                      }
                      readOnly
                    />

                    <div>

                      <h3>
                        {a.fullName}
                      </h3>

                      <p>
                        {a.houseNo},
                        {" "}
                        {a.area},
                        {" "}
                        {a.city},
                        {" "}
                        {a.state}
                      </p>

                      <p>
                        {a.pincode}
                      </p>

                      <p>
                        📞 {a.mobile}
                      </p>

                    </div>

                  </div>
                ))

              ) : (

                <div style={styles.noAddress}>

                  <h3>
                    No Address Found
                  </h3>

                  <button
                    style={styles.addBtn}
                    onClick={() =>
                      navigate(
                        "/address"
                      )
                    }
                  >
                    Add Address
                  </button>

                </div>
              )
            }

          </div>

          {/* PAYMENT */}
          <div style={styles.card}>

            <h2>
              Payment Method
            </h2>

            <label style={styles.paymentLabel}>

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

            <label style={styles.paymentLabel}>

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

        </div>

        {/* RIGHT */}
        <div style={styles.right}>

          <div style={styles.summary}>

            <h2>
              🧾 Price Details
            </h2>

            <div style={styles.row}>
              <span>Subtotal</span>
              <span>₹ {subtotal}</span>
            </div>

            <div style={styles.row}>
              <span>Discount</span>

              <span style={styles.green}>
                - ₹ {discount}
              </span>
            </div>

            <div style={styles.row}>
              <span>GST</span>
              <span>₹ {gst}</span>
            </div>

            <div style={styles.row}>
              <span>Delivery</span>

              <span>
                ₹ {deliveryCharge}
              </span>
            </div>

            <div style={styles.row}>
              <span>Platform Fee</span>

              <span>
                ₹ {platformFee}
              </span>
            </div>

            <hr />

            <div style={styles.total}>
              <span>Total</span>

              <span>
                ₹ {totalAmount}
              </span>
            </div>

            <p style={styles.deliveryText}>
              🚚 Estimated Delivery:
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

      </div>

      {/* QR MODAL */}
      {
        showQR && (

          <div style={styles.overlay}>

            <div style={styles.qrBox}>

              <h2>
                Scan & Pay
              </h2>

              <QRCodeCanvas
                value={upiLink}
                size={250}
              />

              <p style={{
                marginTop: "20px"
              }}>
                Scan using
                GPay / PhonePe / Paytm
              </p>

              <button
                style={styles.payBtn}
                onClick={
                  completePayment
                }
              >
                Payment Completed
              </button>

              <button
                style={styles.closeBtn}
                onClick={() =>
                  setShowQR(false)
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

// MODERN UI STYLES
const styles = {

  page: {
    display: "flex",
    gap: "30px",
    padding: "30px",
    background:
      "linear-gradient(to bottom,#eef2ff,#f8fafc)",
    minHeight: "100vh",
    fontFamily: "Arial"
  },

  left: {
    flex: 2
  },

  right: {
    flex: 1
  },

  heading: {
    fontSize: "42px",
    fontWeight: "800",
    marginBottom: "25px",
    color: "#1e293b"
  },

  card: {
    background: "white",
    padding: "28px",
    borderRadius: "24px",
    marginBottom: "24px",
    boxShadow:
      "0 8px 30px rgba(0,0,0,0.08)"
  },

  addressHeader: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },

  addBtn: {
    background:
      "linear-gradient(135deg,#2563eb,#3b82f6)",
    color: "white",
    border: "none",
    padding: "12px 18px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "700"
  },

  addressCard: {
    display: "flex",
    gap: "16px",
    border:
      "1px solid #e2e8f0",
    borderRadius: "18px",
    padding: "18px",
    marginBottom: "16px",
    cursor: "pointer",
    background: "#ffffff"
  },

  selectedAddress: {
    display: "flex",
    gap: "16px",
    border:
      "2px solid #2563eb",
    borderRadius: "18px",
    padding: "18px",
    marginBottom: "16px",
    cursor: "pointer",
    background:
      "linear-gradient(to right,#eff6ff,#dbeafe)"
  },

  paymentLabel: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginTop: "18px",
    background:
      "linear-gradient(to right,#f8fafc,#f1f5f9)",
    padding: "18px",
    borderRadius: "16px",
    cursor: "pointer",
    border:
      "1px solid #e2e8f0",
    fontSize: "16px",
    fontWeight: "600"
  },

  summary: {
    background: "white",
    padding: "30px",
    borderRadius: "24px",
    position: "sticky",
    top: "20px",
    boxShadow:
      "0 8px 30px rgba(0,0,0,0.08)"
  },

  row: {
    display: "flex",
    justifyContent:
      "space-between",
    margin: "18px 0",
    fontSize: "16px",
    color: "#334155"
  },

  green: {
    color: "#16a34a",
    fontWeight: "700"
  },

  total: {
    display: "flex",
    justifyContent:
      "space-between",
    fontSize: "30px",
    fontWeight: "800",
    marginTop: "25px",
    color: "#0f172a"
  },

  deliveryText: {
    marginTop: "18px",
    color: "#16a34a",
    fontWeight: "700",
    textAlign: "center"
  },

  button: {
    width: "100%",
    padding: "18px",
    marginTop: "28px",
    background:
      "linear-gradient(135deg,#fb641b,#ff8c42)",
    color: "white",
    border: "none",
    borderRadius: "18px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "800",
    boxShadow:
      "0 8px 24px rgba(251,100,27,0.35)"
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "rgba(15,23,42,0.75)",
    display: "flex",
    justifyContent:
      "center",
    alignItems: "center",
    zIndex: 999
  },

  qrBox: {
    background: "white",
    padding: "40px",
    borderRadius: "28px",
    textAlign: "center",
    width: "380px"
  },

  payBtn: {
    width: "100%",
    padding: "15px",
    marginTop: "28px",
    background:
      "linear-gradient(135deg,#16a34a,#22c55e)",
    color: "white",
    border: "none",
    borderRadius: "16px",
    cursor: "pointer",
    fontWeight: "700"
  },

  closeBtn: {
    width: "100%",
    padding: "15px",
    marginTop: "15px",
    background:
      "linear-gradient(135deg,#ef4444,#f87171)",
    color: "white",
    border: "none",
    borderRadius: "16px",
    cursor: "pointer",
    fontWeight: "700"
  },

  noAddress: {
    textAlign: "center",
    padding: "30px"
  }
};