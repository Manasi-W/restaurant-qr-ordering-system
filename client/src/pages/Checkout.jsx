import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
<<<<<<< HEAD
import "../styles/Public.css";

function Checkout() {
  const { restaurant: restaurantURL, table: tableId } = useParams();
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem(`cart_${restaurantURL}_${tableId}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [activeOrders, setActiveOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActiveOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/active/${restaurantURL}/${tableId}`);
      setActiveOrders(res.data);
    } catch (err) {
      console.error("Error fetching active orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveOrders();
  }, [restaurantURL, tableId]);

  const totalCart = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalActive = activeOrders.reduce((sum, order) => sum + order.totalAmount, 0);

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;
    try {
      await axios.post("http://localhost:5000/api/orders", {
        restaurant: restaurantURL,
        table: tableId,
        items: cart,
        totalAmount: totalCart
      });
      alert("Order placed!");
      localStorage.removeItem(`cart_${restaurantURL}_${tableId}`);
      setCart([]);
      fetchActiveOrders();
    } catch (err) {
      alert("Error placing order");
    }
  };

  return (
    <div className="public-page">
      <div className="public-checkout-container">
        <header className="admin-header" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <button type="button" onClick={() => navigate(-1)} className="public-back-btn">
            ← Back to Menu
          </button>
          <h1 className="admin-title">Your Table&apos;s Bill</h1>
          <p className="admin-subtitle">Table {tableId} • {restaurantURL}</p>
        </header>

        {cart.length > 0 && (
          <section style={{ marginBottom: "1.5rem" }}>
            <h2 className="public-section-title">New Order (In Cart)</h2>
            <div className="public-order-card">
              {cart.map((item) => (
                <div key={item._id} className="public-order-row">
                  <span>{item.name} x {item.quantity}</span>
                  <span style={{ fontWeight: 600 }}>₹{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="public-order-total-row">
                <span>Subtotal</span>
                <span>₹{totalCart}</span>
              </div>
              <button type="button" onClick={handlePlaceOrder} className="public-place-btn">
                Confirm & Send to Kitchen
              </button>
            </div>
          </section>
        )}

        <section style={{ marginBottom: "1.5rem" }}>
          <h2 className="public-section-title">Previous Orders (Current Visit)</h2>
          <div className="public-order-card">
            {activeOrders.length === 0 ? (
              <p className="public-empty-sub" style={{ textAlign: "center", padding: "1rem" }}>
                No orders placed yet in this session.
              </p>
            ) : (
              activeOrders.map((order, idx) => (
                <div
                  key={order._id}
                  className="public-order-block"
                  style={{ borderBottom: idx === activeOrders.length - 1 ? "none" : "1px dashed var(--gray-200)" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span className="public-order-id">Order #{order._id.slice(-4)}</span>
                    <span
                      className="public-status-badge"
                      style={{
                        background: order.status === "Served" ? "#dcfce7" : "#fef9c3",
                        color: order.status === "Served" ? "#166534" : "#854d0e"
                      }}
                    >
                      {order.status}
                    </span>
                  </div>
                  {order.items.map((item, i) => (
                    <div key={i} className="public-order-mini-row">
                      <span>{item.name} x {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              ))
            )}
            <div className="public-grand-total-row">
              <span>Grand Total</span>
              <span>₹{totalActive}</span>
            </div>
          </div>
        </section>

        {activeOrders.length > 0 && (
          <button 
            type="button" 
            className="public-pay-btn" 
            onClick={async () => {
              try {
                // Create payment intent
                const res = await axios.post("http://localhost:5000/api/payments/create-intent", {
                  amount: totalActive * 100, // Convert to paise
                  restaurant: restaurantURL,
                  table: tableId,
                  orders: activeOrders.map(o => o._id)
                }, { withCredentials: true });
                
                // Redirect to payment page or open Stripe Checkout
                if (res.data.clientSecret) {
                  // For Stripe, redirect to payment page with Stripe Elements
                  navigate("/payment/" + restaurantURL + "/" + tableId, {
                    state: {
                      paymentIntentId: res.data.paymentIntentId,
                      orderIds: activeOrders.map(o => o._id),
                      amount: totalActive * 100,
                    },
                  });
                } else if (res.data.paymentUrl) {
                  window.location.href = res.data.paymentUrl;
                } else {
                  // Mock flow: go to payment page to complete
                  navigate("/payment/" + restaurantURL + "/" + tableId, {
                    state: {
                      paymentIntentId: res.data.paymentIntentId,
                      orderIds: activeOrders.map(o => o._id),
                      amount: totalActive * 100,
                    },
                  });
                }
              } catch (err) {
                console.error("Payment error:", err);
                alert("Error initiating payment. Please try again.");
              }
            }}
          >
            Request Final Bill & Pay ₹{totalActive}
          </button>
        )}
      </div>
    </div>
  );
}

=======

function Checkout() {
    const { restaurant: restaurantURL, table: tableId } = useParams();
    const navigate = useNavigate();

    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem(`cart_${restaurantURL}_${tableId}`);
        return saved ? JSON.parse(saved) : [];
    });
    const [activeOrders, setActiveOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchActiveOrders = async () => {
        try {
            // We need an endpoint to fetch active orders for this table
            const res = await axios.get(`http://localhost:5000/api/orders/active/${restaurantURL}/${tableId}`);
            setActiveOrders(res.data);
        } catch (err) {
            console.error("Error fetching active orders", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchActiveOrders();
    }, [restaurantURL, tableId]);

    const totalCart = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalActive = activeOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    const handlePlaceOrder = async () => {
        if (cart.length === 0) return;
        try {
            await axios.post("http://localhost:5000/api/orders", {
                restaurant: restaurantURL,
                table: tableId,
                items: cart,
                totalAmount: totalCart
            });

            alert("Order placed! ♨️");
            localStorage.removeItem(`cart_${restaurantURL}_${tableId}`);
            setCart([]);
            fetchActiveOrders();
        } catch (err) {
            alert("Error placing order");
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <header style={styles.header}>
                    <button onClick={() => navigate(-1)} style={styles.backBtn}>← Back to Menu</button>
                    <h1 style={styles.title}>Your Table's Bill</h1>
                    <p style={styles.subtitle}>Table {tableId} • {restaurantURL}</p>
                </header>

                {cart.length > 0 && (
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>New Order (In Cart)</h2>
                        <div style={styles.card}>
                            {cart.map((item) => (
                                <div key={item._id} style={styles.row}>
                                    <span>{item.name} x {item.quantity}</span>
                                    <span style={styles.price}>₹{item.price * item.quantity}</span>
                                </div>
                            ))}
                            <div style={styles.totalRow}>
                                <span>Subtotal</span>
                                <span>₹{totalCart}</span>
                            </div>
                            <button onClick={handlePlaceOrder} style={styles.placeBtn}>Confirm & Send to Kitchen</button>
                        </div>
                    </div>
                )}

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Previous Orders (Current Visit)</h2>
                    <div style={styles.card}>
                        {activeOrders.length === 0 ? (
                            <p style={styles.emptyText}>No orders placed yet in this session.</p>
                        ) : (
                            activeOrders.map((order, idx) => (
                                <div key={order._id} style={{ ...styles.orderBlock, borderBottom: idx === activeOrders.length - 1 ? "none" : "1px dashed #e2e8f0" }}>
                                    <div style={styles.orderHeader}>
                                        <span style={styles.orderId}>Order #{order._id.slice(-4)}</span>
                                        <span style={{ ...styles.status, background: order.status === "Served" ? "#dcfce7" : "#fef9c3", color: order.status === "Served" ? "#166534" : "#854d0e" }}>
                                            {order.status}
                                        </span>
                                    </div>
                                    {order.items.map((item, i) => (
                                        <div key={i} style={styles.miniRow}>
                                            <span>{item.name} x {item.quantity}</span>
                                            <span>₹{item.price * item.quantity}</span>
                                        </div>
                                    ))}
                                </div>
                            ))
                        )}
                        <div style={styles.grandTotalRow}>
                            <span>Grand Total</span>
                            <span>₹{totalActive}</span>
                        </div>
                    </div>
                </div>

                {activeOrders.length > 0 && (
                    <button style={styles.payBtn} onClick={() => alert("Redirecting to payment gateway...")}>
                        Request Final Bill & Pay ₹{totalActive}
                    </button>
                )}
            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        background: "#f1f5f9",
        fontFamily: "'Outfit', sans-serif",
        padding: "20px"
    },
    container: {
        maxWidth: "600px",
        margin: "0 auto"
    },
    header: {
        marginBottom: "30px",
        textAlign: "center"
    },
    backBtn: {
        background: "none",
        border: "none",
        color: "#6366f1",
        fontWeight: "600",
        cursor: "pointer",
        marginBottom: "10px"
    },
    title: {
        fontSize: "2rem",
        fontWeight: "800",
        margin: "0 0 5px 0"
    },
    subtitle: {
        color: "#64748b",
        margin: 0
    },
    section: {
        marginBottom: "30px"
    },
    sectionTitle: {
        fontSize: "1.1rem",
        fontWeight: "700",
        color: "#475569",
        marginBottom: "15px",
        display: "flex",
        alignItems: "center",
        gap: "10px"
    },
    card: {
        background: "white",
        borderRadius: "20px",
        padding: "25px",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)"
    },
    row: {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom: "1px solid #f1f5f9"
    },
    miniRow: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: "0.9rem",
        color: "#64748b",
        marginBottom: "5px"
    },
    price: {
        fontWeight: "600"
    },
    totalRow: {
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 0",
        fontWeight: "700",
        fontSize: "1.1rem"
    },
    grandTotalRow: {
        display: "flex",
        justifyContent: "space-between",
        paddingTop: "20px",
        marginTop: "10px",
        borderTop: "2px solid #f1f5f9",
        fontWeight: "800",
        fontSize: "1.4rem",
        color: "#0f172a"
    },
    placeBtn: {
        width: "100%",
        padding: "16px",
        borderRadius: "12px",
        border: "none",
        background: "#4f46e5",
        color: "white",
        fontWeight: "700",
        fontSize: "1rem",
        cursor: "pointer",
        marginTop: "10px"
    },
    payBtn: {
        width: "100%",
        padding: "18px",
        borderRadius: "15px",
        border: "none",
        background: "#059669",
        color: "white",
        fontWeight: "800",
        fontSize: "1.1rem",
        cursor: "pointer",
        boxShadow: "0 10px 15px -3px rgba(5, 150, 105, 0.3)"
    },
    orderBlock: {
        paddingBottom: "15px",
        marginBottom: "15px"
    },
    orderHeader: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px"
    },
    orderId: {
        fontSize: "0.85rem",
        fontWeight: "600",
        color: "#94a3b8"
    },
    status: {
        fontSize: "0.75rem",
        padding: "2px 8px",
        borderRadius: "6px",
        fontWeight: "700"
    },
    emptyText: {
        color: "#94a3b8",
        textAlign: "center",
        padding: "10px"
    }
};

>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
export default Checkout;
