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
const User_1 = __importDefault(require("../model/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const handleNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password)
        return res
            .status(400)
            .json({ message: "Username and password are required" });
    const duplicate = yield User_1.default.findOne({ username }).exec();
    if (duplicate)
        return res
            .status(409)
            .json({ message: `${duplicate.username} already exists` });
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield User_1.default.create({
            username,
            password: hashedPassword,
        });
        res.status(201).json({ message: `New user ${username} has been created` });
    }
    catch (error) {
        res.status(500).json({ message: error });
        console.error(error);
    }
});
exports.default = handleNewUser;
