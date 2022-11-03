import {
  createNewTask,
  deleteTask,
  updateTask,
  getAllTasks,
} from "../../controllers/Tasks";
import verifyJWT from "../../middleware/verifyJWT";

const express = require("express");
const taskRouter = express.Router();

taskRouter
  .route("/")
  .get(verifyJWT, getAllTasks)
  .post(verifyJWT, createNewTask)
  .put(verifyJWT, updateTask);

taskRouter.route("/:id").delete(verifyJWT, deleteTask);
export default taskRouter;
