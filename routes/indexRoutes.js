import express from "express";
import taskifyRoutes from "./taskifyRoutes.js";
import authRoutes from "./authRoutes.js";
import adminRoutes from "./adminRoutes.js";
import volunteerRoutes from "./volunteerRoutes.js";
import studentRegistrationRoutes from "./studentRegistrationRoutes.js";

const router = express.Router();

router.use("/taskify", taskifyRoutes);
router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/volunteers", volunteerRoutes);
router.use("/student-registration", studentRegistrationRoutes);

export default router;
