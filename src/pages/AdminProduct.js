import React, {
  useEffect,
  useState
} from "react";

import API from "../api";
import AdminLayout from "../components/AdminLayout";

function AdminProducts() {

  const [products, setProducts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  // FETCH PRODUCTS
  const fetchProducts = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res =
        await API.get(
          "/products",
          {
            headers: {
              Authorization:
                "Bearer " + token
            }
          }
        );

      setProducts(
        res.data || []
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed to load products"
      );
    }
  };

  // EDIT PRODUCT
  const editProduct = async (
    product
  ) => {

    const updatedName = prompt(
      "Enter Product Name",
      product.productName
    );

    const updatedPrice = prompt(
      "Enter Product Price",
      product.productPrice
    );

    const updatedStock = prompt(
      "Enter Stock",
      product.stock
    );

    const updatedDescription = prompt(
      "Enter Description",
      product.description || ""
    );

    const updatedSpecifications = prompt(
      "Enter Specifications",
      product.specifications || ""
    );

    if (
      !updatedName ||
      !updatedPrice ||
      !updatedStock
    ) {
      return;
    }

    try {

      const token =
        localStorage.getItem("token");

      const formData =
        new FormData();

      formData.append(
        "productName",
        updatedName
      );

      formData.append(
        "description",
        updatedDescription
      );

      formData.append(
        "specifications",
        updatedSpecifications
      );

      formData.append(
        "productPrice",
        updatedPrice
      );

      formData.append(
        "stock",
        updatedStock
      );

      formData.append(
        "categoryId",
        product.category.id
      );

      await API.put(
        `/products/${product.id}`,
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
        "Product Updated Successfully"
      );

      fetchProducts();

    } catch (error) {

      console.log(error);

      alert(
        "Update Failed"
      );
    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      const token =
        localStorage.getItem("token");

      await API.delete(
        `/products/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setProducts((prev) =>
        prev.filter(
          (p) => p.id !== id
        )
      );

      alert(
        "Product Deleted Successfully"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Delete Failed"
      );
    }
  };

  // FILTER PRODUCTS
  const filteredProducts =
    products.filter(
      (p) =>

        p?.productName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        &&

        (
          category === "" ||

          p?.category
            ?.categoryName
            === category
        )
    );

  return (

    <AdminLayout>

      <div style={styles.header}>

        <h1 style={styles.heading}>
          Manage Products
        </h1>

      </div>

      {/* FILTER BAR */}
      <div style={styles.filterBar}>

        <input
          placeholder="Search Product..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={styles.search}
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          style={styles.select}
        >

          <option value="">
            All Categories
          </option>

          <option value="Electronics">
            Electronics
          </option>

          <option value="Mobiles">
            Mobiles
          </option>

          <option value="Fashion">
            Fashion
          </option>

        </select>

      </div>

      {/* PRODUCT GRID */}
      <div style={styles.grid}>

        {
          filteredProducts.length > 0
          ? (

            filteredProducts.map((p) => (

              <div
                key={p.id}
                style={styles.card}
              >

                {/* IMAGE */}
                <div
                  style={
                    styles.imageContainer
                  }
                >

                  <img
                    src={`http://localhost:8080/images/${p.image}`}
                    alt={p.productName}
                    style={styles.image}
                    onError={(e) =>
                      (
                        e.target.src =
                        "https://picsum.photos/300"
                      )
                    }
                  />

                </div>

                {/* NAME */}
                <h2 style={styles.name}>
                  {p.productName}
                </h2>

                {/* CATEGORY */}
                <p>
                  <strong>
                    Category:
                  </strong>
                  {" "}
                  {
                    p?.category
                      ?.categoryName
                  }
                </p>

                {/* PRICE */}
                <p style={styles.price}>
                  ₹ {p.productPrice}
                </p>

                {/* STOCK */}
                <p>
                  <strong>
                    Stock:
                  </strong>
                  {" "}
                  {p.stock}
                </p>

                {/* DESCRIPTION */}
                {
                  p.description && (
                    <>
                      <h4>
                        Description
                      </h4>

                      <p style={styles.desc}>
                        {p.description}
                      </p>
                    </>
                  )
                }

                {/* SPECIFICATIONS */}
                {
                  p.specifications && (
                    <>
                      <h4>
                        Specifications
                      </h4>

                      <div
                        style={styles.specs}
                      >
                        {
                          p.specifications
                        }
                      </div>
                    </>
                  )
                }

                {/* BUTTONS */}
                <div style={styles.actions}>

                  <button
                    style={
                      styles.editBtn
                    }
                    onClick={() =>
                      editProduct(p)
                    }
                  >
                    Edit
                  </button>

                  <button
                    style={
                      styles.deleteBtn
                    }
                    onClick={() =>
                      deleteProduct(
                        p.id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))

          ) : (

            <p>
              No Products Found
            </p>
          )
        }

      </div>

    </AdminLayout>
  );
}

export default AdminProducts;

// STYLES
const styles = {

  header: {
    marginBottom: "20px"
  },

  heading: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#222"
  },

  filterBar: {
    display: "flex",
    gap: "15px",
    marginBottom: "25px"
  },

  search: {
    padding: "12px",
    width: "280px",
    border:
      "1px solid #d1d5db",
    borderRadius: "10px",
    outline: "none",
    fontSize: "15px"
  },

  select: {
    padding: "12px",
    borderRadius: "10px",
    border:
      "1px solid #d1d5db",
    outline: "none"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "25px"
  },

  card: {
    background: "white",
    borderRadius: "18px",
    padding: "18px",
    boxShadow:
      "0 6px 18px rgba(0,0,0,0.08)",
    transition: "0.3s"
  },

  imageContainer: {
    width: "100%",
    height: "250px",
    background: "#f9fafb",
    borderRadius: "14px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: "15px"
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    padding: "10px"
  },

  name: {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#111827"
  },

  price: {
    color: "green",
    fontWeight: "700",
    fontSize: "22px",
    margin: "10px 0"
  },

  desc: {
    color: "#4b5563",
    lineHeight: "1.6"
  },

  specs: {
    background: "#f3f4f6",
    padding: "12px",
    borderRadius: "10px",
    whiteSpace: "pre-wrap",
    marginTop: "8px",
    lineHeight: "1.6"
  },

  actions: {
    display: "flex",
    gap: "12px",
    marginTop: "20px"
  },

  editBtn: {
    flex: 1,
    background: "#2874f0",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600"
  },

  deleteBtn: {
    flex: 1,
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600"
  }
};