import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Admin.css";

function AdminNavbar() {
  const navigate = useNavigate();
  const [adminLogo, setAdminLogo] = useState(null);
  const [restaurantName, setRestaurantName] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/me", { withCredentials: true });
        if (res.data.adminLogoUrl) {
          setAdminLogo(`http://localhost:5000${res.data.adminLogoUrl}`);
        }
        setRestaurantName(res.data.restaurantName || "");
      } catch (err) {
        console.error("Error fetching admin data", err);
      }
    };
    fetchAdminData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/admin/logout", {}, { withCredentials: true });
      navigate("/admin/login");
    } catch (err) {
      console.error("Logout failed", err);
      navigate("/admin/login");
    }
  };

  return (
    <nav className="admin-navbar">
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {adminLogo && (
          <img src={adminLogo} alt="Logo" style={{ height: "40px", objectFit: "contain" }} />
        )}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2 className="admin-navbar-logo" style={{ marginBottom: 0 }}>
            Dine<span className="admin-navbar-logo-accent">Dash</span> Admin
          </h2>
          {restaurantName && (
            <span style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: "600", marginTop: "-2px" }}>
              {restaurantName}
            </span>
          )}
        </div>
      </div>
      <div className="admin-navbar-links">
        <NavLink to="/admin/dashboard" className={({ isActive }) => "admin-navbar-link" + (isActive ? " active" : "")}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/menu" className={({ isActive }) => "admin-navbar-link" + (isActive ? " active" : "")}>
          Menu
        </NavLink>
        <NavLink to="/admin/orders" className={({ isActive }) => "admin-navbar-link" + (isActive ? " active" : "")}>
          Orders
        </NavLink>
        <NavLink to="/admin/tables" className={({ isActive }) => "admin-navbar-link" + (isActive ? " active" : "")}>
          Tables
        </NavLink>
        <NavLink to="/admin/profile" className={({ isActive }) => "admin-navbar-link" + (isActive ? " active" : "")}>
          Profile
        </NavLink>
        <NavLink to="/admin/settings" className={({ isActive }) => "admin-navbar-link" + (isActive ? " active" : "")}>
          Settings
        </NavLink>
        <button type="button" onClick={handleLogout} className="admin-navbar-logout">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default AdminNavbar;
