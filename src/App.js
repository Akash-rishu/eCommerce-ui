import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminRoute from "./AdminRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import Unauthorized from "./pages/Unauthorized";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import ProtectedRoute from "./ProtectedRoute";

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

        {/* ADMIN ROUTE */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ROLE_ADMIN">
              <AdminPanel />
            </ProtectedRoute>
          }
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

        {/* UNAUTHORIZED */}
        <Route path="/unauthorized" element={<Unauthorized />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;