import { Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import AdminMenu from "./pages/AdminMenu";
import AdminOrders from "./pages/AdminOrders";
import PublicMenu from "./pages/PublicMenu";

function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/menu" element={<AdminMenu />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="/portal/:restaurant/:table" element={<PublicMenu />} />
    </Routes>
  );
}

export default App;