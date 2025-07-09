import express from "express";
import todoRoutes from "./todoRoutes.js";
import authRoutes from "./authRoutes.js"


const router = express.Router();


router.use("/todo", todoRoutes)
router.use("/auth", authRoutes)

export default router;