import { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
<<<<<<< HEAD
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
        const res = await axios.get("http://localhost:5000/api/admin/me", { withCredentials: true });
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
      await axios.put("http://localhost:5000/api/admin/profile", profile, { withCredentials: true });
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

=======

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
                const res = await axios.get("http://localhost:5000/api/admin/me", { withCredentials: true });
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
            await axios.put("http://localhost:5000/api/admin/profile", profile, { withCredentials: true });
            alert("Profile updated successfully! ✅");
        } catch (err) {
            alert("Error updating profile");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={styles.page}>
            <AdminNavbar />
            <div style={styles.container}>
                <div style={styles.card}>
                    <h2 style={styles.title}>Admin Profile</h2>
                    <p style={styles.subtitle}>Manage your restaurant's digital identity</p>

                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.grid}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Admin Name</label>
                                <input
                                    name="adminName"
                                    value={profile.adminName}
                                    onChange={handleChange}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Restaurant Name</label>
                                <input
                                    name="restaurantName"
                                    value={profile.restaurantName}
                                    onChange={handleChange}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Email Address</label>
                                <input
                                    name="email"
                                    value={profile.email}
                                    onChange={handleChange}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Phone Number</label>
                                <input
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleChange}
                                    style={styles.input}
                                />
                            </div>
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Restaurant Address</label>
                            <textarea
                                name="address"
                                value={profile.address}
                                onChange={handleChange}
                                style={styles.textarea}
                            />
                        </div>

                        <div style={{ ...styles.inputGroup, borderTop: "1px solid #f1f5f9", paddingTop: "20px" }}>
                            <label style={styles.label}>New Password (leave blank to keep current)</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                value={profile.password}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>

                        <button type="submit" style={styles.submitBtn}>
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "'Outfit', sans-serif"
    },
    container: {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px 20px"
    },
    card: {
        background: "white",
        padding: "40px",
        borderRadius: "24px",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
    },
    title: {
        fontSize: "2rem",
        fontWeight: "800",
        color: "#0f172a",
        marginBottom: "8px"
    },
    subtitle: {
        color: "#64748b",
        marginBottom: "35px"
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        marginBottom: "20px"
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        marginBottom: "20px"
    },
    label: {
        fontSize: "0.9rem",
        fontWeight: "600",
        color: "#475569"
    },
    input: {
        padding: "12px 16px",
        borderRadius: "10px",
        border: "1px solid #e2e8f0",
        fontSize: "1rem",
        outline: "none",
        transition: "border-color 0.2s"
    },
    textarea: {
        padding: "12px 16px",
        borderRadius: "10px",
        border: "1px solid #e2e8f0",
        fontSize: "1rem",
        minHeight: "80px",
        outline: "none",
        resize: "vertical"
    },
    submitBtn: {
        width: "100%",
        padding: "16px",
        background: "#4f46e5",
        color: "white",
        borderRadius: "12px",
        border: "none",
        fontWeight: "600",
        fontSize: "1rem",
        cursor: "pointer",
        marginTop: "10px",
        transition: "background 0.2s"
    }
};

>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
export default AdminProfile;
