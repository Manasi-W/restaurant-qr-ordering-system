import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../styles/Public.css";

function PaymentSuccess() {
  const { restaurant: restaurantURL, table: tableId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { amount = 0, orderIds = [] } = location.state || {};

  return (
    <div className="public-page">
      <div className="public-checkout-container">
        <div className="public-order-card" style={{ textAlign: "center", padding: "2rem" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem", color: "var(--success)" }}>✓</div>
          <h1 className="admin-title" style={{ color: "var(--success)" }}>Payment Successful!</h1>
          <p className="admin-subtitle" style={{ marginBottom: "1.5rem" }}>
            Thank you for your payment.
          </p>
          {amount > 0 && (
            <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-dark)" }}>
              ₹{amount}
            </p>
          )}
          <p className="public-empty-sub" style={{ marginTop: "1rem" }}>
            Your order has been confirmed.
          </p>
        </div>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <button
            type="button"
            className="public-btn-success"
            onClick={() => navigate(`/receipt/${restaurantURL}/${tableId}`, { state: { amount, orderIds } })}
          >
            View Digital Receipt
          </button>
          <button
            type="button"
            className="public-btn-success"
            style={{ background: "var(--bg-secondary)", color: "var(--text-primary)" }}
            onClick={() => navigate(`/portal/${restaurantURL}/${tableId}`)}
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
