import express from "express";
import handleLogin from "../controllers/Auth";

const authRouter = express.Router();

authRouter.post("/", handleLogin);

export default authRouter;
