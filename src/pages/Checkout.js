import React, {
  useEffect,
  useState
} from "react";

import API from "../api";

import {
  useNavigate
} from "react-router-dom";

function Checkout() {

  const navigate = useNavigate();

  const [cartItems, setCartItems] =
    useState([]);

  const [address, setAddress] =
    useState("");

  const [paymentMethod,
    setPaymentMethod] =
    useState("COD");

  // FETCH CART
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await API.get(
        "/cart",
        {
          headers: {
            Authorization:
              "Bearer " + token
          }
        }
      );

      console.log(
        "Cart Response:",
        res.data
      );

      setCartItems(res.data || []);

    } catch (error) {

      console.log(
        "Cart Fetch Error:",
        error
      );
    }
  };

  // PRICE CALCULATIONS
  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      (
        item.product.productPrice *
        item.quantity
      ),
    0
  );

  const discount =
    subtotal > 5000 ? 500 : 0;

  const deliveryCharge =
    subtotal > 1000 ? 0 : 80;

  const platformFee = 10;

  const gst =
    Math.floor(subtotal * 0.18);

  const totalAmount =
    subtotal -
    discount +
    deliveryCharge +
    platformFee +
    gst;

  // PLACE ORDER
  const placeOrder = async () => {

    try {

      if (!address) {

        alert(
          "Please Enter Address"
        );

        return;
      }

      const token =
        localStorage.getItem("token");

      const body = {
        address,
        paymentMethod
      };

      const res = await API.post(
        "/orders/checkout",
        body,
        {
          headers: {
            Authorization:
              "Bearer " + token
          }
        }
      );

      console.log(
        "Checkout Response:",
        res.data
      );

      alert(
        "Order Placed Successfully"
      );

      navigate("/dashboard");

    } catch (error) {

      console.log(
        "Checkout Error:",
        error
      );

      alert(
        "Checkout Failed"
      );
    }
  };

  return (

    <div style={styles.container}>

      {/* LEFT SECTION */}
      <div style={styles.left}>

        <h2 style={styles.heading}>
          Checkout
        </h2>

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

          <select
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(
                e.target.value
              )
            }
            style={styles.select}
          >

            <option value="COD">
              Cash On Delivery
            </option>

            <option value="ONLINE">
              Online Payment
            </option>

          </select>

        </div>

        {/* ORDER ITEMS */}
        <div style={styles.card}>

          <h3>
            Order Items
          </h3>

          {
            cartItems.length > 0 ? (

              cartItems.map((item) => (

                <div
                  key={item.id}
                  style={styles.item}
                >

                  <img
                    src={`http://localhost:8080/images/${item.product.image}`}
                    alt=""
                    style={styles.image}
                  />

                  <div>

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
                      style={{
                        color: "green",
                        fontWeight: "bold"
                      }}
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
                Cart is Empty
              </p>
            )
          }

        </div>

      </div>

      {/* RIGHT SECTION */}
      <div style={styles.right}>

        <div style={styles.summary}>

          <h3>
            Price Details
          </h3>

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
              style={{
                color: "green"
              }}
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
              Delivery Charge
            </span>

            <span>
              ₹ {deliveryCharge}
            </span>

          </div>

          <div style={styles.row}>

            <span>
              Platform Fee
            </span>

            <span>
              ₹ {platformFee}
            </span>

          </div>

          <hr />

          <div style={styles.total}>

            <span>
              Total Amount
            </span>

            <span>
              ₹ {totalAmount}
            </span>

          </div>

          <button
            style={styles.button}
            onClick={placeOrder}
          >
            Place Order
          </button>

        </div>

      </div>

    </div>
  );
}

export default Checkout;

// STYLES
const styles = {

  container: {
    display: "flex",
    gap: "20px",
    padding: "20px",
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
    marginBottom: "20px"
  },

  card: {
    background: "white",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "10px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.1)"
  },

  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    marginTop: "10px"
  },

  select: {
    width: "100%",
    padding: "10px",
    marginTop: "10px"
  },

  item: {
    display: "flex",
    gap: "15px",
    marginTop: "15px",
    borderBottom:
      "1px solid #ddd",
    paddingBottom: "15px"
  },

  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px"
  },

  summary: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.1)",
    position: "sticky",
    top: "20px"
  },

  row: {
    display: "flex",
    justifyContent:
      "space-between",
    margin: "15px 0"
  },

  total: {
    display: "flex",
    justifyContent:
      "space-between",
    marginTop: "20px",
    fontSize: "20px",
    fontWeight: "bold"
  },

  button: {
    width: "100%",
    padding: "14px",
    marginTop: "20px",
    background: "#fb641b",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "5px"
  }
};