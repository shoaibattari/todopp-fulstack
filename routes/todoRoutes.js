import express from "express";
import {
  addTodo,
  deleteAllTodos,
  deleteTodo,
  editTodo,
  getAllTodo,
  getTodo,
} from "../controllers/todoController/todo.js";
import verifyToken from "../middlewares/verifyToken.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/addTodo", verifyToken, upload("todoAvatars").single("avatar"), addTodo); // add todo
router.get("/allTodo", verifyToken, getAllTodo); // get all todos
router.get("/allTodo/:id", verifyToken, getTodo); //get single todo by id
router.put("/edittodo/:id", verifyToken, upload("todoAvatars").single("avatar"), editTodo); // edit single todo by id
router.delete("/deletetodo/:id", verifyToken, deleteTodo); // delete single todo by id
router.delete("/deletealltodos", verifyToken, deleteAllTodos); // delete todo by all


export default router;
