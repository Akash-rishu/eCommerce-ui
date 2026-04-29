import React, { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

function ProductList() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <Navbar />

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>Product Listing</h2>

        {loading && <p>Loading...</p>}

        {!loading && products.length === 0 && (
          <p>No products found</p>
        )}

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          padding: "20px"
        }}>
          {products.map(p => (
            <div key={p.id} style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "10px"
            }}>
              <h3>{p.productName}</h3>
              <p>{p.productDescription}</p>
              <p><b>₹ {p.productPrice}</b></p>
              <p>Stock: {p.stock}</p>

              {/* USER ONLY */}
              {localStorage.getItem("role") === "ROLE_USER" && (
                <button>Add to Cart</button>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default ProductList;