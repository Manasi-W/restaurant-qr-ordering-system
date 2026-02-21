import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

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
    // Poll for new orders every 30 seconds
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

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending": return { bg: "#fef3c7", text: "#92400e" };
      case "Cooking": return { bg: "#dbeafe", text: "#1e40af" };
      case "Served": return { bg: "#d1fae5", text: "#065f46" };
      case "Paid": return { bg: "#f3f4f6", text: "#374151" };
      default: return { bg: "#eee", text: "#333" };
    }
  };

  if (loading) return <div style={styles.loading}>Fetching live orders...</div>;

  return (
    <div style={styles.page}>
      <AdminNavbar />
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Live Orders</h1>
          <p style={styles.subtitle}>Manage incoming orders and table service</p>
        </header>

        {orders.length === 0 && <div style={styles.emptyState}>No orders found yet.</div>}

        <div style={styles.orderGrid}>
          {orders.map((order) => {
            const statusStyle = getStatusStyle(order.status);
            return (
              <div key={order._id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <div style={styles.tableInfo}>
                    <span style={styles.tableLabel}>TABLE</span>
                    <span style={styles.tableNum}>{order.table}</span>
                  </div>
                  <div style={{ ...styles.statusBadge, backgroundColor: statusStyle.bg, color: statusStyle.text }}>
                    {order.status}
                  </div>
                </div>

                <div style={styles.itemsList}>
                  {order.items.map((item, index) => (
                    <div key={index} style={styles.itemRow}>
                      <span style={styles.itemName}>{item.name} <small style={styles.qty}>x{item.quantity}</small></span>
                      <span style={styles.itemPrice}>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div style={styles.cardFooter}>
                  <div style={styles.totalSection}>
                    <span style={styles.totalLabel}>Total Amount</span>
                    <span style={styles.totalValue}>₹{order.totalAmount}</span>
                  </div>

                  <div style={styles.actionGrid}>
                    {order.status === "Pending" && (
                      <button onClick={() => updateStatus(order._id, "Cooking")} style={styles.cookBtn}>Start Cooking</button>
                    )}
                    {order.status === "Cooking" && (
                      <button onClick={() => updateStatus(order._id, "Served")} style={styles.serveBtn}>Mark Served</button>
                    )}
                    {order.status === "Served" && (
                      <button onClick={() => updateStatus(order._id, "Paid")} style={styles.paidBtn}>Complete & Paid</button>
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

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "'Outfit', sans-serif"
  },
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "40px"
  },
  header: {
    marginBottom: "40px"
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "800",
    color: "#0f172a",
    margin: 0
  },
  subtitle: {
    color: "#64748b",
    fontSize: "1.1rem"
  },
  orderGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "25px"
  },
  card: {
    background: "white",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    display: "flex",
    flexDirection: "column",
    border: "1px solid #f1f5f9"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "20px"
  },
  tableInfo: {
    display: "flex",
    flexDirection: "column"
  },
  tableLabel: {
    fontSize: "0.7rem",
    fontWeight: "700",
    color: "#94a3b8",
    letterSpacing: "0.05em"
  },
  tableNum: {
    fontSize: "1.5rem",
    fontWeight: "800",
    color: "#1e293b"
  },
  statusBadge: {
    padding: "6px 12px",
    borderRadius: "8px",
    fontSize: "0.85rem",
    fontWeight: "700"
  },
  itemsList: {
    flex: 1,
    borderTop: "1px solid #f1f5f9",
    paddingTop: "15px",
    marginBottom: "20px"
  },
  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    fontSize: "0.95rem"
  },
  itemName: {
    color: "#334155",
    fontWeight: "500"
  },
  qty: {
    color: "#94a3b8",
    marginLeft: "5px"
  },
  itemPrice: {
    fontWeight: "600",
    color: "#1e293b"
  },
  cardFooter: {
    borderTop: "1px solid #f1f5f9",
    paddingTop: "15px"
  },
  totalSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },
  totalLabel: {
    fontSize: "0.9rem",
    color: "#64748b",
    fontWeight: "600"
  },
  totalValue: {
    fontSize: "1.25rem",
    fontWeight: "800",
    color: "#059669"
  },
  actionGrid: {
    display: "flex",
    gap: "10px"
  },
  cookBtn: {
    flex: 1,
    padding: "12px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "700",
    cursor: "pointer"
  },
  serveBtn: {
    flex: 1,
    padding: "12px",
    background: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "700",
    cursor: "pointer"
  },
  paidBtn: {
    flex: 1,
    padding: "12px",
    background: "#0f172a",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "700",
    cursor: "pointer"
  },
  loading: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#64748b"
  },
  emptyState: {
    textAlign: "center",
    padding: "60px",
    background: "white",
    borderRadius: "20px",
    color: "#94a3b8"
  }
};

export default AdminOrders;