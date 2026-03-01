import { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/Admin.css";

function AdminSettings() {
  const [themeColors, setThemeColors] = useState({
    primary: "#166534",
    secondary: "#E7E5E4",
    accent: "#65A30D"
  });
  const [adminLogo, setAdminLogo] = useState(null);
  const [userLogo, setUserLogo] = useState(null);
  const [adminLogoPreview, setAdminLogoPreview] = useState(null);
  const [userLogoPreview, setUserLogoPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/me", { withCredentials: true });
        if (res.data.themeColors) {
          setThemeColors(res.data.themeColors);
        }
        if (res.data.adminLogoUrl) {
          setAdminLogoPreview(`http://localhost:5000${res.data.adminLogoUrl}`);
        }
        if (res.data.userLogoUrl) {
          setUserLogoPreview(`http://localhost:5000${res.data.userLogoUrl}`);
        }
      } catch (err) {
        console.error("Error fetching settings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleThemeChange = (color, value) => {
    setThemeColors({ ...themeColors, [color]: value });
  };

  const handleThemeSave = async () => {
    setSaving(true);
    try {
      await axios.put("http://localhost:5000/api/admin/theme", themeColors, { withCredentials: true });
      alert("Theme colors saved! Changes will apply to your customer menu.");
      // Apply theme immediately to current page
      document.documentElement.style.setProperty("--primary", themeColors.primary);
      document.documentElement.style.setProperty("--secondary", themeColors.secondary);
      document.documentElement.style.setProperty("--accent", themeColors.accent);
    } catch (err) {
      alert("Error saving theme");
    } finally {
      setSaving(false);
    }
  };

  const handleLogoChange = (type, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "admin") {
          setAdminLogo(file);
          setAdminLogoPreview(reader.result);
        } else {
          setUserLogo(file);
          setUserLogoPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = async (type) => {
    const file = type === "admin" ? adminLogo : userLogo;
    if (!file) {
      alert("Please select a logo file");
      return;
    }

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("logo", file);
      formData.append("type", type);

      const res = await axios.post("http://localhost:5000/api/admin/logo/upload", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (type === "admin") {
        setAdminLogo(null);
        setAdminLogoPreview(`http://localhost:5000${res.data.logoUrl}`);
      } else {
        setUserLogo(null);
        setUserLogoPreview(`http://localhost:5000${res.data.logoUrl}`);
      }

      alert(`${type === "admin" ? "Admin" : "User"} logo uploaded successfully!`);
    } catch (err) {
      alert(`Error uploading logo: ${err.response?.data?.message || err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading-spinner" />
        Loading settings...
      </div>
    );
  }

  return (
    <div className="admin-page">
      <AdminNavbar />
      <div className="admin-container" style={{ maxWidth: "900px" }}>
        <header className="admin-header">
          <h1 className="admin-title">Restaurant Settings</h1>
          <p className="admin-subtitle">Customize your theme colors and upload logos</p>
        </header>

        {/* Theme Customization */}
        <div className="admin-card" style={{ marginBottom: "2rem" }}>
          <h2 className="admin-card-title">Theme Colors</h2>
          <p style={{ color: "var(--text-tertiary)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
            Customize colors for your customer-facing menu. Changes apply immediately.
          </p>

          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label className="admin-label">Primary Color</label>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <input
                  type="color"
                  value={themeColors.primary}
                  onChange={(e) => handleThemeChange("primary", e.target.value)}
                  style={{ width: "60px", height: "40px", border: "none", borderRadius: "8px", cursor: "pointer" }}
                />
                <input
                  type="text"
                  value={themeColors.primary}
                  onChange={(e) => handleThemeChange("primary", e.target.value)}
                  className="admin-input"
                  style={{ flex: 1 }}
                  placeholder="#166534"
                />
              </div>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Secondary Color</label>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <input
                  type="color"
                  value={themeColors.secondary}
                  onChange={(e) => handleThemeChange("secondary", e.target.value)}
                  style={{ width: "60px", height: "40px", border: "none", borderRadius: "8px", cursor: "pointer" }}
                />
                <input
                  type="text"
                  value={themeColors.secondary}
                  onChange={(e) => handleThemeChange("secondary", e.target.value)}
                  className="admin-input"
                  style={{ flex: 1 }}
                  placeholder="#E7E5E4"
                />
              </div>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Accent Color</label>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <input
                  type="color"
                  value={themeColors.accent}
                  onChange={(e) => handleThemeChange("accent", e.target.value)}
                  style={{ width: "60px", height: "40px", border: "none", borderRadius: "8px", cursor: "pointer" }}
                />
                <input
                  type="text"
                  value={themeColors.accent}
                  onChange={(e) => handleThemeChange("accent", e.target.value)}
                  className="admin-input"
                  style={{ flex: 1 }}
                  placeholder="#65A30D"
                />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <button
              type="button"
              onClick={handleThemeSave}
              disabled={saving}
              className="admin-btn admin-btn-primary"
            >
              {saving ? "Saving..." : "Save Theme Colors"}
            </button>
            <button
              type="button"
              onClick={() => {
                setThemeColors({ primary: "#166534", secondary: "#E7E5E4", accent: "#65A30D" });
              }}
              className="admin-btn admin-btn-ghost"
            >
              Reset to Default
            </button>
          </div>
        </div>

        {/* Logo Upload */}
        <div className="admin-card">
          <h2 className="admin-card-title">Logos</h2>
          <p style={{ color: "var(--text-tertiary)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
            Upload logos for your admin panel and customer menu.
          </p>

          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label className="admin-label">Admin Panel Logo</label>
              {adminLogoPreview && (
                <img src={adminLogoPreview} alt="Admin logo preview" style={{ width: "150px", height: "60px", objectFit: "contain", marginBottom: "0.75rem", border: "1px solid var(--gray-200)", borderRadius: "8px", padding: "0.5rem" }} />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleLogoChange("admin", e.target.files[0])}
                className="admin-input"
                style={{ marginBottom: "0.5rem" }}
              />
              <button
                type="button"
                onClick={() => handleLogoUpload("admin")}
                disabled={!adminLogo || saving}
                className="admin-btn admin-btn-primary"
                style={{ width: "100%" }}
              >
                Upload Admin Logo
              </button>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Customer Menu Logo</label>
              {userLogoPreview && (
                <img src={userLogoPreview} alt="User logo preview" style={{ width: "150px", height: "60px", objectFit: "contain", marginBottom: "0.75rem", border: "1px solid var(--gray-200)", borderRadius: "8px", padding: "0.5rem" }} />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleLogoChange("user", e.target.files[0])}
                className="admin-input"
                style={{ marginBottom: "0.5rem" }}
              />
              <button
                type="button"
                onClick={() => handleLogoUpload("user")}
                disabled={!userLogo || saving}
                className="admin-btn admin-btn-primary"
                style={{ width: "100%" }}
              >
                Upload Customer Logo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;
