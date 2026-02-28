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
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="auth-split-container">
      <div className="auth-sticker-panel">
        <img src="/src/assets/gourmet_sticker.png" alt="Gourmet sticker composition" className="auth-sticker-image" />
        <h3>Grow Your Business</h3>
        <p>Join the future of dining. Set up your digital menu and start taking orders in minutes.</p>
      </div>
      <div className="auth-form-panel">
        <div className="auth-content-box">
          <h2 className="auth-title-gourmet">Create <br />Account</h2>
          <p className="auth-subtitle-gourmet">
            Start your journey with DineDash.
            <Link to="/admin/login" className="highlight-link">Sign In</Link>
          </p>

          <form onSubmit={handleRegister}>
            <div className="auth-grid">
              <div className="auth-form-group">
                <label className="auth-label-soft">Restaurant Name</label>
                <input
                  name="restaurantName"
                  value={formData.restaurantName}
                  onChange={handleChange}
                  required
                  className="auth-input-pill"
                  placeholder="jennas-kitchen"
                />
              </div>

              <div className="auth-form-group">
                <label className="auth-label-soft">Admin Name</label>
                <input
                  name="adminName"
                  value={formData.adminName}
                  onChange={handleChange}
                  required
                  className="auth-input-pill"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="auth-grid">
              <div className="auth-form-group">
                <label className="auth-label-soft">Email Address</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="auth-input-pill"
                  placeholder="john.doe@gmail.com"
                />
              </div>

              <div className="auth-form-group">
                <label className="auth-label-soft">Phone Number</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="auth-input-pill"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="auth-form-group">
              <label className="auth-label-soft">Restaurant Address</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="auth-input-pill"
                placeholder="123 Street, City, State, ZIP"
              />
            </div>

            <div className="auth-form-group">
              <label className="auth-label-soft">Password</label>
              <div className="auth-password-wrapper">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="auth-input-pill"
                  placeholder="••••••••••••••••"
                />
                <span className="auth-password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {showPassword ? (
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    ) : (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    )}
                    {showPassword && <line x1="1" y1="1" x2="23" y2="23" />}
                  </svg>
                </span>
              </div>
            </div>


            <button type="submit" className="auth-submit-pill">
              Get Started for Free
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;
