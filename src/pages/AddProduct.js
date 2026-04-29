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

  // 🔥 Fetch categories
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

  // 🔥 Handle input
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 Submit product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const payload = {
        productName: product.productName,
        productDescription: product.productDescription,
        productPrice: product.productPrice,
        stock: product.stock,
        category: {
          id: product.categoryId
        }
      };

      await API.post("/products", payload, {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      alert("Product Added Successfully ✅");
      navigate("/products");

    } catch (err) {
      console.error(err);
      alert("Failed to add product ❌");
    }
  };

  return (
    <div>

      <Navbar />

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>Add Product</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            onChange={handleChange}
            required
          />
          <br /><br />

          <input
            type="text"
            name="productDescription"
            placeholder="Description"
            onChange={handleChange}
          />
          <br /><br />

          <input
            type="number"
            name="productPrice"
            placeholder="Price"
            onChange={handleChange}
            required
          />
          <br /><br />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            onChange={handleChange}
            required
          />
          <br /><br />

          {/* 🔥 Category Dropdown */}
          <select name="categoryId" onChange={handleChange} required>
            <option value="">Select Category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>
                {c.categoryName}
              </option>
            ))}
          </select>

          <br /><br />

          <button type="submit">Add Product</button>

        </form>
      </div>
    </div>
  );
}

export default AddProduct;