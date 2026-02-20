import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    todayOrders: 0,
    monthlyOrders: 0,
  });

  const [tables, setTables] = useState("");
  const [qrCodes, setQrCodes] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDashboard();
  }, [token]);

  const handleCreateTables = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/tables",
        { tables: Number(tables) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQrCodes(res.data.qrCodes);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      <h3>Total Orders: {stats.totalOrders}</h3>
      <h3>Today's Orders: {stats.todayOrders}</h3>
      <h3>Monthly Orders: {stats.monthlyOrders}</h3>

      <hr />

      <h2>Create Tables</h2>

      <input
        type="number"
        placeholder="Number of tables"
        value={tables}
        onChange={(e) => setTables(e.target.value)}
      />

      <button onClick={handleCreateTables}>
        Generate QR Codes
      </button>

      <hr />

      <h2>QR Codes</h2>

      {qrCodes.map((item) => (
        <div key={item.table} style={{ marginBottom: "20px" }}>
          <h4>Table {item.table}</h4>
          <img src={item.qr} alt="QR Code" width="200" />
          <p>{item.url}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;