import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";

function AdminRegister() {
  const [formData, setFormData] = useState({
    adminName: "",
    restaurantName: "",
    email: "",
    phone: "",
    address: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/register", formData, { withCredentials: true });
      alert(res.data.message || "Registration successful");
      navigate("/admin/login");
    } catch (err) {
      console.error("Registration Error:", err);
      const msg = err.response?.data?.message || err.message || "Registration failed";
      alert(msg);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-card-light">
        <h2 className="auth-title">Join DineDash</h2>
        <p className="admin-subtitle" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Set up your restaurant&apos;s digital presence in minutes
        </p>

        <form onSubmit={handleRegister}>
          <div className="auth-grid">
            <div className="auth-form-group">
              <label className="auth-label">Admin Name</label>
              <input
                name="adminName"
                placeholder="John Doe"
                value={formData.adminName}
                onChange={handleChange}
                required
                className="auth-input"
              />
            </div>
            <div className="auth-form-group">
              <label className="auth-label">Restaurant Name (Unique Slug)</label>
              <input
                name="restaurantName"
                placeholder="marios-pizza"
                value={formData.restaurantName}
                onChange={handleChange}
                required
                className="auth-input"
              />
            </div>
          </div>

          <div className="auth-grid">
            <div className="auth-form-group">
              <label className="auth-label">Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="auth-input"
              />
            </div>
            <div className="auth-form-group">
              <label className="auth-label">Phone Number</label>
              <input
                name="phone"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                required
                className="auth-input"
              />
            </div>
          </div>

          <div className="auth-form-group">
            <label className="auth-label">Restaurant Address</label>
            <textarea
              name="address"
              placeholder="123 Street, City, State, ZIP"
              value={formData.address}
              onChange={handleChange}
              required
              className="auth-textarea"
            />
          </div>

          <div className="auth-form-group">
            <label className="auth-label">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="auth-input"
            />
          </div>

          <button type="submit" className="auth-submit">
            Create Company Account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/admin/login" className="auth-link">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default AdminRegister;
