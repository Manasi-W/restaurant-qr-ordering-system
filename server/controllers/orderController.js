import Order from "../models/Order.js";
import Menu from "../models/Menu.js";

export const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Items required" });
    }

    let orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const menuItem = await Menu.findById(item.menuItemId);

      if (!menuItem) {
        return res.status(404).json({ message: "Menu item not found" });
      }

      const itemTotal = menuItem.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        menuItemId: menuItem._id,
        name: menuItem.name,
        price: menuItem.price, // 🔒 SNAPSHOT
        quantity: item.quantity
      });
    }

    const order = new Order({
      items: orderItems,
      totalAmount
    });

    await order.save();

    res.status(201).json({
      message: "Order placed successfully",
      orderId: order._id
    });
  } catch (error) {
    console.error(error);
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

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "cancelled";
    await order.save();

    res.json({ message: "Order cancelled" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
