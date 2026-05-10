import React, { useEffect, useState } from "react";
import API from "../api";

function AdminOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {

    try {

      // ✅ Get JWT token
      const token = localStorage.getItem("token");

      // ✅ Send token in header
      const res = await API.get("/orders", {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      console.log("Orders Response:", res.data);

      setOrders(res.data || []);

    } catch (error) {

      console.log("Order Fetch Error:", error);

      if (error.response?.status === 403) {
        alert("Access Denied!");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>Orders</h2>

      {orders.length > 0 ? (

        orders.map((o) => (

          <div key={o.id} style={styles.card}>

            <p>User: {o.user?.email}</p>

            <p>Total: ₹ {o.totalAmount}</p>

            <p>Status: {o.status}</p>

          </div>
        ))

      ) : (

        <p>No Orders Found</p>

      )}

    </div>
  );
}

export default AdminOrders;

const styles = {

  card: {
    padding: "15px",
    margin: "10px 0",
    background: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  }

};