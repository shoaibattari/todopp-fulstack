import express from "express";
import {
  addTodo,
  adminDeleteAllTodos,
  deleteAllTodos,
  deleteTodo,
  editTodo,
  getAllTodo,
  getAllTodosForAdmin,
  getTodo,
} from "../controllers/todoController/todo.js";
import verifyToken from "../middlewares/verifyToken.js";
import authorizedRoles from "../middlewares/authorizeRoles.js";

const router = express.Router();

router.post("/addTodo", verifyToken, addTodo); // add todo
router.get("/allTodo", verifyToken, getAllTodo); // get all todos
router.get("/allTodo/:id", verifyToken, getTodo); //get single todo by id
router.put("/edittodo/:id", verifyToken, editTodo); // edit single todo by id
router.delete("/deletetodo/:id", verifyToken, deleteTodo); // delete single todo by id
router.delete("/deletealltodos", verifyToken, deleteAllTodos); // delete todo by all

// adminDeleteAllTodos
router.delete(
  "/admin/deletealltodos",
  verifyToken,
  authorizedRoles("admin"),
  adminDeleteAllTodos
);

// adminGeteAllTodos
router.get(
  "/admin/allTodos",
  verifyToken,
  authorizedRoles("admin"),
  getAllTodosForAdmin
); // get All Todo For Admin Only

export default router;
