import express from "express";
import {
  adminDeleteAllTaskify,
  getAllTaskifyForAdmin,
} from "../controllers/taskifyController/taskify.js"; // ✅ Updated path and names
import verifyToken from "../middlewares/verifyToken.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import { getAllUsersForAdmin } from "../controllers/authController/auth.js";

const router = express.Router();

// ✅ Admin: Delete All Taskify
router.delete(
  "/delete-all-taskify",
  verifyToken,
  authorizeRoles("admin"),
  adminDeleteAllTaskify
);

// ✅ Admin: Get All Taskify
router.get(
  "/all-taskify",
  verifyToken,
  authorizeRoles("admin"),
  getAllTaskifyForAdmin
);

// ✅ Admin: Get All Users
router.get(
  "/all-users",
  verifyToken,
  authorizeRoles("admin"),
  getAllUsersForAdmin
);

export default router;
