import Order from "../models/Order.js";

export const getDashboardStats = async (req, res) => {
  try {
    const now = new Date();

    // Start of today
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    // Start of month
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    // Daily orders count
    const todayOrders = await Order.countDocuments({
      createdAt: { $gte: startOfDay }
    });

    // Monthly orders count
    const monthlyOrders = await Order.countDocuments({
      createdAt: { $gte: startOfMonth }
    });

    // Most selling item
    const topItems = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.name",
          totalSold: { $sum: "$items.quantity" }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 1 }
    ]);

    res.json({
      todayOrders,
      monthlyOrders,
      topSellingItem: topItems[0] || null
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
