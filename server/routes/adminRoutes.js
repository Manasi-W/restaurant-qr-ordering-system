import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import QRCode from "qrcode";

import Admin from "../models/Admin.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* ============================= */
/* ADMIN REGISTER */
/* ============================= */

router.post("/register", async (req, res) => {
  try {
    const { adminName, restaurantName, email, phone, address, password } = req.body;

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      adminName,
      restaurantName,
      email,
      phone,
      address,
      password: hashedPassword
    });

    await admin.save();

    res.json({
      message: "Admin registered successfully"
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ============================= */
/* ADMIN LOGIN */
/* ============================= */

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        adminName: admin.adminName,
        restaurantName: admin.restaurantName,
        email: admin.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ============================= */
/* CREATE TABLES + GENERATE QR */
/* ============================= */

router.post("/tables", authMiddleware, async (req, res) => {
  try {
    const { tables } = req.body;

    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    admin.tables = tables;
    await admin.save();

    const qrCodes = [];

    for (let i = 1; i <= tables; i++) {
      const url = `http://localhost:5173/portal/${admin.restaurantName}/${i}`;
      const qr = await QRCode.toDataURL(url);

      qrCodes.push({
        table: i,
        url,
        qr
      });
    }

    res.json({
      message: "Tables created successfully",
      qrCodes
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;