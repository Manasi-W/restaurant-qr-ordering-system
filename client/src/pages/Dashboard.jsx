import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/Admin.css";

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
            <div className="admin-item-list">
              {stats?.topSellingItems?.map((item, index) => (
                <div key={index} className="admin-item-row">
                  <div>
                    <span className="admin-item-rank">#{index + 1}</span>
                    <span className="admin-item-name">{item._id}</span>
                  </div>
                  <div className="admin-item-meta">
                    <span className="admin-item-sold">{item.totalSold} sold</span>
                    <span className="admin-item-revenue">₹{item.revenue?.toLocaleString()}</span>
                  </div>
                </div>
              ))}
              {(!stats?.topSellingItems || stats.topSellingItems.length === 0) && (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
