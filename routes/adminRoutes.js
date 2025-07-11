import express from "express";
import {
  adminDeleteAllTodos,
  getAllTodosForAdmin,
} from "../controllers/todoController/todo.js";
import verifyToken from "../middlewares/verifyToken.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import { getAllUsersForAdmin } from "../controllers/authController/auth.js";

const router = express.Router();

// adminDeleteAllTodos
router.delete(
  "/deletealltodos",
  verifyToken,
  authorizeRoles("admin"),
  adminDeleteAllTodos
);

// adminGeteAllTodos
router.get(
  "/allTodos",
  verifyToken,
  authorizeRoles("admin"),
  getAllTodosForAdmin
); // get All Todo For Admin Only


// adminGeteAllTodos
router.get(
  "/allUsers",
  verifyToken,
  authorizeRoles("admin"),
  getAllUsersForAdmin
); // get All Todo For Admin Only


export default router;
