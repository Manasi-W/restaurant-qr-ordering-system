import express from "express";
import multer from "multer";
import path from "path";
import protect from "../middleware/authMiddleware.js";
import {
  createMenuItem,
  getMyMenu,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";

const router = express.Router();

// MULTER CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.post("/", protect, upload.single("image"), createMenuItem);
router.get("/", protect, getMyMenu);
router.put("/:id", protect, upload.single("image"), updateMenuItem);
router.delete("/:id", protect, deleteMenuItem);

export default router;
