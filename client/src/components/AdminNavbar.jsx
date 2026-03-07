import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";
import "../styles/Admin.css";

function AdminNavbar() {
  const navigate = useNavigate();
  const [adminLogo, setAdminLogo] = useState(null);
  const [restaurantName, setRestaurantName] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await api.get("/api/admin/me");
        if (res.data.adminLogoUrl) {
          setAdminLogo(`${api.defaults.baseURL}${res.data.adminLogoUrl}`);
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
      await api.post("/api/admin/logout", {});
      navigate("/admin/login");
    } catch (err) {
      console.error("Logout failed", err);
      navigate("/admin/login");
    }
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-brand">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {adminLogo && (
            <img src={adminLogo} alt="Logo" style={{ height: "32px", objectFit: "contain" }} />
          )}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2 className="admin-navbar-logo" style={{ marginBottom: 0, fontSize: "1.1rem" }}>
              Dine<span className="admin-navbar-logo-accent">Dash</span> Admin
            </h2>
            {restaurantName && (
              <span className="admin-navbar-rest-name">
                {restaurantName}
              </span>
            )}
          </div>
        </div>
        <button
          className="admin-mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      <div className={`admin-navbar-links ${isMobileMenuOpen ? "mobile-open" : ""}`}>
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) => "admin-navbar-link" + (isActive ? " active" : "")}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/menu"
          className={({ isActive }) => "admin-navbar-link" + (isActive ? " active" : "")}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Menu
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) => "admin-navbar-link" + (isActive ? " active" : "")}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Orders
        </NavLink>
        <NavLink
          to="/admin/tables"
          className={({ isActive }) => "admin-navbar-link" + (isActive ? " active" : "")}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Tables
        </NavLink>
        <NavLink
          to="/admin/profile"
          className={({ isActive }) => "admin-navbar-link" + (isActive ? " active" : "")}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Profile
        </NavLink>
        <NavLink
          to="/admin/settings"
          className={({ isActive }) => "admin-navbar-link" + (isActive ? " active" : "")}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Settings
        </NavLink>
        <button type="button" onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="admin-navbar-logout">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default AdminNavbar;
