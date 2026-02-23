import express from "express";
import multer from "multer";
import path from "path";
<<<<<<< HEAD
import { fileURLToPath } from "url";
=======
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
import protect from "../middleware/authMiddleware.js";
import {
  createMenuItem,
  getMyMenu,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";

<<<<<<< HEAD
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
=======
const router = express.Router();

// MULTER CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
  }
});

const upload = multer({ storage });

router.post("/", protect, upload.single("image"), createMenuItem);
router.get("/", protect, getMyMenu);
router.put("/:id", protect, upload.single("image"), updateMenuItem);
router.delete("/:id", protect, deleteMenuItem);

export default router;
