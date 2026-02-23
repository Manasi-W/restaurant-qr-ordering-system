import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import "../styles/Auth.css";
=======
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
<<<<<<< HEAD
=======

>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    try {
      await axios.post(
=======

    try {
      const res = await axios.post(
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
        "http://localhost:5000/api/admin/login",
        { email, password },
        { withCredentials: true }
      );
<<<<<<< HEAD
      alert("Login successful");
=======

      alert("Login Successful ✅");
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
      navigate("/admin/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
<<<<<<< HEAD
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Admin Portal</h2>
        <form onSubmit={handleLogin}>
          <div className="auth-form-group">
            <label className="auth-label">Email Address</label>
=======
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "40px",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          color: "white"
        }}
      >
        <h2 style={{ marginBottom: "30px", textAlign: "center", fontWeight: "700", letterSpacing: "-1px" }}>
          Admin Portal
        </h2>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>Email Address</label>
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
<<<<<<< HEAD
              className="auth-input"
              placeholder="admin@restaurant.com"
            />
          </div>
          <div className="auth-form-group">
            <label className="auth-label">Password</label>
=======
              style={{
                width: "100%",
                marginTop: "8px",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.05)",
                color: "white",
                outline: "none"
              }}
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>Password</label>
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
<<<<<<< HEAD
              className="auth-input"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="auth-submit">
=======
              style={{
                width: "100%",
                marginTop: "8px",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.05)",
                color: "white",
                outline: "none"
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              fontSize: "16px",
              fontWeight: "600",
              background: "#4ecca3",
              color: "#1a1a2e",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "transform 0.2s, background 0.2s"
            }}
            onMouseOver={(e) => e.target.style.background = "#45b393"}
            onMouseOut={(e) => e.target.style.background = "#4ecca3"}
          >
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default AdminLogin;
=======
export default AdminLogin;
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
