import { useEffect, useState } from "react";
import api from "../api/axios";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/Admin.css";
import { TableIcon } from "../components/ThemeIcons";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/api/orders");

      // Grouping orders by table and status/time window
      const rawOrders = res.data;
      const grouped = rawOrders.reduce((acc, order) => {
        const timestamp = new Date(order.updatedAt).toLocaleDateString() + " " + new Date(order.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        // Create a unique key for grouping: table + status + (if Paid, the rounded timestamp)
        const key = `${order.table}_${order.status}_${order.status === "Paid" ? timestamp : "active"}`;

        if (!acc[key]) {
          acc[key] = {
            _id: order._id, // Use the latest ID as reference
            table: order.table,
            status: order.status,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            items: [...order.items],
            totalAmount: order.totalAmount,
            orderIds: [order._id]
          };
        } else {
          acc[key].items.push(...order.items);
          acc[key].totalAmount += order.totalAmount;
          acc[key].orderIds.push(order._id);
          // Keep the latest timestamp for sorting
          if (new Date(order.createdAt) > new Date(acc[key].createdAt)) {
            acc[key].createdAt = order.createdAt;
          }
        }
        return acc;
      }, {});

      setOrders(Object.values(grouped).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
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

  const updateStatus = async (group, status) => {
    try {
      await Promise.all(group.orderIds.map(id =>
        api.put(`/api/orders/${id}/status`, { status })
      ));
      fetchOrders();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending": return "var(--text-medium)";
      case "Cooking": return "var(--primary)";
      case "Served": return "var(--success)";
      case "Paid": return "var(--success)";
      case "Cancelled": return "var(--danger)";
      default: return "var(--text-muted)";
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
          <div className="admin-empty" style={{ padding: "4rem", background: "white", borderRadius: "1.5rem", border: "1px dashed #ccc", textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📋</div>
            <h3 style={{ color: "var(--text-dark)", marginBottom: "0.5rem" }}>No Orders Yet</h3>
            <p style={{ color: "var(--text-muted)", maxWidth: "400px", margin: "0 auto" }}>
              Incoming orders from your customers will appear here in real-time.
              Make sure your tables have QR codes generated!
            </p>
          </div>
        )}

        <div className="admin-orders-grid">
          {orders.map((order) => {
            const statusColor = getStatusClass(order.status);
            return (
              <div key={order._id} className={`admin-order-card-gourmet status-${order.status.toLowerCase()}`}>
                <div className="admin-order-header-gourmet">
                  <div className="admin-order-table-section">
                    <div className="admin-order-table-icon-wrap">
                      <TableIcon size={24} color="var(--primary)" />
                    </div>
                    <div className="admin-order-table-info">
                      <span className="admin-order-label-mini">TABLE</span>
                      <h2 className="admin-order-table-display">{order.table}</h2>
                    </div>
                  </div>
                  <div className={`admin-order-status-pill status-${order.status.toLowerCase()}`}>
                    <span className="status-dot"></span>
                    {order.status}
                  </div>
                </div>

                <div className="admin-order-content-gourmet">
                  <div className="admin-order-items-scroll">
                    {order.items.map((item, index) => (
                      <div key={index} className="admin-order-item-elegant">
                        <div className="admin-order-item-main">
                          <span className="admin-order-item-bullet">•</span>
                          <span className="admin-order-item-name-bold">{item.name}</span>
                          <span className="admin-order-item-qty-tag">x{item.quantity}</span>
                        </div>
                        <span className="admin-order-item-price-fine">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="admin-order-footer-gourmet">
                  <div className="admin-order-divider"></div>
                  <div className="admin-order-summary-row">
                    <div className="admin-order-time-stamp">
                      Ordered at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="admin-order-total-display">
                      <span className="total-label">Subtotal</span>
                      <span className="total-value">₹{order.totalAmount}</span>
                    </div>
                  </div>

                  <div className="admin-order-actions-row">
                    {order.status === "Pending" && (
                      <button type="button" onClick={() => updateStatus(order, "Cooking")} className="admin-btn-action start">
                        Start Preparation
                      </button>
                    )}
                    {order.status === "Cooking" && (
                      <button type="button" onClick={() => updateStatus(order, "Served")} className="admin-btn-action success">
                        Mark as Ready/Served
                      </button>
                    )}
                    {order.status === "Served" && (
                      <button type="button" onClick={() => updateStatus(order, "Paid")} className="admin-btn-action finish">
                        Complete Order
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
