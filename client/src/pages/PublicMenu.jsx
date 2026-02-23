import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
<<<<<<< HEAD
import "../styles/Public.css";
=======
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6

function PublicMenu() {
  const { restaurant: restaurantURL, table: tableId } = useParams();
  const navigate = useNavigate();

  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState({});
<<<<<<< HEAD
  const [themeColors, setThemeColors] = useState(null);
  const [userLogoUrl, setUserLogoUrl] = useState(null);
=======
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem(`cart_${restaurantURL}_${tableId}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/portal/${restaurantURL}/${tableId}`);
        setMenu(res.data.menu);
        setFilteredMenu(res.data.menu);
        setRestaurantInfo({
          name: res.data.restaurant,
          address: res.data.address,
          phone: res.data.phone
        });
<<<<<<< HEAD
        
        // Apply theme colors
        if (res.data.themeColors) {
          setThemeColors(res.data.themeColors);
          document.documentElement.style.setProperty("--primary", res.data.themeColors.primary);
          document.documentElement.style.setProperty("--secondary", res.data.themeColors.secondary);
          document.documentElement.style.setProperty("--accent", res.data.themeColors.accent);
        }
        
        if (res.data.userLogoUrl) {
          setUserLogoUrl(`http://localhost:5000${res.data.userLogoUrl}`);
        }
=======
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
      } catch (err) {
        console.error("Error fetching menu", err);
      }
    };
    fetchMenu();
  }, [restaurantURL, tableId]);

  useEffect(() => {
    localStorage.setItem(`cart_${restaurantURL}_${tableId}`, JSON.stringify(cart));
  }, [cart, restaurantURL, tableId]);

  useEffect(() => {
    let result = menu;
    if (category !== "All") {
      result = result.filter(item => item.category === category);
    }
    if (search) {
      result = result.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    setFilteredMenu(result);
  }, [search, category, menu]);

  const categories = ["All", ...new Set(menu.map(item => item.category))];

  const addToCart = (item) => {
    const existing = cart.find((i) => i._id === item._id);
    if (existing) {
      setCart(cart.map((i) => i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

<<<<<<< HEAD
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="public-page">
      <header className="public-header">
        {userLogoUrl && (
          <img src={userLogoUrl} alt={restaurantInfo.name} style={{ maxHeight: "60px", marginBottom: "1rem", objectFit: "contain" }} />
        )}
        <div className="public-header-row">
          <h1 className="public-restaurant-name">{restaurantInfo.name}</h1>
          <span className="public-table-badge">Table {tableId}</span>
        </div>
        <p className="public-header-sub">{restaurantInfo.address}</p>
      </header>

      <div className="public-search-wrap">
        <input
          className="public-search-input"
          placeholder="Search for dishes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="public-categories">
        {categories.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={"public-category-btn" + (category === cat ? " active" : "")}
=======
  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item._id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return newQty === 0 ? null : { ...item, quantity: newQty };
      }
      return item;
    }).filter(Boolean));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.restaurantHeader}>
          <h1 style={styles.restaurantName}>{restaurantInfo.name}</h1>
          <p style={styles.tableBadge}>Table {tableId}</p>
        </div>
        <p style={styles.restaurantAddress}>{restaurantInfo.address}</p>
      </header>

      <div style={styles.searchContainer}>
        <input
          placeholder="Search for dishes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <div style={styles.categoryContainer}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              ...styles.categoryBtn,
              background: category === cat ? "#4f46e5" : "white",
              color: category === cat ? "white" : "#64748b",
              boxShadow: category === cat ? "0 4px 12px rgba(79, 70, 229, 0.3)" : "none"
            }}
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
          >
            {cat}
          </button>
        ))}
      </div>

<<<<<<< HEAD
      <div className="public-menu-grid">
        {menu.length === 0 ? (
          <div className="public-empty-box">
            <p className="public-empty-title">No available dishes found for this restaurant.</p>
            <p className="public-empty-sub">Please check back later or contact the restaurant.</p>
          </div>
        ) : filteredMenu.length === 0 ? (
          <div className="public-empty-box">
            <p className="public-empty-title">No dishes match your search.</p>
          </div>
        ) : (
          filteredMenu.map((item) => (
            <div key={item._id} className="public-item-card">
              {item.imageUrl && (
                <img src={`http://localhost:5000${item.imageUrl}`} alt={item.name} className="public-item-image" />
              )}
              <div className="public-item-body">
                <div className="public-item-header">
                  <h3 className="public-item-name">{item.name}</h3>
                  <span className="public-item-price">₹{item.price}</span>
                </div>
                <p className="public-item-desc">{item.description}</p>
                <button type="button" onClick={() => addToCart(item)} className="public-add-btn">
=======
      <div style={styles.menuGrid}>
        {menu.length === 0 ? (
          <div style={styles.emptyContainer}>
            <p style={styles.emptyText}>No available dishes found for this restaurant.</p>
            <p style={styles.emptySub}>Please check back later or contact the restaurant.</p>
          </div>
        ) : filteredMenu.length === 0 ? (
          <div style={styles.emptyContainer}>
            <p style={styles.emptyText}>No dishes match your search.</p>
          </div>
        ) : (
          filteredMenu.map((item) => (
            <div key={item._id} style={styles.itemCard}>
              {item.imageUrl && (
                <img src={`http://localhost:5000${item.imageUrl}`} alt={item.name} style={styles.itemImage} />
              )}
              <div style={styles.itemContent}>
                <div style={styles.itemHeader}>
                  <h3 style={styles.itemName}>{item.name}</h3>
                  <span style={styles.itemPrice}>₹{item.price}</span>
                </div>
                <p style={styles.itemDesc}>{item.description}</p>
                <button
                  onClick={() => addToCart(item)}
                  style={{ ...styles.addBtn, background: "#4f46e5", color: "white" }}
                >
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
<<<<<<< HEAD
        <div className="public-cart-bar">
          <div className="public-cart-info">
            <span className="public-cart-count">{cart.length} items</span>
            <span className="public-cart-total">Total: ₹{total}</span>
          </div>
          <button type="button" onClick={() => navigate(`/checkout/${restaurantURL}/${tableId}`)} className="public-checkout-btn">
=======
        <div style={styles.cartDrawer}>
          <div style={styles.cartInfo}>
            <span style={styles.cartCount}>{cart.length} items</span>
            <span style={styles.cartTotal}>Total: ₹{total}</span>
          </div>
          <button onClick={() => navigate(`/checkout/${restaurantURL}/${tableId}`)} style={styles.checkoutBtn}>
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
            View Cart & Checkout
          </button>
        </div>
      )}
    </div>
  );
}

<<<<<<< HEAD
export default PublicMenu;
=======
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "'Outfit', sans-serif",
    paddingBottom: "100px" // space for cart drawer
  },
  header: {
    padding: "30px 20px",
    background: "white",
    textAlign: "center"
  },
  restaurantHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginBottom: "5px"
  },
  restaurantName: {
    margin: 0,
    fontSize: "1.75rem",
    fontWeight: "800",
    color: "#0f172a"
  },
  tableBadge: {
    margin: 0,
    background: "#4f46e5",
    color: "white",
    padding: "4px 12px",
    borderRadius: "100px",
    fontSize: "0.85rem",
    fontWeight: "600"
  },
  restaurantAddress: {
    margin: 0,
    color: "#64748b",
    fontSize: "0.9rem"
  },
  searchContainer: {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto"
  },
  searchInput: {
    width: "100%",
    padding: "14px 20px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    fontSize: "1rem",
    outline: "none",
    boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
  },
  categoryContainer: {
    display: "flex",
    gap: "10px",
    overflowX: "auto",
    padding: "0 20px 20px",
    scrollbarWidth: "none",
    justifyContent: "center"
  },
  categoryBtn: {
    padding: "8px 20px",
    borderRadius: "100px",
    border: "none",
    fontWeight: "600",
    fontSize: "0.9rem",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "all 0.2s"
  },
  menuGrid: {
    padding: "0 20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "25px",
    maxWidth: "1200px",
    margin: "0 auto"
  },
  emptyContainer: {
    gridColumn: "1 / -1",
    textAlign: "center",
    padding: "60px 20px",
    background: "white",
    borderRadius: "20px",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)"
  },
  emptyText: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 10px 0"
  },
  emptySub: {
    color: "#64748b",
    margin: 0
  },
  itemCard: {
    background: "white",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s, box-shadow 0.2s",
    border: "1px solid #f1f5f9"
  },
  itemImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderBottom: "1px solid #f1f5f9"
  },
  itemContent: {
    padding: "20px",
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  itemHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "10px"
  },
  itemName: {
    margin: 0,
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#1e293b"
  },
  itemPrice: {
    fontWeight: "800",
    color: "#059669",
    fontSize: "1.1rem"
  },
  itemDesc: {
    fontSize: "0.85rem",
    color: "#64748b",
    marginBottom: "20px",
    lineHeight: "1.5",
    flex: 1
  },
  addBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#f1f5f9",
    color: "#4f46e5",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  cartDrawer: {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "calc(100% - 40px)",
    maxWidth: "500px",
    background: "#0f172a",
    borderRadius: "20px",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)",
    zIndex: 1000
  },
  cartInfo: {
    color: "white"
  },
  cartCount: {
    display: "block",
    fontSize: "0.8rem",
    opacity: 0.8
  },
  cartTotal: {
    fontSize: "1.25rem",
    fontWeight: "800"
  },
  checkoutBtn: {
    background: "#4f46e5",
    color: "white",
    padding: "12px 24px",
    borderRadius: "12px",
    border: "none",
    fontWeight: "700",
    cursor: "pointer"
  }
};

export default PublicMenu;
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
