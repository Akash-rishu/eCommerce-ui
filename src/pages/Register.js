import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await API.post("/auth/register", user);
            alert("Registration Successful ✅");
            navigate("/");
        } catch (err) {
            alert("User already exists ❌");
        }
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2>Register</h2>

            <form onSubmit={handleRegister}>
                <input
                    name="name"
                    placeholder="Enter Name"
                    onChange={handleChange}
                    required
                />
                <br /><br />

                <input
                    name="email"
                    placeholder="Enter Email"
                    onChange={handleChange}
                    required
                />
                <br /><br />

                <input
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    onChange={handleChange}
                    required
                />
                <br /><br />

                <input
                    name="phoneNumber"
                    placeholder="Enter Phone Number"
                    onChange={handleChange}
                />
                <br /><br />

                <button type="submit">Register</button>
            </form>

            <p>
                Already have an account? <Link to="/">Login</Link>
            </p>
        </div>
    );
}

export default Register;