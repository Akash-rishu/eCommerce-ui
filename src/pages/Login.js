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

            // Decode token to get role
            const decoded = jwtDecode(token);

            const role =
                decoded.role || 
                (decoded.authorities && decoded.authorities[0]) || 
                "ROLE_USER";

            localStorage.setItem("role", role);

            alert("Login Successful ✅");

            // Redirect based on role
            if (role === "ROLE_ADMIN" || role === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }

        } catch (err) {
            alert("Invalid Credentials ❌");
        }
    };

    return (
        <div style={{ textAlign: "center" }}>
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

            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
}

export default Login;