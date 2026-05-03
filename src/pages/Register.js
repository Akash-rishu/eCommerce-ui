import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await API.post("/auth/register", user);

      console.log("Response:", res.data);

      alert("Account created successfully ✅");

      navigate("/");

    } catch (err) {
      console.log(err.response);

      setError(
        err.response?.data?.message ||
        "Registration failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <h2 style={styles.title}>Registration Form</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleRegister}>

          <input
            style={styles.input}
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            name="email"
            type="email"
            placeholder="Email address"
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <div style={{ marginBottom: "10px" }}>
            <input type="checkbox" required />{" "}
            <span style={{ fontSize: "12px" }}>
              I accept terms & conditions
            </span>
          </div>

          <button style={styles.button} disabled={loading}>
            {loading ? "Creating..." : "CREATE ACCOUNT"}
          </button>

        </form>

        <p style={{ marginTop: "10px" }}>
          Already have an account?{" "}
          <Link to="/" style={{ color: "#0072ff" }}>
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;



// 🔥 STYLES

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #00c6ff, #0072ff)"
  },

  card: {
    width: "350px",
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    textAlign: "center"
  },

  title: {
    marginBottom: "20px",
    color: "#0072ff"
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    border: "none",
    borderBottom: "2px solid #00c6ff",
    outline: "none"
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(90deg, #00c6ff, #0072ff)",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold"
  }
};