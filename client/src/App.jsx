import Landing from "./pages/Landing";
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import AdminMenu from "./pages/AdminMenu";
import AdminOrders from "./pages/AdminOrders";
import AdminTables from "./pages/AdminTables";
import AdminProfile from "./pages/AdminProfile";
import PublicMenu from "./pages/PublicMenu";
import Checkout from "./pages/Checkout";

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
      <Route path="/portal/:restaurant/:table" element={<PublicMenu />} />
      <Route path="/checkout/:restaurant/:table" element={<Checkout />} />
    </Routes>
  );
}

export default App;