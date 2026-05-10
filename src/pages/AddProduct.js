import React, { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function AddProduct() {

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productName: "",
    description: "",
    specifications: "",
    productPrice: "",
    stock: "",
    categoryId: ""
  });

  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [image, setImage] =
    useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {

    try {

      const res =
        await API.get("/categories");

      setCategories(
        res.data.data ||
        res.data ||
        []
      );

    } catch (err) {

      console.log(err);
    }
  };

  const handleChange = (e) => {

    setProduct({
      ...product,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const formData =
        new FormData();

      formData.append(
        "productName",
        product.productName
      );

      formData.append(
        "description",
        product.description
      );

      formData.append(
        "specifications",
        product.specifications
      );

      formData.append(
        "productPrice",
        product.productPrice
      );

      formData.append(
        "stock",
        product.stock
      );

      formData.append(
        "categoryId",
        product.categoryId
      );

      if (image) {

        formData.append(
          "image",
          image
        );
      }

      await API.post(
        "/products",
        formData,
        {
          headers: {
            Authorization:
              "Bearer " + token,
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

      alert(
        "Product Added Successfully"
      );

      navigate("/admin/products");

    } catch (err) {

      console.log(err);

      setError(
        "Failed To Add Product"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div style={styles.page}>

      <Navbar />

      <div style={styles.wrapper}>

        {/* LEFT SIDE */}
        <div style={styles.leftSection}>

          <h1 style={styles.title}>
            Add New Product
          </h1>

          <p style={styles.subtitle}>
            Create professional product
            listings for your wholesale
            store.
          </p>

          {
            image ? (

              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                style={styles.previewImage}
              />

            ) : (

              <div style={styles.imagePlaceholder}>
                Product Preview
              </div>
            )
          }

        </div>

        {/* RIGHT SIDE */}
        <div style={styles.formContainer}>

          {
            error && (
              <p style={styles.error}>
                {error}
              </p>
            )
          }

          <form onSubmit={handleSubmit}>

            <div style={styles.inputGroup}>

              <label style={styles.label}>
                Product Name
              </label>

              <input
                type="text"
                name="productName"
                placeholder="Enter Product Name"
                value={product.productName}
                onChange={handleChange}
                style={styles.input}
                required
              />

            </div>

            <div style={styles.inputGroup}>

              <label style={styles.label}>
                Description
              </label>

              <textarea
                name="description"
                placeholder="Enter Product Description"
                value={product.description}
                onChange={handleChange}
                style={styles.textarea}
                required
              />

            </div>

            <div style={styles.inputGroup}>

              <label style={styles.label}>
                Specifications
              </label>

              <textarea
                name="specifications"
                placeholder="RAM: 16GB
Storage: 512GB SSD
Processor: Intel i7"
                value={product.specifications}
                onChange={handleChange}
                style={styles.textarea}
              />

            </div>

            <div style={styles.row}>

              <div style={styles.halfInput}>

                <label style={styles.label}>
                  Price
                </label>

                <input
                  type="number"
                  name="productPrice"
                  placeholder="₹ Enter Price"
                  value={product.productPrice}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />

              </div>

              <div style={styles.halfInput}>

                <label style={styles.label}>
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  placeholder="Available Stock"
                  value={product.stock}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />

              </div>

            </div>

            <div style={styles.inputGroup}>

              <label style={styles.label}>
                Category
              </label>

              <select
                name="categoryId"
                value={product.categoryId}
                onChange={handleChange}
                style={styles.input}
                required
              >

                <option value="">
                  Select Category
                </option>

                {
                  categories.map((c) => (

                    <option
                      key={c.id}
                      value={c.id}
                    >
                      {c.categoryName}
                    </option>
                  ))
                }

              </select>

            </div>

            <div style={styles.inputGroup}>

              <label style={styles.label}>
                Upload Product Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(
                    e.target.files[0]
                  )
                }
                style={styles.fileInput}
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              style={styles.button}
            >

              {
                loading
                  ? "Adding Product..."
                  : "Add Product"
              }

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background: "#f4f6f9"
  },

  wrapper: {
    display: "flex",
    gap: "40px",
    maxWidth: "1200px",
    margin: "40px auto",
    padding: "20px"
  },

  leftSection: {
    flex: 1,
    background:
      "linear-gradient(135deg, #2874f0, #4f46e5)",
    borderRadius: "20px",
    padding: "40px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.15)"
  },

  title: {
    fontSize: "42px",
    marginBottom: "15px",
    fontWeight: "700"
  },

  subtitle: {
    textAlign: "center",
    opacity: "0.9",
    marginBottom: "30px",
    lineHeight: "1.6"
  },

  previewImage: {
    width: "320px",
    height: "320px",
    objectFit: "contain",
    borderRadius: "20px",
    background: "white",
    padding: "15px"
  },

  imagePlaceholder: {
    width: "320px",
    height: "320px",
    borderRadius: "20px",
    background:
      "rgba(255,255,255,0.15)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "22px",
    border:
      "2px dashed rgba(255,255,255,0.5)"
  },

  formContainer: {
    flex: 1.2,
    background: "white",
    borderRadius: "20px",
    padding: "35px",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.08)"
  },

  inputGroup: {
    marginBottom: "20px"
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#333"
  },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #dcdfe4",
    fontSize: "15px",
    outline: "none"
  },

  textarea: {
    width: "100%",
    height: "120px",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #dcdfe4",
    resize: "none",
    fontSize: "15px",
    outline: "none"
  },

  row: {
    display: "flex",
    gap: "20px"
  },

  halfInput: {
    flex: 1
  },

  fileInput: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #dcdfe4",
    background: "#fafafa"
  },

  button: {
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "12px",
    background:
      "linear-gradient(135deg, #2874f0, #4f46e5)",
    color: "white",
    fontSize: "17px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow:
      "0 6px 15px rgba(40,116,240,0.3)"
  },

  error: {
    background: "#fee2e2",
    color: "#dc2626",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "20px"
  }
};

export default AddProduct;