"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const taskSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
        default: "No description",
    },
    subtasks: {
        type: [String],
        default: [],
    },
    status: {
        type: String,
        default: "todo",
    },
});
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    tasks: {
        type: [taskSchema],
    },
    refreshToken: {
        type: String,
    },
});
exports.default = mongoose_1.default.model("User", userSchema);
