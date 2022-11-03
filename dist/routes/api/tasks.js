"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tasks_1 = require("../../controllers/Tasks");
const verifyJWT_1 = __importDefault(require("../../middleware/verifyJWT"));
const express = require("express");
const taskRouter = express.Router();
taskRouter
    .route("/")
    .get(verifyJWT_1.default, Tasks_1.getAllTasks)
    .post(verifyJWT_1.default, Tasks_1.createNewTask)
    .put(verifyJWT_1.default, Tasks_1.updateTask);
taskRouter.route("/:id").delete(verifyJWT_1.default, Tasks_1.deleteTask);
exports.default = taskRouter;
