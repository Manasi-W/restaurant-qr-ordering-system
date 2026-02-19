import express from "express";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    admin: req.admin,
  });
});

export default router;
