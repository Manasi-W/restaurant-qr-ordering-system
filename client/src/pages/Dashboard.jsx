import { useState, useEffect } from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/Admin.css";
=======
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard/stats", { withCredentials: true });
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

<<<<<<< HEAD
  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading-spinner" />
        Loading Analytics...
      </div>
    );
  }

  return (
    <div className="admin-page">
      <AdminNavbar />
      <div className="admin-container">
        <header className="admin-header">
          <h1 className="admin-title">Business Overview</h1>
          <p className="admin-subtitle">Insights and performance for your restaurant</p>
        </header>

        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <span className="admin-stat-label">Today&apos;s Orders</span>
            <h2 className="admin-stat-value">{stats?.todayOrders ?? 0}</h2>
            <div className="admin-stat-hint">Track today&apos;s activity</div>
          </div>
          <div className="admin-stat-card">
            <span className="admin-stat-label">Monthly Orders</span>
            <h2 className="admin-stat-value">{stats?.monthlyOrders ?? 0}</h2>
            <div className="admin-stat-hint">Running total for this month</div>
          </div>
          <div className="admin-stat-card highlight-green">
            <span className="admin-stat-label">Today&apos;s Revenue</span>
            <h2 className="admin-stat-value">₹{stats?.todayRevenue?.toLocaleString() ?? 0}</h2>
            <div className="admin-stat-hint">Finalized payments</div>
          </div>
          <div className="admin-stat-card highlight-purple">
            <span className="admin-stat-label">Monthly Revenue</span>
            <h2 className="admin-stat-value">₹{stats?.totalMonthlyRevenue?.toLocaleString() ?? 0}</h2>
            <div className="admin-stat-hint">Year-to-month growth</div>
          </div>
        </div>

        <div className="admin-bottom-grid">
          <div className="admin-card">
            <h3 className="admin-card-title">Top Selling Items</h3>
            <div>
              {stats?.topSellingItems?.map((item, index) => (
                <div key={index} className="admin-item-row">
                  <div>
                    <span className="admin-item-rank">#{index + 1}</span>
                    <span className="admin-item-name">{item._id}</span>
                  </div>
                  <div className="admin-item-meta">
                    <span className="admin-item-sold">{item.totalSold} sold</span>
                    <span className="admin-item-revenue">₹{item.revenue?.toLocaleString()}</span>
=======
  if (loading) return <div style={styles.loading}>Loading Analytics...</div>;

  return (
    <div style={styles.page}>
      <AdminNavbar />
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Business Overview</h1>
          <p style={styles.subtitle}>Insights and performance for your restaurant</p>
        </header>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <span style={styles.statLabel}>Today's Orders</span>
            <h2 style={styles.statValue}>{stats?.todayOrders || 0}</h2>
            <div style={styles.statTrend}>Real-time tracking</div>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statLabel}>Monthly Orders</span>
            <h2 style={styles.statValue}>{stats?.monthlyOrders || 0}</h2>
            <div style={styles.statTrend}>Running total for this month</div>
          </div>
          <div style={{ ...styles.statCard, background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", color: "white" }}>
            <span style={{ ...styles.statLabel, color: "rgba(255,255,255,0.8)" }}>Today's Revenue</span>
            <h2 style={styles.statValue}>₹{stats?.todayRevenue?.toLocaleString() || 0}</h2>
            <div style={{ ...styles.statTrend, color: "rgba(255,255,255,0.7)" }}>Finalized payments</div>
          </div>
          <div style={{ ...styles.statCard, background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)", color: "white" }}>
            <span style={{ ...styles.statLabel, color: "rgba(255,255,255,0.8)" }}>Monthly Revenue</span>
            <h2 style={styles.statValue}>₹{stats?.totalMonthlyRevenue?.toLocaleString() || 0}</h2>
            <div style={{ ...styles.statTrend, color: "rgba(255,255,255,0.7)" }}>Year-to-month growth</div>
          </div>
        </div>

        <div style={styles.bottomGrid}>
          <div style={styles.topItemsCard}>
            <h3 style={styles.cardTitle}>Top Selling Items</h3>
            <div style={styles.itemList}>
              {stats?.topSellingItems?.map((item, index) => (
                <div key={index} style={styles.itemRow}>
                  <div style={styles.itemInfo}>
                    <span style={styles.itemRank}>#{index + 1}</span>
                    <span style={styles.itemName}>{item._id}</span>
                  </div>
                  <div style={styles.itemStats}>
                    <span style={styles.itemSold}>{item.totalSold} sold</span>
                    <span style={styles.itemRevenue}>₹{item.revenue.toLocaleString()}</span>
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
                  </div>
                </div>
              ))}
              {(!stats?.topSellingItems || stats.topSellingItems.length === 0) && (
<<<<<<< HEAD
                <p className="admin-empty">No data available yet.</p>
              )}
            </div>
          </div>
          <div className="admin-card">
            <h3 className="admin-card-title">Quick Actions</h3>
            <div className="admin-actions-stack">
              <Link to="/admin/tables" className="admin-btn admin-btn-primary">Generate QR Codes</Link>
              <Link to="/admin/orders" className="admin-btn admin-btn-ghost">View Orders</Link>
              <Link to="/admin/menu" className="admin-btn admin-btn-ghost">Update Menu</Link>
=======
                <p style={styles.emptyText}>No data available yet.</p>
              )}
            </div>
          </div>

          <div style={styles.quickActionsCard}>
            <h3 style={styles.cardTitle}>Quick Actions</h3>
            <div style={styles.actionButtons}>
              <button style={styles.actionBtn}>Generate QR Codes</button>
              <button style={styles.actionBtn}>View Live Orders</button>
              <button style={styles.actionBtn}>Update Menu</button>
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default Dashboard;
=======
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f1f5f9",
    fontFamily: "'Outfit', sans-serif",
    color: "#1e293b"
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px"
  },
  header: {
    marginBottom: "40px"
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "800",
    marginBottom: "10px",
    letterSpacing: "-1px"
  },
  subtitle: {
    color: "#64748b",
    fontSize: "1.1rem"
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "25px",
    marginBottom: "40px"
  },
  statCard: {
    background: "white",
    padding: "25px",
    borderRadius: "20px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.2s"
  },
  statLabel: {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.05em"
  },
  statValue: {
    fontSize: "2.5rem",
    fontWeight: "800",
    margin: "15px 0 5px 0"
  },
  statTrend: {
    fontSize: "0.85rem",
    color: "#94a3b8"
  },
  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "25px"
  },
  topItemsCard: {
    background: "white",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
  },
  quickActionsCard: {
    background: "white",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: "700",
    marginBottom: "25px"
  },
  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 0",
    borderBottom: "1px solid #f1f5f9"
  },
  itemInfo: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },
  itemRank: {
    color: "#94a3b8",
    fontWeight: "600",
    width: "25px"
  },
  itemName: {
    fontWeight: "600",
    color: "#334155"
  },
  itemStats: {
    textAlign: "right"
  },
  itemSold: {
    display: "block",
    fontSize: "0.85rem",
    color: "#64748b"
  },
  itemRevenue: {
    fontWeight: "700",
    color: "#059669"
  },
  actionButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  actionBtn: {
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    background: "#f8fafc",
    color: "#334155",
    fontWeight: "600",
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.2s"
  },
  loading: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.2rem",
    color: "#64748b"
  },
  emptyText: {
    color: "#94a3b8",
    textAlign: "center",
    padding: "20px"
  }
};

export default Dashboard;
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
