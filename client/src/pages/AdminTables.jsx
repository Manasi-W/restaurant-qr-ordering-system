import { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/Admin.css";

function AdminTables() {
  const [tableCount, setTableCount] = useState(0);
  const [qrCodes, setQrCodes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCurrentTables = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/me", { withCredentials: true });
      if (res.data.tables) {
        setTableCount(res.data.tables);
        handleGenerate(null, res.data.tables);
      }
    } catch (err) {
      console.error("Error fetching admin details", err);
    }
  };

  useEffect(() => {
    fetchCurrentTables();
  }, []);

  const handleGenerate = async (e, countOverride) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const count = countOverride ?? tableCount;
      const res = await axios.post(
        "http://localhost:5000/api/admin/tables",
        { tables: count },
        { withCredentials: true }
      );
      setQrCodes(res.data.qrCodes);
      alert(res.data.message);
    } catch (err) {
      alert("Failed to generate tables");
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = (qr, table) => {
    const link = document.createElement("a");
    link.href = qr;
    link.download = `Table-${table}-QR.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="admin-page">
      <AdminNavbar />
      <div className="admin-container">
        <header className="admin-header">
          <h1 className="admin-title">Table & QR Management</h1>
          <p className="admin-subtitle">Generate and download QR codes for each table in your restaurant.</p>
        </header>

        <div className="admin-card" style={{ maxWidth: "500px", marginBottom: "2.5rem" }}>
          <h2 className="admin-card-title">Set Table Count</h2>
          <form onSubmit={(e) => handleGenerate(e)} style={{ display: "flex", gap: "1rem" }}>
            <input
              type="number"
              value={tableCount || ""}
              onChange={(e) => setTableCount(Number(e.target.value) || 0)}
              placeholder="Number of tables (e.g. 10)"
              className="admin-input"
              min={1}
              style={{ flex: 1 }}
            />
            <button type="submit" disabled={loading} className="admin-btn admin-btn-primary">
              {loading ? "Generating..." : "Generate & Save QR Codes"}
            </button>
          </form>
        </div>

        {qrCodes.length > 0 && (
          <div className="admin-qr-grid">
            {qrCodes.map((item) => (
              <div key={item.table} className="admin-qr-card">
                <div style={{ marginBottom: "0.75rem" }}>
                  <span className="admin-qr-label">TABLE</span>
                  <span className="admin-qr-num">{item.table}</span>
                </div>
                <img src={item.qr} alt={`Table ${item.table}`} className="admin-qr-image" />
                <p className="admin-qr-url">{item.url}</p>
                <button type="button" onClick={() => downloadQR(item.qr, item.table)} className="admin-btn admin-btn-ghost" style={{ width: "100%" }}>
                  Download PNG
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminTables;
