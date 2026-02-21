import express from "express";
import Admin from "../models/Admin.js";
import Menu from "../models/Menu.js";

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

    const menu = await Menu.find({ admin: admin._id, available: true });

    res.json({
      restaurant: admin.restaurantName,
      address: admin.address,
      phone: admin.phone,
      table: tableNo,
      menu
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
