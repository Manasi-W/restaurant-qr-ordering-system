import Order from "../models/Order.js";
import Menu from "../models/Menu.js";
import Admin from "../models/Admin.js";

export const createOrder = async (req, res) => {
  try {
    const { restaurant, table, items } = req.body;

    if (!restaurant || !table || !items || items.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    // Find admin to get canonical restaurant name
    const escapedName = restaurant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const admin = await Admin.findOne({ restaurantName: { $regex: new RegExp(`^${escapedName}$`, "i") } });

    const canonicalRestaurant = admin ? admin.restaurantName : restaurant;

    let totalAmount = 0;
    const formattedItems = [];

    for (let item of items) {
      const itemTotal = item.price * item.quantity;
      totalAmount += itemTotal;
      formattedItems.push({
        name: item.name,
        price: item.price,
        quantity: item.quantity
      });
    }

    const newOrder = new Order({
      restaurant: canonicalRestaurant,
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

    const escapedName = restaurant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`^${escapedName}$`, "i");

    const query = {
      restaurant: regex,
      table: table,
      status: { $ne: "Paid" }
    };

    const orders = await Order.find(query).sort({ createdAt: -1 });
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

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

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