"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createNewTask = exports.getAllTasks = void 0;
const User_1 = __importDefault(require("../model/User"));
const verifyJWT_1 = require("../middleware/verifyJWT");
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield User_1.default.findOne({
        username: verifyJWT_1.tokenBearer.username,
    }).exec();
    const tasks = foundUser === null || foundUser === void 0 ? void 0 : foundUser.tasks;
    res.status(200).json({ tasks });
});
exports.getAllTasks = getAllTasks;
const createNewTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.title)
        return res.status(400).json({ message: "task title is required" });
    const { title, description, subtasks, status } = req.body;
    try {
        const foundUser = yield User_1.default.findOne({
            username: verifyJWT_1.tokenBearer.username,
        }).exec();
        yield (foundUser === null || foundUser === void 0 ? void 0 : foundUser.updateOne({
            $push: { tasks: { title, description, subtasks, status } },
        }));
        yield (foundUser === null || foundUser === void 0 ? void 0 : foundUser.save());
        res.status(201).json({ message: "Task created" });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
exports.createNewTask = createNewTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.taskId)
        return res.status(400).json({ message: "taskId parameter is required" });
    const { taskId, title, description, subtasks, status } = req.body;
    if (!taskId)
        return res.status(400).json({ message: "Task ID is required" });
    try {
        yield (User_1.default === null || User_1.default === void 0 ? void 0 : User_1.default.findOneAndUpdate({ username: verifyJWT_1.tokenBearer.username, "tasks._id": taskId }, {
            $set: {
                "tasks.$.title": title,
                "tasks.$.description": description,
                "tasks.$.subtasks": subtasks,
                "tasks.$.status": status,
            },
        }));
        return res.status(200).json({ message: "Successfully updated" });
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        return res.status(400).json({ message: "taskId parameter is required" });
    const taskId = req.params.id;
    try {
        yield (User_1.default === null || User_1.default === void 0 ? void 0 : User_1.default.findOneAndUpdate({ username: verifyJWT_1.tokenBearer.username }, { $pull: { tasks: { _id: taskId } } }));
        return res.status(200).json({ message: "Task successfully deleted" });
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
exports.deleteTask = deleteTask;
