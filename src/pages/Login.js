import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/login", {
                email,
                password,
            });

            const token = res.data.token;

            // Save token
            localStorage.setItem("token", token);

            // Decode JWT
            const decoded = jwtDecode(token);
            console.log("JWT Payload:", decoded);

            let role = "";

            // Extract role from all possible places
            if (decoded.role) {
                role = decoded.role;
            } else if (decoded.authorities?.length > 0) {
                role = decoded.authorities[0];
            } else if (decoded.authority) {
                role = decoded.authority;
            }

            // Normalize role (IMPORTANT)
            if (role && role.toUpperCase().includes("ADMIN")) {
                role = "ROLE_ADMIN";
            } else {
                role = "ROLE_USER";
            }

            console.log("FINAL ROLE:", role);

            // Save role
            localStorage.setItem("role", role);

            alert("Login Successful ✅");

            // Force reload so Navbar updates immediately
            window.location.href =
                role === "ROLE_ADMIN" ? "/admin" : "/dashboard";

        } catch (err) {
            console.error(err);
            alert("Invalid Credentials ❌");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br /><br />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br /><br />

                <button type="submit">Login</button>
            </form>

            <p style={{ marginTop: "10px" }}>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
}

export default Login;