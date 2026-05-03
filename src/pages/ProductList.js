import React, { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";

function ProductList() {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortType, setSortType] = useState("");
  const [minPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const searchTerm = query.get("search");

  // 🔥 FETCH PRODUCTS
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await API.get("/products");

      // 🔥 IMPORTANT FIX
      const data = res.data.data || res.data;

      console.log("Products:", data); // debug

      setProducts(data);
      setFilteredProducts(data);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 FILTER LOGIC
  useEffect(() => {
    let data = [...products];

    // SEARCH
    if (searchTerm) {
      data = data.filter(p =>
        p.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // CATEGORY
    if (selectedCategory) {
      data = data.filter(
        p => p.category?.id === parseInt(selectedCategory)
      );
    }

    // PRICE
    data = data.filter(
      p => p.productPrice >= minPrice && p.productPrice <= maxPrice
    );

    // SORT
    if (sortType === "low") {
      data.sort((a, b) => a.productPrice - b.productPrice);
    } else if (sortType === "high") {
      data.sort((a, b) => b.productPrice - a.productPrice);
    }

    setFilteredProducts(data);
    setCurrentPage(1);

  }, [products, selectedCategory, sortType, searchTerm, minPrice, maxPrice]);

  // 🔥 PAGINATION
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    start,
    start + itemsPerPage
  );

  // 🔥 ADD TO CART
  const handleAddToCart = async (id) => {
    try {
      await API.post(`/cart?productId=${id}&quantity=1`);
      alert("Added to cart ✅");
    } catch (err) {
      console.log(err);
      alert("Failed ❌");
    }
  };

  return (
    <div style={{ background: "#f1f3f6", minHeight: "100vh" }}>

      <Navbar />

      <div style={styles.container}>

        {/* 🔥 SIDEBAR */}
        <div style={styles.sidebar}>

          <h3>Filters</h3>

          {/* CATEGORY */}
          <h4>Category</h4>
          {categories.map(c => (
            <div key={c.id}>
              <input
                type="radio"
                name="category"
                value={c.id}
                onChange={(e) => setSelectedCategory(e.target.value)}
              />
              <label> {c.categoryName}</label>
            </div>
          ))}

          <button onClick={() => setSelectedCategory("")}>
            Clear
          </button>

          {/* PRICE */}
          <h4 style={{ marginTop: "20px" }}>Price Range</h4>

          <input
            type="range"
            min="0"
            max="100000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />

          <p>₹ {minPrice} - ₹ {maxPrice}</p>

          {/* SORT */}
          <h4>Sort</h4>
          <select onChange={(e) => setSortType(e.target.value)}>
            <option value="">Default</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>

        </div>

        {/* 🔥 PRODUCT GRID */}
        <div style={styles.grid}>

          {loading && <p>Loading products...</p>}

          {!loading && paginatedProducts.length === 0 && (
            <p>No products found</p>
          )}

          {!loading && paginatedProducts.map(p => (
            <div
              key={p.id}
              style={styles.card}
              onClick={() => navigate(`/product/${p.id}`)}
            >

              <img
                src={
                  p.image
                    ? `http://localhost:8080/images/${p.image}`
                    : "https://picsum.photos/200"
                }
                alt=""
                style={styles.image}
              />

              <div style={styles.rating}>
                ⭐ {p.rating || 4.2}
              </div>

              <h4>{p.productName}</h4>

              <p style={styles.price}>
                ₹ {p.productPrice}
              </p>

              <p style={styles.desc}>
                {p.productDescription}
              </p>

              <button
                style={styles.cartBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(p.id);
                }}
              >
                🛒 Add to Cart
              </button>

            </div>
          ))}

          {/* PAGINATION */}
          <div style={styles.pagination}>
            {[...Array(Math.ceil(filteredProducts.length / itemsPerPage))].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  ...styles.pageBtn,
                  background: currentPage === i + 1 ? "#2874f0" : "#eee",
                  color: currentPage === i + 1 ? "white" : "black"
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

export default ProductList;

const styles = {
  container: {
    display: "flex",
    gap: "20px",
    padding: "20px"
  },

  sidebar: {
    width: "250px",
    background: "white",
    padding: "15px",
    borderRadius: "8px",
    height: "fit-content"
  },

  grid: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px"
  },

  card: {
    background: "white",
    padding: "15px",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    transition: "0.3s"
  },

  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover"
  },

  price: {
    color: "green",
    fontWeight: "bold"
  },

  desc: {
    fontSize: "12px",
    color: "#555"
  },

  cartBtn: {
    marginTop: "10px",
    width: "100%",
    padding: "8px",
    background: "#ff9f00",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },

  rating: {
    background: "green",
    color: "white",
    padding: "2px 6px",
    fontSize: "12px",
    display: "inline-block",
    borderRadius: "4px",
    marginBottom: "5px"
  },

  pagination: {
    gridColumn: "1 / -1",
    textAlign: "center",
    marginTop: "20px"
  },

  pageBtn: {
    margin: "5px",
    padding: "6px 10px",
    border: "none",
    cursor: "pointer"
  }
};