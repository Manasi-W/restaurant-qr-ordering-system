import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
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

export default Checkout;
