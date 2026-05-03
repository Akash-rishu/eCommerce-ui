import React, { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function AddProduct() {

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    stock: "",
    categoryId: ""
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null); // ✅ correct

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data.data || []);
    } catch (err) {
      console.log("Category fetch error", err);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 FIXED SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("productName", product.productName);
      formData.append("productDescription", product.productDescription);
      formData.append("productPrice", product.productPrice);
      formData.append("stock", product.stock);
      formData.append("categoryId", product.categoryId);
      formData.append("image", image); // ✅ FIXED

      await API.post("/products", formData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Product Added Successfully ✅");
      navigate("/products");

    } catch (err) {
      console.error(err);
      setError("Failed to add product ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#f1f3f6", minHeight: "100vh" }}>

      <Navbar />

      <div style={{
        maxWidth: "420px",
        margin: "40px auto",
        background: "white",
        padding: "25px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>

        <h2 style={{ marginBottom: "20px" }}>Add Product</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>

          <input
            style={inputStyle}
            type="text"
            name="productName"
            placeholder="Product Name"
            value={product.productName}
            onChange={handleChange}
            required
          />

          <input
            style={inputStyle}
            type="text"
            name="productDescription"
            placeholder="Description"
            value={product.productDescription}
            onChange={handleChange}
          />

          <input
            style={inputStyle}
            type="number"
            name="productPrice"
            placeholder="Price"
            value={product.productPrice}
            onChange={handleChange}
            required
          />

          {/* IMAGE INPUT */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          {/* 🔥 IMAGE PREVIEW (BONUS) */}
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              style={{ width: "100px", margin: "10px 0" }}
            />
          )}

          <input
            style={inputStyle}
            type="number"
            name="stock"
            placeholder="Stock"
            value={product.stock}
            onChange={handleChange}
            required
          />

          <select
            style={inputStyle}
            name="categoryId"
            value={product.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>
                {c.categoryName}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              background: "#2874f0",
              color: "white",
              borderRadius: "5px",
              marginTop: "10px"
            }}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>

        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

export default AddProduct;

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