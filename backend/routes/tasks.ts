import {
  createNewTask,
  deleteTask,
  updateTask,
  getAllTasks,
} from "../middleware/tasksController";
import verifyJWT from "../middleware/verifyJWT";

const express = require("express");
const taskRouter = express.Router();

taskRouter
  .route("/")
  .get(verifyJWT, getAllTasks)
  .post(verifyJWT, createNewTask)
  .put(verifyJWT, updateTask)
  .delete(verifyJWT, deleteTask);

export default taskRouter;
