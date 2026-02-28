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

            <div className="auth-divider-wrap">
              <div className="auth-divider-line"></div>
              <span>OR REGISTER WITH</span>
              <div className="auth-divider-line"></div>
            </div>

            <div className="auth-social-row">
              <div className="social-btn-icon" onClick={() => alert("Google Registration coming soon!")}>
                <svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
              </div>
              <div className="social-btn-icon" onClick={() => alert("Facebook Registration coming soon!")}>
                <svg viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </div>
              <div className="social-btn-icon" onClick={() => alert("Apple Registration coming soon!")}>
                <svg viewBox="0 0 24 24" fill="#000000"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" /></svg>
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
