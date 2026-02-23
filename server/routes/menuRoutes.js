import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import protect from "../middleware/authMiddleware.js";
import {
  createMenuItem,
  getMyMenu,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// MULTER CONFIG - use absolute path for uploads
const uploadsDir = path.join(__dirname, "..", "uploads");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const safeName = (file.originalname || "image").replace(/[^a-zA-Z0-9.-]/g, "_");
    cb(null, `${Date.now()}-${safeName}`);
  }
});

const upload = multer({ storage });

router.post("/", protect, upload.single("image"), createMenuItem);
router.get("/", protect, getMyMenu);
router.put("/:id", protect, upload.single("image"), updateMenuItem);
router.delete("/:id", protect, deleteMenuItem);

export default router;
