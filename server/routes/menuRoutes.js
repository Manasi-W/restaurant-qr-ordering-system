import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createMenuItem,
  getMyMenu,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";

const router = express.Router();

router.post("/", protect, createMenuItem);
router.get("/", protect, getMyMenu);
router.put("/:id", protect, updateMenuItem);
router.delete("/:id", protect, deleteMenuItem);

export default router;
