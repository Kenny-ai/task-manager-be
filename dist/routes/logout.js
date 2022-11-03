"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Logout_1 = __importDefault(require("../controllers/Logout"));
const logoutRouter = express_1.default.Router();
logoutRouter.get("/", Logout_1.default);
exports.default = logoutRouter;
