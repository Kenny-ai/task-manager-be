import {
  createNewTask,
  deleteTask,
  updateTask,
  createNewBoard,
  deleteBoard,
  updateBoard,
  getAllBoards,
  getAllUserBoards,
} from "../controllers/boards";
import { protect } from "../middleware/auth";

const express = require("express");
const boardRouter = express.Router();

boardRouter
  .route("/")
  .get(protect, getAllUserBoards)
  .post(protect, createNewBoard)
  .put(protect, updateBoard)
  .delete(protect, deleteBoard);

boardRouter.get("/all", getAllBoards);

boardRouter
  .route("/tasks")
  .post(protect, createNewTask)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

export default boardRouter;
