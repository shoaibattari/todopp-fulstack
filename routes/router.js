import express from "express";
import { addTodo, deleteAllTodos, deleteTodo, editTodo, getAllTodo, getTodo } from "../controllers/todoController/todo.js";

const router = express.Router();


router.post( "/addTodo", addTodo)   // add todo
router.get( "/AllTodo", getAllTodo)  // get all todos
router.get( "/AllTodo/:id", getTodo)   //get single todo by id
router.put( "/EditTodo/:id", editTodo)  // edit single todo by id
router.delete( "/DeleteTodo/:id", deleteTodo)   // delete single todo by id
router.delete( "/DeleteAllTodos", deleteAllTodos)   // delete todo by all


export default router;