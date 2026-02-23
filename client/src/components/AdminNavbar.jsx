<<<<<<< HEAD
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Admin.css";

function AdminNavbar() {
  const navigate = useNavigate();
  const [adminLogo, setAdminLogo] = useState(null);

  useEffect(() => {
    const fetchAdminLogo = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/me", { withCredentials: true });
        if (res.data.adminLogoUrl) {
          setAdminLogo(`http://localhost:5000${res.data.adminLogoUrl}`);
        }
      } catch (err) {
        console.error("Error fetching admin logo", err);
      }
    };
    fetchAdminLogo();
  }, []);
=======
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AdminNavbar() {
  const navigate = useNavigate();
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/admin/logout", {}, { withCredentials: true });
      navigate("/admin/login");
    } catch (err) {
      console.error("Logout failed", err);
<<<<<<< HEAD
=======
      // fallback
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
      navigate("/admin/login");
    }
  };

  return (
<<<<<<< HEAD
    <nav className="admin-navbar">
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {adminLogo && (
          <img src={adminLogo} alt="Logo" style={{ height: "40px", objectFit: "contain" }} />
        )}
        <h2 className="admin-navbar-logo">
          Dine<span className="admin-navbar-logo-accent">Dash</span> Admin
        </h2>
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
=======
    <div style={styles.navbar}>
      <h2 style={styles.logo}>Portal<span style={{ color: "#4f46e5" }}>Admin</span></h2>

      <div style={styles.links}>
        <Link to="/admin/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/admin/menu" style={styles.link}>Menu</Link>
        <Link to="/admin/orders" style={styles.link}>Orders</Link>
        <Link to="/admin/tables" style={styles.link}>Tables</Link>
        <Link to="/admin/profile" style={styles.link}>Profile</Link>
        <button onClick={handleLogout} style={styles.logout}>Logout</button>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    backgroundColor: "white",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    position: "sticky",
    top: 0,
    zIndex: 1000
  },
  logo: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: "800",
    color: "#0f172a"
  },
  links: {
    display: "flex",
    gap: "30px",
    alignItems: "center"
  },
  link: {
    color: "#475569",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "0.95rem",
    transition: "color 0.2s"
  },
  logout: {
    padding: "10px 20px",
    backgroundColor: "#ef4444",
    border: "none",
    color: "white",
    cursor: "pointer",
    borderRadius: "8px",
    fontWeight: "600",
    transition: "background 0.2s"
  }
};

export default AdminNavbar;
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
