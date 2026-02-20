import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="container">
      <h1>All Orders</h1>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((order) => (
        <div key={order._id} className="card">
          <h3>
            Restaurant: {order.restaurant} | Table: {order.table}
          </h3>

          <div style={{ marginTop: "10px" }}>
            {order.items.map((item, index) => (
              <div key={index}>
                {item.name} - ₹{item.price} × {item.quantity}
              </div>
            ))}
          </div>

          <div style={{ marginTop: "10px", fontWeight: "bold" }}>
            Total: ₹{order.totalAmount}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;