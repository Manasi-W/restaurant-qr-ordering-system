import { useEffect, useState } from "react";
import axios from "axios";

function AdminMenu() {
  const [menu, setMenu] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const token = localStorage.getItem("token");

  const fetchMenu = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/menu",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMenu(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const addMenuItem = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/menu",
        { name, description, price },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setName("");
      setDescription("");
      setPrice("");

      fetchMenu();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/menu/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchMenu();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Menu Management</h1>

      <form onSubmit={addMenuItem}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br /><br />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Add Item</button>
      </form>

      <hr />

      <h2>Menu Items</h2>

      {menu.map((item) => (
        <div key={item._id} style={{ marginBottom: "10px" }}>
          <strong>{item.name}</strong> - ₹{item.price}
          <br />
          {item.description}
          <br />
          <button onClick={() => deleteItem(item._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminMenu;