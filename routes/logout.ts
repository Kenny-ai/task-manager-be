import express from "express";
import handleLogout from "../controllers/Logout";

const logoutRouter = express.Router();

logoutRouter.get("/", handleLogout);

export default logoutRouter;
