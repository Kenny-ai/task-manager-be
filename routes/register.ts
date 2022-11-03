import express from "express";
import handleNewUser from "../controllers/Register";

const registerRouter = express.Router();

registerRouter.post("/", handleNewUser);

export default registerRouter;
