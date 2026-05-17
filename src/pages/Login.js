import React, { useState } from "react";

import API from "../api";

import {
  useNavigate,
  Link
} from "react-router-dom";

import jwtDecode from "jwt-decode";

import logo from "../images/logo.png";

function Login() {

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [error,
    setError] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const navigate =
    useNavigate();

  // =========================
  // LOGIN
  // =========================
  const handleLogin =
    async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      // LOGIN API
      const res =
        await API.post(
          "/auth/login",
          {
            email,
            password
          }
        );

      console.log(
        "LOGIN RESPONSE:",
        res.data
      );

      // TOKEN
      const token =
        res.data.token;

      // TOKEN CHECK
      if (!token) {

        setError(
          "Token not received from backend"
        );

        return;
      }

      // =========================
      // SAVE TOKEN
      // =========================
      localStorage.setItem(
        "token",
        token
      );

      // DECODE JWT
      const decoded =
        jwtDecode(token);

      console.log(
        "DECODED TOKEN:",
        decoded
      );

      // ROLE
      let role =
        decoded.role
        || decoded.authorities?.[0]
        || res.data.role
        || "ROLE_USER";

      // NORMALIZE ROLE
      role =
        role.includes("ADMIN")
        ? "ROLE_ADMIN"
        : "ROLE_USER";

      // SAVE ROLE
      localStorage.setItem(
        "role",
        role
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify({

          email:
            res.data.email,

          name:
            res.data.name,

          role
        })
      );

      // =========================
      // VERIFY STORAGE
      // =========================
      console.log(
        "TOKEN SAVED:",
        localStorage.getItem(
          "token"
        )
      );

      console.log(
        "ROLE SAVED:",
        localStorage.getItem(
          "role"
        )
      );

      console.log(
        "USER SAVED:",
        localStorage.getItem(
          "user"
        )
      );

      // =========================
      // REDIRECT
      // =========================
      setTimeout(() => {

        navigate(

          role === "ROLE_ADMIN"
          ? "/admin"
          : "/home"
        );

      }, 500);

    } catch (err) {

      console.log(err);

      setError(

        err.response?.data?.message
        || "Invalid email or password ❌"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div style={styles.container}>

      {/* LEFT SIDE */}
      <div style={styles.left}>

        <div style={styles.overlay}></div>

        <div style={styles.leftContent}>

          <img
            src={logo}
            alt="Wholesale Store Logo"
            style={styles.logo}
          />

          <h1 style={styles.title}>
            Wholesale Store
          </h1>

          <p style={styles.subtitle}>
            Smart Shopping Platform
            For Modern Businesses
          </p>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div style={styles.right}>

        <div style={styles.card}>

          <h2 style={styles.heading}>
            Welcome Back 👋
          </h2>

          <p style={styles.text}>
            Login to continue shopping
          </p>

          {
            error && (

              <div style={styles.errorBox}>
                {error}
              </div>
            )
          }

          {/* FORM */}
          <form
            onSubmit={handleLogin}
          >

            {/* EMAIL */}
            <div style={styles.inputGroup}>

              <label style={styles.label}>
                Email Address
              </label>

              <input
                style={styles.input}

                type="email"

                placeholder="Enter Email"

                value={email}

                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }

                required
              />

            </div>

            {/* PASSWORD */}
            <div style={styles.inputGroup}>

              <label style={styles.label}>
                Password
              </label>

              <input
                style={styles.input}

                type="password"

                placeholder="Enter Password"

                value={password}

                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }

                required
              />

            </div>

            {/* BUTTON */}
            <button
              style={styles.button}
              disabled={loading}
            >

              {
                loading
                ? "Logging in..."
                : "Login"
              }

            </button>

          </form>

          {/* REGISTER */}
          <p style={styles.registerText}>

            Don't have an account?{" "}

            <Link
              to="/register"
              style={styles.registerLink}
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;

// =========================
// STYLES
// =========================
const styles = {

  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily:
      "Arial, sans-serif"
  },

  // LEFT
  left: {
    flex: 1,
    position: "relative",
    background:
      "linear-gradient(135deg,#2563eb,#3b82f6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "rgba(255,255,255,0.05)",
    backdropFilter:
      "blur(2px)"
  },

  leftContent: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    color: "white",
    padding: "20px"
  },

  logo: {
    width: "100px",
    marginBottom: "20px"
  },

  title: {
    fontSize: "52px",
    fontWeight: "900",
    marginBottom: "12px"
  },

  subtitle: {
    fontSize: "20px",
    opacity: 0.9
  },

  // RIGHT
  right: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px"
  },

  card: {
    width: "100%",
    maxWidth: "430px",
    background: "white",
    padding: "45px",
    borderRadius: "30px",
    boxShadow:
      "0 15px 40px rgba(0,0,0,0.08)"
  },

  heading: {
    fontSize: "34px",
    fontWeight: "800",
    marginBottom: "10px",
    color: "#0f172a"
  },

  text: {
    color: "#64748b",
    marginBottom: "28px"
  },

  errorBox: {
    background: "#fee2e2",
    color: "#dc2626",
    padding: "14px",
    borderRadius: "14px",
    marginBottom: "18px",
    fontWeight: "600"
  },

  inputGroup: {
    marginBottom: "20px"
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "700",
    color: "#334155"
  },

  input: {
    width: "100%",
    padding: "16px",
    borderRadius: "16px",
    border:
      "1px solid #dbeafe",
    background: "#f8fafc",
    outline: "none",
    fontSize: "15px",
    transition: "0.3s"
  },

  button: {
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "18px",
    background:
      "linear-gradient(135deg,#2563eb,#3b82f6)",
    color: "white",
    fontWeight: "800",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow:
      "0 10px 25px rgba(37,99,235,0.25)"
  },

  registerText: {
    marginTop: "22px",
    textAlign: "center",
    color: "#64748b"
  },

  registerLink: {
    color: "#2563eb",
    fontWeight: "700",
    textDecoration: "none"
  }
};