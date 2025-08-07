import express from "express";
import taskifyRoutes from "./taskifyRoutes.js";
import authRoutes from "./authRoutes.js";
import adminRoutes from "./adminRoutes.js";

const router = express.Router();

router.use("/taskify", taskifyRoutes);
router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);

export default router;
