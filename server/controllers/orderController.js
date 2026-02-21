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
      // Store current price to make order "write-once"
      const itemTotal = item.price * item.quantity;
      totalAmount += itemTotal;

      formattedItems.push({
        name: item.name,
        price: item.price,
        quantity: item.quantity
      });
    }

    const newOrder = new Order({
      restaurant,
      table,
      items: formattedItems,
      totalAmount,
      status: "Pending"
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

export const getActiveOrders = async (req, res) => {
  try {
    const { restaurant, table } = req.params;
    // Fetch all orders for this table that aren't 'Paid'
    const orders = await Order.find({
      restaurant,
      table,
      status: { $ne: "Paid" }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { restaurantName } = req.admin;

    const order = await Order.findOneAndUpdate(
      { _id: id, restaurant: restaurantName },
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const { restaurantName } = req.admin;
    const orders = await Order.find({ restaurant: restaurantName }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};