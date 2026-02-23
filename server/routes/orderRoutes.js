import express from "express";
import { createOrder, getOrders, getActiveOrders, updateOrderStatus } from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* PUBLIC — place order */
router.post("/", createOrder);
router.get("/active/:restaurant/:table", getActiveOrders);

/* ADMIN — view/update orders */
router.get("/", authMiddleware, getOrders);
router.put("/:id/status", authMiddleware, updateOrderStatus);

export default router;