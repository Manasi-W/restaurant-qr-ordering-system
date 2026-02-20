import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import publicRoutes from "./routes/publicRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";


dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected (local)"))
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

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
