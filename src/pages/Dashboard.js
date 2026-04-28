import React, { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

function Dashboard() {

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FETCH DATA
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      const data = res.data.data || [];
      setProducts(data);
      setFiltered(data);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data.data || []);
    } catch (err) {
      console.log("Category error", err);
    }
  };

  // FILTER LOGIC
  useEffect(() => {
    let result = products;

    if (search) {
      result = result.filter(p =>
        p.productName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      result = result.filter(p => p.category?.id == category);
    }

    setFiltered(result);

  }, [search, category, products]);

  return (
    <div>

      {/* NAVBAR */}
      <Navbar />

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>Products</h2>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <br /><br />

        {/* CATEGORY FILTER */}
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>
              {c.categoryName}
            </option>
          ))}
        </select>

        <br /><br />

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* PRODUCTS */}
        {!loading && filtered.length > 0 && (
          <div>
            {filtered.map(p => (
              <div key={p.id} style={{
                border: "1px solid #ccc",
                margin: "10px",
                padding: "10px"
              }}>
                <h3>{p.productName}</h3>
                <p>{p.productDescription}</p>
                <p>₹ {p.productPrice}</p>

                {/* USER ONLY */}
                {localStorage.getItem("role") === "ROLE_USER" && (
                  <button>Add to Cart</button>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <p>No products found</p>
        )}

      </div>
    </div>
  );
}

export default Dashboard;