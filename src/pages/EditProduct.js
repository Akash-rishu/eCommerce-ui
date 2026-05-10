import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productName: "",
    productPrice: "",
    stock: ""
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await API.get(`/products/${id}`);
    setProduct(res.data.data || res.data);
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("productName", product.productName);
      formData.append("productPrice", product.productPrice);
      formData.append("stock", product.stock);

      await API.put(`/products/${id}`, formData);

      alert("Updated ✅");
      navigate("/admin/products");

    } catch (err) {
      alert("Update failed ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Product</h2>

      <form onSubmit={updateProduct}>
        <input name="productName" value={product.productName} onChange={handleChange} />
        <input name="productPrice" value={product.productPrice} onChange={handleChange} />
        <input name="stock" value={product.stock} onChange={handleChange} />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditProduct;