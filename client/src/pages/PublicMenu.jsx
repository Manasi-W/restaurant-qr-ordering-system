import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function PublicMenu() {
  const { restaurant, table } = useParams();

  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/portal/${restaurant}/${table}`
        );
        setMenu(res.data.menu);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    fetchMenu();
  }, [restaurant, table]);

  const addToCart = (item) => {
    const existing = cart.find((i) => i._id === item._id);

    if (existing) {
      setCart(
        cart.map((i) =>
          i._id === item._id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const placeOrder = async () => {
    try {
      const formattedItems = cart.map((item) => ({
        menuItem: item._id,
        quantity: item.quantity,
      }));

      await axios.post("http://localhost:5000/api/orders", {
        restaurant,
        table,
        items: formattedItems,
      });

      alert("Order Placed Successfully ✅");
      setCart([]);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container">
      <h1>
        {restaurant} — Table {table}
      </h1>

      <h2>Menu</h2>

      <div style={{ display: "grid", gap: "15px" }}>
        {menu.map((item) => (
          <div key={item._id} className="card">
            <h3>{item.name}</h3>
            <p style={{ color: "#6b7280" }}>{item.description}</p>
            <strong>₹{item.price}</strong>

            <button
              style={{ marginTop: "10px" }}
              onClick={() => addToCart(item)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <hr style={{ margin: "40px 0" }} />

      <h2>Cart</h2>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map((item) => (
        <div key={item._id} className="card">
          {item.name} — ₹{item.price} × {item.quantity}
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <h3>Total: ₹{total}</h3>
          <button
            style={{ marginTop: "15px", width: "100%" }}
            onClick={placeOrder}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default PublicMenu;