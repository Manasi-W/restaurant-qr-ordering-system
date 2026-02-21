import Order from "../models/Order.js";

export const getDashboardStats = async (req, res) => {
  try {
    const now = new Date();
    const restaurantName = req.admin.restaurantName;

    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Filter by restaurant
    const query = { restaurant: restaurantName };

    // Daily orders count
    const todayOrders = await Order.countDocuments({
      ...query,
      createdAt: { $gte: startOfDay }
    });

    // Monthly orders count
    const monthlyOrders = await Order.countDocuments({
      ...query,
      createdAt: { $gte: startOfMonth }
    });

    // Revenue Tracking
    const revenueStats = await Order.aggregate([
      { $match: { ...query, createdAt: { $gte: startOfMonth } } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
          todayRevenue: {
            $sum: {
              $cond: [{ $gte: ["$createdAt", startOfDay] }, "$totalAmount", 0]
            }
          }
        }
      }
    ]);

    // Most selling items (Top 5)
    const topItems = await Order.aggregate([
      { $match: query },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.name",
          totalSold: { $sum: "$items.quantity" },
          revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      todayOrders,
      monthlyOrders,
      totalMonthlyRevenue: revenueStats[0]?.totalRevenue || 0,
      todayRevenue: revenueStats[0]?.todayRevenue || 0,
      topSellingItems: topItems
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
