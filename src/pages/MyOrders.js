import React, {
  useEffect,
  useState
} from "react";

import API from "../api";

import Navbar from "../components/Navbar";

function MyOrders() {

  const [orders,
    setOrders] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  // FETCH ORDERS
  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders =
    async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await API.get(
          "/orders",
          {
            headers: {
              Authorization:
                "Bearer " + token
            }
          }
        );

      setOrders(
        res.data || []
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  // STATUS COLOR
  const getStatusColor =
    (status) => {

    switch (status) {

      case "PENDING":
        return "#f59e0b";

      case "SHIPPED":
        return "#2563eb";

      case "DELIVERED":
        return "#16a34a";

      case "CANCELLED":
        return "#ef4444";

      default:
        return "#64748b";
    }
  };

  return (

    <div style={styles.page}>

      <Navbar />

      <div style={styles.container}>

        {/* HEADER */}
        <div style={styles.header}>

          <h1 style={styles.heading}>
            📦 My Orders
          </h1>

          <p style={styles.subHeading}>
            Track all your orders and purchases
          </p>

        </div>

        {/* LOADING */}
        {
          loading && (

            <div style={styles.loadingBox}>
              Loading Orders...
            </div>
          )
        }

        {/* EMPTY */}
        {
          !loading &&
          orders.length === 0 && (

            <div style={styles.emptyBox}>

              <h2>
                No Orders Found
              </h2>

              <p>
                Your order history will appear here
              </p>

            </div>
          )
        }

        {/* ORDER LIST */}
        {
          orders.map((order) => (

            <div
              key={order.id}
              style={styles.orderCard}
            >

              {/* TOP */}
              <div style={styles.orderTop}>

                <div>

                  <h2>
                    Order #{order.id}
                  </h2>

                  <p style={styles.date}>
                    {
                      new Date(
                        order.createdAt
                      ).toLocaleString()
                    }
                  </p>

                </div>

                <div
                  style={{
                    ...styles.status,
                    background:
                      getStatusColor(
                        order.status
                      )
                  }}
                >
                  {order.status}
                </div>

              </div>

              {/* ADDRESS */}
              <div style={styles.section}>

                <h3>
                  📍 Delivery Address
                </h3>

                <p style={styles.text}>
                  {order.address}
                </p>

              </div>

              {/* PAYMENT */}
              <div style={styles.section}>

                <h3>
                  💳 Payment Method
                </h3>

                <p style={styles.text}>
                  {order.paymentMethod}
                </p>

              </div>

              {/* ITEMS */}
              <div style={styles.section}>

                <h3>
                  🛒 Ordered Items
                </h3>

                {
                  order.orderItems?.map(
                    (item, index) => (

                      <div
                        key={index}
                        style={styles.item}
                      >

                        <div>

                          <h4>
                            {
                              item.productName
                            }
                          </h4>

                          <p>
                            Quantity:
                            {" "}
                            {
                              item.quantity
                            }
                          </p>

                        </div>

                        <div
                          style={
                            styles.itemPrice
                          }
                        >

                          ₹
                          {" "}
                          {item.price}

                        </div>

                      </div>
                    )
                  )
                }

              </div>

              {/* TOTAL */}
              <div style={styles.totalBox}>

                <h2>
                  Total Paid
                </h2>

                <h1 style={styles.total}>
                  ₹ {order.totalPrice}
                </h1>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
}

export default MyOrders;

// MODERN UI STYLES
const styles = {

  page: {
    background:
      "linear-gradient(to bottom,#eef2ff,#f8fafc)",
    minHeight: "100vh"
  },

  container: {
    padding: "30px",
    maxWidth: "1200px",
    margin: "0 auto"
  },

  header: {
    marginBottom: "30px"
  },

  heading: {
    fontSize: "42px",
    fontWeight: "800",
    color: "#0f172a"
  },

  subHeading: {
    color: "#64748b",
    marginTop: "10px",
    fontSize: "16px"
  },

  loadingBox: {
    background: "white",
    padding: "40px",
    borderRadius: "24px",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "700"
  },

  emptyBox: {
    background: "white",
    padding: "60px",
    borderRadius: "24px",
    textAlign: "center",
    boxShadow:
      "0 8px 30px rgba(0,0,0,0.08)"
  },

  orderCard: {
    background: "white",
    borderRadius: "28px",
    padding: "30px",
    marginBottom: "30px",
    boxShadow:
      "0 10px 35px rgba(0,0,0,0.08)"
  },

  orderTop: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    borderBottom:
      "1px solid #e2e8f0",
    paddingBottom: "20px",
    marginBottom: "20px"
  },

  date: {
    color: "#64748b",
    marginTop: "8px"
  },

  status: {
    color: "white",
    padding: "10px 18px",
    borderRadius: "14px",
    fontWeight: "700",
    fontSize: "14px"
  },

  section: {
    marginBottom: "25px"
  },

  text: {
    color: "#475569",
    marginTop: "8px",
    lineHeight: "1.7"
  },

  item: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    background:
      "#f8fafc",
    padding: "18px",
    borderRadius: "18px",
    marginTop: "15px"
  },

  itemPrice: {
    fontWeight: "700",
    fontSize: "18px",
    color: "#16a34a"
  },

  totalBox: {
    marginTop: "25px",
    paddingTop: "20px",
    borderTop:
      "1px solid #e2e8f0",
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center"
  },

  total: {
    color: "#2563eb",
    fontSize: "36px"
  }
};