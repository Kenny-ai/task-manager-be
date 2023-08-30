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
import verifyJWT from "../middleware/verifyJWT";

const express = require("express");
const boardRouter = express.Router();

boardRouter
  .route("/")
  .get(verifyJWT, getAllUserBoards)
  .post(verifyJWT, createNewBoard)
  .put(verifyJWT, updateBoard)
  .delete(verifyJWT, deleteBoard);

boardRouter.get("/all", getAllBoards);

boardRouter
  .route("/tasks")
  .post(verifyJWT, createNewTask)
  .put(verifyJWT, updateTask)
  .delete(verifyJWT, deleteTask);

export default boardRouter;
