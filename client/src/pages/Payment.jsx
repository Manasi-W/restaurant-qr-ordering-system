import { useState } from "react";
import api from "../api/axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../styles/Public.css";

function Payment() {
  const { restaurant: restaurantURL, table: tableId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { paymentIntentId, orderIds = [], amount = 0 } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if no payment data
  if (!paymentIntentId || !orderIds?.length) {
    navigate(`/checkout/${restaurantURL}/${tableId}`);
    return null;
  }

  const amountInRupees = amount / 100; // Back from paise

  const handleCompletePayment = async () => {
    setLoading(true);
    setError("");
    try {
      await api.post(
        "/api/payments/verify",
        { paymentIntentId, orderIds }
      );
      navigate(`/payment-success/${restaurantURL}/${tableId}`, {
        state: { amount: amountInRupees, orderIds },
      });
    } catch (err) {
      console.error("Payment verify error:", err);
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="public-page">
      <div className="public-checkout-container">
        <header className="admin-header" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h1 className="admin-title">Complete Payment</h1>
          <p className="admin-subtitle">Table {tableId} • {restaurantURL}</p>
        </header>

        <div className="public-order-card" style={{ marginBottom: "1.5rem" }}>
          <div className="public-order-row">
            <span>Amount to pay</span>
            <span style={{ fontWeight: 700, fontSize: "1.25rem" }}>₹{amountInRupees}</span>
          </div>
          <p className="public-empty-sub" style={{ marginTop: "0.75rem", color: "var(--text-muted)" }}>
            In production, Stripe would show a secure card form here. For demo, click below to confirm payment.
          </p>
        </div>

        {error && (
          <p style={{ color: "#dc2626", marginBottom: "1rem", textAlign: "center" }}>{error}</p>
        )}

        <button
          type="button"
          className="public-pay-btn"
          onClick={handleCompletePayment}
          disabled={loading}
        >
          {loading ? "Processing…" : "Confirm Payment ₹" + amountInRupees}
        </button>

        <button
          type="button"
          className="public-back-btn"
          style={{ display: "block", margin: "1rem auto 0" }}
          onClick={() => navigate(`/checkout/${restaurantURL}/${tableId}`)}
        >
          ← Back to Checkout
        </button>
      </div>
    </div>
  );
}

export default Payment;
