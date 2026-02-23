import { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
<<<<<<< HEAD
import "../styles/Admin.css";
=======
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6

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
<<<<<<< HEAD
        alert("Item updated!");
      } else {
        await axios.post("http://localhost:5000/api/menu", data, { withCredentials: true });
        alert("Item added!");
=======
        alert("Item updated! ✨");
      } else {
        await axios.post("http://localhost:5000/api/menu", data, { withCredentials: true });
        alert("Item added! 🍕");
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
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
<<<<<<< HEAD
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
=======
    <div style={styles.page}>
      <AdminNavbar />
      <div style={styles.container}>
        <h1 style={styles.title}>{editingId ? "Edit Menu Item" : "Add New Dish"}</h1>

        <form onSubmit={handleSubmit} style={styles.formCard}>
          <div style={styles.inputGroup}>
            <input
              name="name"
              placeholder="Dish Name (e.g. Margherita Pizza)"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              name="price"
              placeholder="Price (₹)"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <select name="category" value={formData.category} onChange={handleChange} style={styles.input}>
              <option value="General">General</option>
              <option value="Starters">Starters</option>
              <option value="Main Course">Main Course</option>
              <option value="Beverages">Beverages</option>
              <option value="Desserts">Desserts</option>
            </select>
            <input
              name="image"
              type="file"
              onChange={handleChange}
              style={styles.input}
              accept="image/*"
            />
          </div>
          <textarea
            name="description"
            placeholder="Short description of the dish..."
            value={formData.description}
            onChange={handleChange}
            style={styles.textarea}
          />
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.submitBtn}>
              {editingId ? "Update Item" : "Add to Menu"}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setFormData({ name: "", price: "", category: "General", description: "", image: null }); }} style={styles.cancelBtn}>
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
                Cancel
              </button>
            )}
          </div>
        </form>

<<<<<<< HEAD
        <h2 className="admin-card-title" style={{ marginBottom: "1.25rem" }}>Current Menu</h2>
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
=======
        <h2 style={styles.subtitle}>Current Menu</h2>
        <div style={styles.grid}>
          {menu.map((item) => (
            <div key={item._id} style={styles.menuCard}>
              {item.imageUrl && (
                <img src={`http://localhost:5000${item.imageUrl}`} alt={item.name} style={styles.cardImage} />
              )}
              <div style={styles.cardContent}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardName}>{item.name}</h3>
                  <span style={styles.cardPrice}>₹{item.price}</span>
                </div>
                <p style={styles.cardCategory}>{item.category}</p>
                <p style={styles.cardDesc}>{item.description}</p>
                <div style={styles.cardActions}>
                  <button onClick={() => handleEdit(item)} style={styles.editBtn}>Edit</button>
                  <button onClick={() => handleDelete(item._id)} style={styles.deleteBtn}>Delete</button>
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD
=======
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "'Outfit', sans-serif"
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "40px 20px"
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: "30px",
    textAlign: "center"
  },
  formCard: {
    background: "white",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    marginBottom: "50px"
  },
  inputGroup: {
    display: "flex",
    gap: "15px",
    marginBottom: "15px"
  },
  input: {
    flex: 1,
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.2s"
  },
  textarea: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "1rem",
    minHeight: "100px",
    marginBottom: "15px",
    outline: "none",
    resize: "vertical"
  },
  buttonGroup: {
    display: "flex",
    gap: "10px"
  },
  submitBtn: {
    flex: 2,
    background: "#4f46e5",
    color: "white",
    padding: "14px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s"
  },
  cancelBtn: {
    flex: 1,
    background: "#ef4444",
    color: "white",
    padding: "14px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer"
  },
  subtitle: {
    fontSize: "1.8rem",
    color: "#334155",
    marginBottom: "25px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "25px"
  },
  menuCard: {
    background: "white",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s"
  },
  cardImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover"
  },
  cardContent: {
    padding: "20px"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px"
  },
  cardName: {
    margin: 0,
    fontSize: "1.25rem",
    color: "#1e293b"
  },
  cardPrice: {
    fontWeight: "700",
    color: "#059669",
    fontSize: "1.1rem"
  },
  cardCategory: {
    fontSize: "0.85rem",
    color: "#64748b",
    background: "#f1f5f9",
    padding: "4px 10px",
    borderRadius: "100px",
    display: "inline-block",
    marginBottom: "10px"
  },
  cardDesc: {
    fontSize: "0.9rem",
    color: "#475569",
    marginBottom: "20px",
    lineHeight: "1.5"
  },
  cardActions: {
    display: "flex",
    gap: "10px"
  },
  editBtn: {
    flex: 1,
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #e2e8f0",
    background: "white",
    color: "#4f46e5",
    cursor: "pointer",
    fontWeight: "600"
  },
  deleteBtn: {
    flex: 1,
    padding: "8px",
    borderRadius: "6px",
    border: "none",
    background: "#fee2e2",
    color: "#dc2626",
    cursor: "pointer",
    fontWeight: "600"
  }
};

>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
export default AdminMenu;
