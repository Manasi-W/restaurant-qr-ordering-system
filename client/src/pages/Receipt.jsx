import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/Receipt.css";

function Receipt() {
    const { restaurant: restaurantURL, table: tableId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { amount = 0, orderIds = [] } = location.state || {};

    const [orders, setOrders] = useState([]);
    const [restaurantInfo, setRestaurantInfo] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch restaurant info for theme and branding
                const resSettings = await axios.get(`http://localhost:5000/portal/${restaurantURL}/${tableId}`);
                setRestaurantInfo(resSettings.data);

                // Apply theme colors
                if (resSettings.data.themeColors) {
                    document.documentElement.style.setProperty("--primary", resSettings.data.themeColors.primary);
                    document.documentElement.style.setProperty("--secondary", resSettings.data.themeColors.secondary);
                    document.documentElement.style.setProperty("--accent", resSettings.data.themeColors.accent);
                }

                // Search for the orders if they were passed
                if (orderIds.length > 0) {
                    const resOrders = await axios.get(`http://localhost:5000/api/orders/active/${restaurantURL}/${tableId}`);
                    // Filter only orders that were just paid (if possible) - or just show all active/recent
                    setOrders(resOrders.data.filter(o => orderIds.includes(o._id)));
                }
            } catch (err) {
                console.error("Error fetching receipt data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [restaurantURL, tableId, orderIds]);

    if (loading) return <div className="receipt-page"><div className="spinner"></div></div>;

    const allItems = orders.flatMap(o => o.items);
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="receipt-page">
            <div className="receipt-container">
                <header className="receipt-header">
                    <div className="receipt-logo">{restaurantInfo.restaurant}</div>
                    <div className="receipt-info">{restaurantInfo.address}</div>
                    <div className="receipt-title">RECEIPT</div>
                </header>

                <div className="receipt-info">
                    <span>DATE: {date}</span>
                    <span>TIME: {time}</span>
                </div>
                <div className="receipt-info">
                    <span>TABLE: {tableId}</span>
                    <span>REF: #{orderIds[0]?.slice(-6).toUpperCase() || 'N/A'}</span>
                </div>

                <div className="receipt-divider"></div>

                <div className="receipt-items">
                    {allItems.map((item, idx) => (
                        <div key={idx} className="receipt-item-row">
                            <div className="receipt-item-name">
                                <span className="receipt-item-qty">{item.quantity}x</span>
                                {item.name}
                            </div>
                            <div className="receipt-item-price">₹{item.price * item.quantity}</div>
                        </div>
                    ))}
                </div>

                <div className="receipt-totals">
                    <div className="receipt-total-row">
                        <span>TOTAL AMOUNT</span>
                        <span>₹{amount || allItems.reduce((s, i) => s + i.price * i.quantity, 0)}</span>
                    </div>
                    <div className="receipt-info" style={{ marginTop: '0.5rem' }}>
                        <span>PAYMENT STATUS</span>
                        <span style={{ fontWeight: 700, color: 'var(--primary)' }}>PAID</span>
                    </div>
                </div>

                <footer className="receipt-footer">
                    <div className="receipt-thanks">THANK YOU</div>
                    <div className="receipt-barcode"></div>
                    <div style={{ fontSize: '0.65rem', color: '#aaa' }}>designed by antigravity</div>
                </footer>

                <div className="receipt-actions">
                    <button onClick={() => window.print()} className="receipt-print-btn">Print Receipt</button>
                    <button onClick={() => navigate(`/portal/${restaurantURL}/${tableId}`)} className="admin-btn admin-btn-ghost">Close</button>
                </div>
            </div>
        </div>
    );
}

export default Receipt;
