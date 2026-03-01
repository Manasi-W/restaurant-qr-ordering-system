import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";

import { fileURLToPath } from "url";

import publicRoutes from "./routes/publicRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import paymentRoutes from "./routes/paymentRoutes.js";



dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174"],
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Ensure uploads directories exist
const uploadsDir = path.join(__dirname, "uploads");
const logosDir = path.join(__dirname, "uploads", "logos");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(logosDir)) fs.mkdirSync(logosDir, { recursive: true });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Server running");
});

// ROUTES
app.use("/api/admin", adminRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/portal", publicRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/payments", paymentRoutes);

// Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler Catch:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
