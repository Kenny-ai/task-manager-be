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
const handleLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookie = req.headers.cookie;
    if (!cookie)
        return res.sendStatus(401);
    const refreshToken = cookie.slice(4);
    const foundUser = yield User_1.default.findOne({ refreshToken }).exec();
    if (!foundUser) {
        return res.status(403).json({ message: "user is not logged in" });
    }
    foundUser.refreshToken = "";
    yield foundUser.save();
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    res.status(200).json({ message: "successfully logged out" });
});
exports.default = handleLogout;
