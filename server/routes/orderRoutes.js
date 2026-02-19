import express from "express";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
  cancelOrder
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// customer
router.post("/", createOrder);

// admin
router.get("/", authMiddleware, getOrders);
router.put("/:id/status", authMiddleware, updateOrderStatus);
router.put("/:id/cancel", authMiddleware, cancelOrder);

export default router;
