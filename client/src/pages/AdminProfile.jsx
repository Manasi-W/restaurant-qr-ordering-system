import { useState, useEffect } from "react";
import api from "../api/axios";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/Admin.css";

function AdminProfile() {
  const [profile, setProfile] = useState({
    adminName: "",
    restaurantName: "",
    email: "",
    phone: "",
    address: "",
    password: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/admin/me");
        setProfile({ ...res.data, password: "" });
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/api/admin/profile", profile);
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Error updating profile");
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading-spinner" />
        Loading profile...
      </div>
    );
  }

  return (
    <div className="admin-page">
      <AdminNavbar />
      <div className="admin-container" style={{ maxWidth: "800px" }}>
        <div className="admin-card">
          <h2 className="admin-title">Admin Profile</h2>
          <p className="admin-subtitle" style={{ marginBottom: "1.5rem" }}>Manage your restaurant&apos;s digital identity</p>

          <form onSubmit={handleSubmit}>
            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label className="admin-label">Admin Name</label>
                <input name="adminName" value={profile.adminName} onChange={handleChange} className="admin-input" />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Restaurant Name</label>
                <input name="restaurantName" value={profile.restaurantName} onChange={handleChange} className="admin-input" />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Email Address</label>
                <input name="email" type="email" value={profile.email} onChange={handleChange} className="admin-input" />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Phone Number</label>
                <input name="phone" value={profile.phone} onChange={handleChange} className="admin-input" />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Restaurant Address</label>
              <textarea name="address" value={profile.address} onChange={handleChange} className="admin-textarea" />
            </div>

            <div className="admin-form-group" style={{ borderTop: "1px solid var(--gray-100)", paddingTop: "1.25rem" }}>
              <label className="admin-label">New Password (leave blank to keep current)</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={profile.password}
                onChange={handleChange}
                className="admin-input"
              />
            </div>

            <button type="submit" className="admin-btn admin-btn-primary" style={{ width: "100%", padding: "1rem" }}>
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
