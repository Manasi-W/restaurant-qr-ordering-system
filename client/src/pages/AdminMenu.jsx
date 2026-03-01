import { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/Admin.css";

function AdminMenu() {
  const [menu, setMenu] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "General",
    description: "",
    image: null
  });
  const [editingId, setEditingId] = useState(null);

  const fetchMenu = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/menu", { withCredentials: true });
      setMenu(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("description", formData.description);
    if (formData.image) data.append("image", formData.image);

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/menu/${editingId}`, data, { withCredentials: true });
        alert("Item updated!");
      } else {
        await axios.post("http://localhost:5000/api/menu", data, { withCredentials: true });
        alert("Item added!");
      }
      setFormData({ name: "", price: "", category: "General", description: "", image: null });
      setEditingId(null);
      fetchMenu();
    } catch (err) {
      console.error("Save Menu Item Error:", err);
      const msg = err.response?.data?.message || err.response?.data?.error || "Error saving item";
      alert(msg);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      name: item.name,
      price: item.price,
      category: item.category || "General",
      description: item.description || "",
      image: null
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/menu/${id}`, { withCredentials: true });
      fetchMenu();
    } catch (err) {
      alert("Error deleting item");
    }
  };

  return (
    <div className="admin-page">
      <AdminNavbar />
      <div className="admin-container" style={{ maxWidth: "1100px" }}>
        <h1 className="admin-title" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          {editingId ? "Edit Menu Item" : "Add New Dish"}
        </h1>

        <form onSubmit={handleSubmit} className="admin-card" style={{ marginBottom: "2.5rem" }}>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <input
                name="name"
                placeholder="Dish Name (e.g. Margherita Pizza)"
                value={formData.name}
                onChange={handleChange}
                required
                className="admin-input"
              />
            </div>
            <div className="admin-form-group">
              <input
                name="price"
                placeholder="Price (₹)"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                className="admin-input"
              />
            </div>
          </div>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <select name="category" value={formData.category} onChange={handleChange} className="admin-input admin-select">
                <option value="General">General</option>
                <option value="Starters">Starters</option>
                <option value="Main Course">Main Course</option>
                <option value="Beverages">Beverages</option>
                <option value="Desserts">Desserts</option>
              </select>
            </div>
            <div className="admin-form-group">
              <input name="image" type="file" onChange={handleChange} className="admin-input" accept="image/*" />
            </div>
          </div>
          <div className="admin-form-group">
            <textarea
              name="description"
              placeholder="Short description of the dish..."
              value={formData.description}
              onChange={handleChange}
              className="admin-textarea"
            />
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button type="submit" className="admin-btn admin-btn-primary" style={{ flex: 2 }}>
              {editingId ? "Update Item" : "Add to Menu"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ name: "", price: "", category: "General", description: "", image: null });
                }}
                className="admin-btn admin-btn-danger"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <h2 className="admin-card-title" style={{ marginBottom: "1.25rem" }}>Current Menu</h2>
        {menu.length === 0 ? (
          <div className="admin-empty" style={{ padding: "3rem", background: "white", borderRadius: "1rem", border: "1px dashed #ccc" }}>
            <p style={{ fontSize: "1.1rem", color: "#666" }}>Your menu is currently empty.</p>
            <p style={{ fontSize: "0.9rem", color: "#999", marginTop: "0.5rem" }}>Use the form above to add your first dish and it will appear here.</p>
          </div>
        ) : (
          <div className="admin-menu-grid">
            {menu.map((item) => (
              <div key={item._id} className="admin-menu-card">
                {item.imageUrl && (
                  <img src={`http://localhost:5000${item.imageUrl}`} alt={item.name} className="admin-menu-card-image" />
                )}
                <div className="admin-menu-card-body">
                  <div className="admin-menu-card-header">
                    <h3 className="admin-menu-card-name">{item.name}</h3>
                    <span className="admin-menu-card-price">₹{item.price}</span>
                  </div>
                  <span className="admin-menu-card-category">{item.category}</span>
                  <p className="admin-menu-card-desc">{item.description}</p>
                  <div className="admin-menu-card-actions">
                    <button type="button" onClick={() => handleEdit(item)} className="admin-btn admin-btn-ghost">Edit</button>
                    <button type="button" onClick={() => handleDelete(item._id)} className="admin-btn admin-btn-danger">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminMenu;
