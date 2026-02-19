import express from "express";
import Admin from "../models/Admin.js";
import Menu from "../models/Menu.js";

const router = express.Router();

// PUBLIC MENU VIA QR
router.get("/:restaurantName/:tableNo", async (req, res) => {
  try {
    const { restaurantName, tableNo } = req.params;

    const admin = await Admin.findOne({ restaurantName });

    if (!admin) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const menu = await Menu.find();

    res.json({
      restaurant: admin.restaurantName,
      table: tableNo,
      menu
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
