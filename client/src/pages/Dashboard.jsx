import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/Admin.css";
import { OrdersIcon, RevenueIcon, DishIcon, CartIcon, QRCodeIcon, ForkKnifeIcon, ArrowUpRightIcon, ClocheIcon, CalendarChartIcon, CoinDishIcon, GrowthIcon, ClipboardCheckIcon, ServerChefIcon, RibbonBadgeIcon, SettingsProfileIcon, LogoutIcon } from "../components/ThemeIcons";
import PizzaImage from "../assets/pizza_slice_3d.png";
import BiryaniImage from "../assets/biryani_icon_3d.png";
import FriesImage from "../assets/fries_icon_3d.png";
import DosaImage from "../assets/dosa_icon_3d.png";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [restaurantName, setRestaurantName] = useState("");

  const handleLogout = async () => {
    try {
      await api.post("/api/admin/logout", {});
      navigate("/admin/login");
    } catch (err) {
      console.error("Logout failed", err);
      navigate("/admin/login");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, adminRes] = await Promise.all([
          api.get("/api/dashboard/stats"),
          api.get("/api/admin/me")
        ]);
        setStats(statsRes.data);
        setRestaurantName(adminRes.data.restaurantName);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
          <p className="admin-subtitle">Insights for <span style={{ color: "var(--primary)", fontWeight: "600" }}>{restaurantName || "your restaurant"}</span></p>
        </header>

        <div className="admin-stats-grid">
          <div className="admin-stat-card-illustrative">
            <div className="admin-stat-icon-illustrative theme-order">
              <ClocheIcon size={40} />
            </div>
            <div className="admin-stat-info">
              <span className="admin-stat-label">Today&apos;s Orders</span>
              <h2 className="admin-stat-value-compact">{stats?.todayOrders ?? 0}</h2>
              <div className="admin-stat-hint">Recent Activity Today</div>
            </div>
            <div className="admin-stat-wave">
              <svg viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 10 Q 25 20 50 10 T 100 10" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1" /></svg>
            </div>
          </div>

          <div className="admin-stat-card-illustrative">
            <div className="admin-stat-icon-illustrative theme-monthly">
              <CalendarChartIcon size={40} />
            </div>
            <div className="admin-stat-info">
              <span className="admin-stat-label">This Month&apos;s Orders</span>
              <h2 className="admin-stat-value-compact">{stats?.monthlyOrders ?? 0}</h2>
              <div className="admin-stat-hint">Running Monthly Total</div>
            </div>
            <div className="admin-stat-wave">
              <svg viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 10 Q 25 0 50 10 T 100 10" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1" /></svg>
            </div>
          </div>

          <div className="admin-stat-card-illustrative">
            <div className="admin-stat-icon-illustrative theme-revenue">
              <OrdersIcon size={40} />
            </div>
            <div className="admin-stat-info">
              <span className="admin-stat-label">All-Time Orders</span>
              <h2 className="admin-stat-value-compact">{stats?.totalOrders ?? 0}</h2>
              <div className="admin-stat-hint">Lifetime Business Volume</div>
            </div>
            <div className="admin-stat-wave">
              <svg viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 10 Q 25 10 50 10 T 100 10" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1" /></svg>
            </div>
          </div>

          <div className="admin-stat-card-illustrative">
            <div className="admin-stat-icon-illustrative theme-growth">
              <RevenueIcon size={40} />
            </div>
            <div className="admin-stat-info">
              <span className="admin-stat-label">This Month&apos;s Revenue</span>
              <h2 className="admin-stat-value-compact">₹{stats?.totalMonthlyRevenue?.toLocaleString() ?? 0}</h2>
              <div className="admin-stat-hint">Monthly Financial Output</div>
            </div>
            <div className="admin-stat-wave">
              <svg viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 10 Q 25 20 50 10 T 100 10" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1" /></svg>
            </div>
          </div>
        </div>

        <div className="admin-bottom-flex-layout">
          <div className="admin-items-horizontal-section">
            <div className="admin-section-head">
              <h3 className="admin-card-title">Top Ranked Items</h3>
              <span className="admin-section-badge">All-Time Statistics</span>
            </div>
            <div className="admin-food-list-vertical">
              {stats?.topSellingItems?.map((item, index) => (
                <div key={index} className="admin-food-row-matched">
                  <div className="admin-food-row-rank">
                    <span className="admin-rank-number">#{index + 1}</span>
                  </div>
                  <div className="admin-food-row-media">
                    {item._id.toLowerCase().includes('pizza') ? (
                      <img src={PizzaImage} alt="Pizza" />
                    ) : item._id.toLowerCase().includes('biryani') ? (
                      <img src={BiryaniImage} alt="Biryani" />
                    ) : item._id.toLowerCase().includes('fries') ? (
                      <img src={FriesImage} alt="Fries" />
                    ) : item._id.toLowerCase().includes('dosa') ? (
                      <img src={DosaImage} alt="Dosa" />
                    ) : (
                      <DishIcon size={40} color="var(--primary)" opacity={0.6} />
                    )}
                  </div>
                  <div className="admin-food-row-info">
                    <h4 className="admin-food-name-row">{item._id}</h4>
                  </div>
                  <div className="admin-food-row-metrics">
                    <div className="admin-metric-group">
                      <span className="admin-metric-label">Sold</span>
                      <span className="admin-metric-value">{item.totalSold}</span>
                    </div>
                    <div className="admin-metric-group">
                      <span className="admin-metric-label">Revenue</span>
                      <span className="admin-metric-value">₹{item.revenue?.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="admin-food-row-meta">
                    <ArrowUpRightIcon size={16} color="var(--success)" />
                  </div>
                </div>
              ))}
              {(!stats?.topSellingItems || stats.topSellingItems.length === 0) && (
                <p className="admin-empty">No selling data yet.</p>
              )}
            </div>
          </div>

          <div className="admin-quick-actions-sidebar">
            <h3 className="admin-card-title">Quick Actions & Tools</h3>
            <div className="admin-actions-grid-illustrative">
              <Link to="/admin/tables" className="admin-action-box bg-dark-green">
                <QRCodeIcon size={44} color="white" />
                <div className="admin-action-label">Generate QR Codes</div>
              </Link>
              <Link to="/admin/orders" className="admin-action-box bg-light-green">
                <ClipboardCheckIcon size={44} color="black" />
                <div className="admin-action-label">View Orders</div>
              </Link>
              <Link to="/admin/menu" className="admin-action-box bg-cream">
                <ServerChefIcon size={44} color="black" />
                <div className="admin-action-label">Update Menu</div>
              </Link>
              <Link to="/admin/profile" className="admin-action-box bg-grey">
                <SettingsProfileIcon size={44} />
                <div className="admin-action-label">Settings & Profile</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
