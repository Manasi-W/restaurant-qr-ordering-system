import { useState, useEffect } from "react";
import api from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Public.css";

function Checkout() {
  const { restaurant: restaurantURL, table: tableId } = useParams();
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(`cart_${restaurantURL}_${tableId}`);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Cart parse error", e);
      return [];
    }
  });
  const [activeOrders, setActiveOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem(`cart_${restaurantURL}_${tableId}`, JSON.stringify(cart));
  }, [cart, restaurantURL, tableId]);

  const addToCart = (item) => {
    const existing = cart.find((i) => i._id === item._id);
    if (existing) {
      setCart(cart.map((i) => i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const existing = cart.find((i) => i._id === itemId);
    if (!existing) return;
    if (existing.quantity > 1) {
      setCart(cart.map((i) => i._id === itemId ? { ...i, quantity: i.quantity - 1 } : i));
    } else {
      setCart(cart.filter((i) => i._id !== itemId));
    }
  };

  const fetchActiveOrders = async () => {
    try {
      const res = await api.get(`/api/orders/active/${restaurantURL}/${tableId}`);
      setActiveOrders(res.data);
    } catch (err) {
      console.error("Error fetching active orders", err);
      setError("Failed to load your orders. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get(`/portal/${restaurantURL}/${tableId}`);
        // Apply theme colors
        if (res.data.themeColors) {
          document.documentElement.style.setProperty("--primary", res.data.themeColors.primary);
          document.documentElement.style.setProperty("--secondary", res.data.themeColors.secondary);
          document.documentElement.style.setProperty("--accent", res.data.themeColors.accent);
        }
      } catch (err) {
        console.error("Error fetching settings", err);
      }
    };
    fetchSettings();
    fetchActiveOrders();
  }, [restaurantURL, tableId]);

  const totalCart = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalActive = activeOrders.reduce((sum, order) => sum + order.totalAmount, 0);

  if (loading) {
    return (
      <div className="public-page public-status-page">
        <div className="public-spinner"></div>
        <p>Fetching your bill details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="public-page public-status-page">
        <div className="public-error-icon">⚠️</div>
        <h3>Something went wrong</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="public-add-btn" style={{ maxWidth: '200px', margin: '1rem auto 0' }}>
          Reload Page
        </button>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;
    try {
      await api.post("/api/orders", {
        restaurant: restaurantURL,
        table: tableId,
        items: cart,
        totalAmount: totalCart
      });
      alert("Order placed successfully!");
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
        <header className="public-header" style={{ marginBottom: "1.5rem" }}>
          <button type="button" onClick={() => navigate(-1)} className="public-back-btn">
            ← Back to Menu
          </button>
          <h1 className="public-restaurant-name">Your Table&apos;s Bill</h1>
          <p className="public-header-sub">Table {tableId} • {restaurantURL}</p>
        </header>

        {cart.length > 0 && (
          <section style={{ marginBottom: "1.5rem" }}>
            <h2 className="public-section-title">New Order (In Cart)</h2>
            <div className="public-order-card">
              {cart.map((item) => (
                <div key={item._id} className="public-order-row" style={{ alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 500 }}>{item.name}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>₹{item.price} each</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div className="public-quantity-controls" style={{ scale: '0.8' }}>
                      <button type="button" onClick={() => removeFromCart(item._id)} className="public-qty-btn minus">-</button>
                      <span className="public-qty-display">{item.quantity}</span>
                      <button type="button" onClick={() => addToCart(item)} className="public-qty-btn plus">+</button>
                    </div>
                    <span style={{ fontWeight: 600, minWidth: '60px', textAlign: 'right' }}>₹{item.price * item.quantity}</span>
                  </div>
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
              (() => {
                const allSubItems = activeOrders.flatMap(o => o.items);
                const groupedSubItems = allSubItems.reduce((acc, item) => {
                  const existing = acc.find(i => i.name === item.name && i.price === item.price);
                  if (existing) {
                    existing.quantity += item.quantity;
                  } else {
                    acc.push({ ...item });
                  }
                  return acc;
                }, []);

                return (
                  <div className="public-order-block" style={{ borderBottom: "none" }}>
                    {groupedSubItems.map((item, i) => (
                      <div key={i} className="public-order-mini-row">
                        <span>{item.name} x {item.quantity}</span>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                );
              })()
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
                const res = await api.post("/api/payments/create-intent", {
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
