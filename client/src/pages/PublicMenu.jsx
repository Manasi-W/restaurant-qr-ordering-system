import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Public.css";

function PublicMenu() {
  const { restaurant: restaurantURL, table: tableId } = useParams();
  const navigate = useNavigate();

  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState({});
  const [themeColors, setThemeColors] = useState(null);
  const [userLogoUrl, setUserLogoUrl] = useState(null);
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
          >
            {cat}
          </button>
        ))}
      </div>

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
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="public-cart-bar">
          <div className="public-cart-info">
            <span className="public-cart-count">{cart.length} items</span>
            <span className="public-cart-total">Total: ₹{total}</span>
          </div>
          <button type="button" onClick={() => navigate(`/checkout/${restaurantURL}/${tableId}`)} className="public-checkout-btn">
            View Cart & Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default PublicMenu;
