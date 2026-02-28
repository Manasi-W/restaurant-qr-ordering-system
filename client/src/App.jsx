import Landing from "./pages/Landing";
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import AdminMenu from "./pages/AdminMenu";
import AdminOrders from "./pages/AdminOrders";
import AdminTables from "./pages/AdminTables";
import AdminProfile from "./pages/AdminProfile";
import AdminSettings from "./pages/AdminSettings";
import PublicMenu from "./pages/PublicMenu";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import Receipt from "./pages/Receipt";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/menu" element={<AdminMenu />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="/admin/tables" element={<AdminTables />} />
      <Route path="/admin/profile" element={<AdminProfile />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
      <Route path="/portal/:restaurant/:table" element={<PublicMenu />} />
      <Route path="/checkout/:restaurant/:table" element={<Checkout />} />
      <Route path="/payment/:restaurant/:table" element={<Payment />} />
      <Route path="/payment-success/:restaurant/:table" element={<PaymentSuccess />} />
      <Route path="/receipt/:restaurant/:table" element={<Receipt />} />
    </Routes>
  );
}

export default App;