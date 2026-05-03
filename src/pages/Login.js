import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import logo from "../images/logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      const token = res.data.token;

      // Save token
      localStorage.setItem("token", token);

      // Decode JWT
      const decoded = jwtDecode(token);

      let role = decoded.role || decoded.authorities?.[0];

      // Normalize role
      role = role?.includes("ADMIN") ? "ROLE_ADMIN" : "ROLE_USER";

      localStorage.setItem("role", role);

      // Redirect
      window.location.href =
        role === "ROLE_ADMIN" ? "/admin" : "/products";

    } catch (err) {
      setError("Invalid email or password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>

      {/* 🔥 LEFT SIDE */}
      <div style={styles.left}>
        <div style={styles.leftContent}>

          <img
            src={logo}
            alt="Wholesale Store Logo"
            style={styles.logo}
          />

          <h1>Wholesale Store</h1>
          <p>Login to access your business account</p>

        </div>
      </div>

      {/* 🔥 RIGHT SIDE */}
      <div style={styles.right}>

        <div style={styles.card}>
          <h2 style={{ marginBottom: "10px" }}>Welcome Back</h2>
          <p style={{ color: "#777", marginBottom: "20px" }}>
            Login to continue
          </p>

          {error && (
            <p style={{ color: "red", marginBottom: "10px" }}>
              {error}
            </p>
          )}

          <form onSubmit={handleLogin}>

            <input
              style={styles.input}
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              style={styles.input}
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button style={styles.button} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          {/* 🔥 REGISTER LINK */}
          <p style={{ marginTop: "15px", textAlign: "center" }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#6a11cb",
                fontWeight: "bold",
                textDecoration: "none"
              }}
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



/* 🔥 STYLES */

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    background: "#f5f6fa"
  },

  left: {
    flex: 1,
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white"
  },

  leftContent: {
    textAlign: "center"
  },

  logo: {
    width: "80px",
    marginBottom: "15px"
  },

  right: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  card: {
    width: "350px",
    padding: "30px",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none"
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#6a11cb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer"
  }
};