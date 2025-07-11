import express from "express";
import todoRoutes from "./todoRoutes.js";
import authRoutes from "./authRoutes.js";
import adminRoutes from "./adminRoutes.js";

const router = express.Router();

router.use("/todo", todoRoutes);
router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);

export default router;
