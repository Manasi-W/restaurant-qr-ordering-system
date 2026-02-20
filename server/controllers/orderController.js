import Order from "../models/Order.js";
import Menu from "../models/Menu.js";

export const createOrder = async (req, res) => {
  try {
    const { restaurant, table, items } = req.body;

    if (!restaurant || !table || !items || items.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    let totalAmount = 0;
    const formattedItems = [];

    for (let item of items) {
      const menuItem = await Menu.findById(item.menuItem);

      if (!menuItem) {
        return res.status(404).json({ message: "Menu item not found" });
      }

      const itemTotal = menuItem.price * item.quantity;
      totalAmount += itemTotal;

      formattedItems.push({
        name: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity
      });
    }

    const newOrder = new Order({
      restaurant,
      table,
      items: formattedItems,
      totalAmount
    });

    await newOrder.save();

    res.json({
      message: "Order placed successfully",
      order: newOrder
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};