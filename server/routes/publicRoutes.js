import express from "express";
import Admin from "../models/Admin.js";
import Menu from "../models/Menu.js";
<<<<<<< HEAD
import Order from "../models/Order.js";
=======
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6

const router = express.Router();

// PUBLIC MENU VIA QR
router.get("/:restaurantName/:tableNo", async (req, res) => {
  try {
    const { restaurantName, tableNo } = req.params;

    const escapedName = restaurantName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const admin = await Admin.findOne({ restaurantName: { $regex: new RegExp(`^${escapedName}$`, "i") } });

    if (!admin) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

<<<<<<< HEAD
    // Get menu items with order counts
    const menuItems = await Menu.find({ admin: admin._id, available: true });
    
    // Get order counts for each menu item
    const orderCounts = await Order.aggregate([
      { $match: { restaurant: admin.restaurantName } },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.name",
          orderCount: { $sum: "$items.quantity" }
        }
      }
    ]);

    // Create a map of item name to order count
    const orderCountMap = {};
    orderCounts.forEach(item => {
      orderCountMap[item._id] = item.orderCount;
    });

    // Add order count to menu items and sort by order count (descending)
    const menuWithCounts = menuItems.map(item => ({
      ...item.toObject(),
      orderCount: orderCountMap[item.name] || 0
    })).sort((a, b) => b.orderCount - a.orderCount);
=======
    const menu = await Menu.find({ admin: admin._id, available: true });
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6

    res.json({
      restaurant: admin.restaurantName,
      address: admin.address,
      phone: admin.phone,
      table: tableNo,
<<<<<<< HEAD
      menu: menuWithCounts,
      themeColors: admin.themeColors || { primary: "#f472b6", secondary: "#c4b5fd", accent: "#86efac" },
      userLogoUrl: admin.userLogoUrl || null
=======
      menu
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
