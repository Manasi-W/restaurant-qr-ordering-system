import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../styles/Public.css";

function PaymentSuccess() {
  const { restaurant: restaurantURL, table: tableId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { amount = 0 } = location.state || {};

  return (
    <div className="public-page">
      <div className="public-checkout-container">
        <div className="public-order-card" style={{ textAlign: "center", padding: "2rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✓</div>
          <h1 className="admin-title">Payment Successful!</h1>
          <p className="admin-subtitle" style={{ marginBottom: "1.5rem" }}>
            Thank you for your payment.
          </p>
          {amount > 0 && (
            <p style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)" }}>
              ₹{amount} paid successfully
            </p>
          )}
          <p className="public-empty-sub" style={{ marginTop: "1rem" }}>
            Your orders have been marked as paid.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            type="button"
            className="public-pay-btn"
            onClick={() => navigate(`/portal/${restaurantURL}/${tableId}`)}
          >
            Back to Menu
          </button>
          <button
            type="button"
            className="public-back-btn"
            onClick={() => navigate(`/checkout/${restaurantURL}/${tableId}`)}
          >
            View Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
