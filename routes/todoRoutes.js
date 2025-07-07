import express from "express";
import { addTodo, deleteAllTodos, deleteTodo, editTodo, getAllTodo, getTodo } from "../controllers/todoController/todo.js";

const router = express.Router();


router.post( "/addTodo", addTodo)   // add todo
router.get( "/allTodo", getAllTodo)  // get all todos
router.get( "/allTodo/:id", getTodo)   //get single todo by id
router.put( "/edittodo/:id", editTodo)  // edit single todo by id
router.delete( "/deletetodo/:id", deleteTodo)   // delete single todo by id
router.delete( "/deletealltodos", deleteAllTodos)   // delete todo by all


export default router;