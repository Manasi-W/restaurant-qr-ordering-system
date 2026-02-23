import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import QRCode from "qrcode";
import multer from "multer";
import path from "path";

import Admin from "../models/Admin.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer config for logo uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/logos/");
  },
  filename: (req, file, cb) => {
    cb(null, `logo-${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed"));
  }
});
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
    console.error("Login Error:", error);
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

    // Set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only works on https
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      message: "Login successful",
      admin: {
        id: admin._id,
        adminName: admin.adminName,
        restaurantName: admin.restaurantName,
        email: admin.email
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ============================= */
/* ADMIN LOGOUT */
/* ============================= */

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

/* ============================= */
/* GET CURRENT ADMIN (ME) */
/* ============================= */

router.get("/me", authMiddleware, (req, res) => {
  res.json(req.admin);
});

/* ============================= */
/* UPDATE ADMIN PROFILE */
/* ============================= */

router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { adminName, restaurantName, email, phone, address, password } = req.body;
    const admin = await Admin.findById(req.admin.id);

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    if (adminName) admin.adminName = adminName;
    if (restaurantName) admin.restaurantName = restaurantName;
    if (email) admin.email = email;
    if (phone) admin.phone = phone;
    if (address) admin.address = address;

    if (password) {
      admin.password = await bcrypt.hash(password, 10);
    }

    await admin.save();
    res.json({ message: "Profile updated successfully", admin });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ============================= */
/* UPDATE THEME COLORS */
/* ============================= */

router.put("/theme", authMiddleware, async (req, res) => {
  try {
    const { primary, secondary, accent } = req.body;
    const admin = await Admin.findById(req.admin.id);

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    if (primary) admin.themeColors.primary = primary;
    if (secondary) admin.themeColors.secondary = secondary;
    if (accent) admin.themeColors.accent = accent;

    await admin.save();
    res.json({ message: "Theme updated successfully", themeColors: admin.themeColors });
  } catch (error) {
    console.error("Theme Update Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ============================= */
/* UPLOAD LOGOS */
/* ============================= */

router.post("/logo/upload", authMiddleware, upload.single("logo"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { type } = req.body; // type: 'admin' or 'user'
    const admin = await Admin.findById(req.admin.id);

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const logoUrl = `/uploads/logos/${req.file.filename}`;

    if (type === "admin") {
      admin.adminLogoUrl = logoUrl;
    } else if (type === "user") {
      admin.userLogoUrl = logoUrl;
    } else {
      return res.status(400).json({ message: "Invalid logo type" });
    }

    await admin.save();
    res.json({ message: "Logo uploaded successfully", logoUrl, admin });
  } catch (error) {
    console.error("Logo Upload Error:", error);
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
      const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
      const url = `${frontendUrl}/portal/${admin.restaurantName}/${i}`;
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
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;