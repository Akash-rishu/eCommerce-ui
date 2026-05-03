import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminRoute from "./AdminRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import Unauthorized from "./pages/Unauthorized";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import ProtectedRoute from "./ProtectedRoute";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER ROUTE */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="ROLE_USER">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        // CART
        <Route path="/cart" 
            element={<Cart />} 
        />

        {/* ADMIN ROUTE */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ROLE_ADMIN">
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        // Product List
        <Route path="/products" element={<ProductList />} />

        // Product Details
        <Route path="/product/:id" 
          element={<ProductDetails />} 
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
         }
        />

        <Route
          path="/add-product"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />

        <Route path="/home" element={<Home />} />

        {/* UNAUTHORIZED */}
        <Route path="/unauthorized" element={<Unauthorized />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;