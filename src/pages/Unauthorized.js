import React from "react";
import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🚫 Access Denied</h2>

      <p>You do not have permission to access this page.</p>

      <br />

      <button onClick={() => navigate("/")}>
        🔙 Go to Login
      </button>
    </div>
  );
}

export default Unauthorized;