import Order from "../models/Order.js";

export const getDashboardStats = async (req, res) => {
  try {
    const now = new Date();
    const restaurantName = req.admin.restaurantName;

    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Filter by restaurant
    const query = { restaurant: restaurantName };
    console.log(`[Dashboard] Querying for: "${restaurantName}"`);

    // Helper for visit-based aggregation
    const visitAggregation = (matchQuery) => [
      { $match: matchQuery },
      {
        $group: {
          _id: {
            table: "$table",
            // Group by status. If Paid, also group by updatedAt to catch the same "checkout" batch.
            // Using a 1-minute window for Paid orders to catch multi-order checkouts that might have slight millisecond differences if not using updateMany
            session: {
              $cond: [
                { $eq: ["$status", "Paid"] },
                { $dateToString: { format: "%Y-%m-%d %H:%M", date: "$updatedAt" } },
                "active"
              ]
            }
          }
        }
      },
      { $count: "count" }
    ];

    // Daily visits count
    const todayResult = await Order.aggregate(visitAggregation({
      ...query,
      createdAt: { $gte: startOfDay }
    }));
    const todayOrders = todayResult[0]?.count || 0;

    // Monthly visits count
    const monthlyResult = await Order.aggregate(visitAggregation({
      ...query,
      createdAt: { $gte: startOfMonth }
    }));
    const monthlyOrders = monthlyResult[0]?.count || 0;

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

    // Total visits count (all-time)
    const totalResult = await Order.aggregate(visitAggregation(query));
    const totalOrders = totalResult[0]?.count || 0;
    console.log(`[Dashboard] Total Visits for "${restaurantName}": ${totalOrders}`);

    const stats = {
      todayOrders,
      monthlyOrders,
      totalOrders,
      totalMonthlyRevenue: revenueStats[0]?.totalRevenue || 0,
      monthlyRevenue: revenueStats[0]?.totalRevenue || 0,
      todayRevenue: revenueStats[0]?.todayRevenue || 0,
      topSellingItems: topItems
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
