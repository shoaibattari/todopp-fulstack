import express from "express";
import {
  addTaskify,
  deleteAllTaskify,
  deleteTaskify,
  editTaskify,
  getAllTaskify,
  getTaskify,
} from "../controllers/taskifyController/taskify.js";
import verifyToken from "../middlewares/verifyToken.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/add",
  verifyToken,
  upload("taskifyAvatars").single("avatar"),
  addTaskify
);
router.get("/all", verifyToken, getAllTaskify);
router.get("/:id", verifyToken, getTaskify);
router.put(
  "/edit/:id",
  verifyToken,
  upload("taskifyAvatars").single("avatar"),
  editTaskify
);
router.delete("/delete/:id", verifyToken, deleteTaskify);
router.delete("/delete-all", verifyToken, deleteAllTaskify);

export default router;
