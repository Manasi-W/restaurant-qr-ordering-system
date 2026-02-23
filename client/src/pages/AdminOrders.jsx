import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/Admin.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders", { withCredentials: true });
      setOrders(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}/status`, { status }, { withCredentials: true });
      fetchOrders();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending": return { bg: "#fef3c7", color: "#92400e" };
      case "Cooking": return { bg: "#dbeafe", color: "#1e40af" };
      case "Served": return { bg: "#d1fae5", color: "#065f46" };
      case "Paid": return { bg: "#f3f4f6", color: "#374151" };
      default: return { bg: "#eee", color: "#333" };
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading-spinner" />
        Fetching orders...
      </div>
    );
  }

  return (
    <div className="admin-page">
      <AdminNavbar />
      <div className="admin-container">
        <header className="admin-header">
          <h1 className="admin-title">Orders</h1>
          <p className="admin-subtitle">Manage incoming orders and table service</p>
        </header>

        {orders.length === 0 && (
          <div className="admin-empty">No orders found yet.</div>
        )}

        <div className="admin-orders-grid">
          {orders.map((order) => {
            const statusStyle = getStatusClass(order.status);
            return (
              <div key={order._id} className="admin-order-card">
                <div className="admin-order-header">
                  <div>
                    <span className="admin-order-table-label">TABLE</span>
                    <span className="admin-order-table-num">{order.table}</span>
                  </div>
                  <span
                    className="admin-order-status"
                    style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="admin-order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="admin-order-item-row">
                      <span className="admin-order-item-name">
                        {item.name} <small className="admin-order-item-qty">x{item.quantity}</small>
                      </span>
                      <span className="admin-order-item-price">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="admin-order-footer">
                  <div className="admin-order-total-wrap">
                    <span className="admin-order-total-label">Total Amount</span>
                    <span className="admin-order-total-value">₹{order.totalAmount}</span>
                  </div>
                  <div className="admin-order-actions">
                    {order.status === "Pending" && (
                      <button type="button" onClick={() => updateStatus(order._id, "Cooking")} className="admin-btn admin-btn-primary">
                        Start Cooking
                      </button>
                    )}
                    {order.status === "Cooking" && (
                      <button type="button" onClick={() => updateStatus(order._id, "Served")} className="admin-btn admin-btn-success">
                        Mark Served
                      </button>
                    )}
                    {order.status === "Served" && (
                      <button type="button" onClick={() => updateStatus(order._id, "Paid")} className="admin-btn admin-btn-ghost">
                        Complete & Paid
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
