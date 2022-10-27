import express from "express";
import handleRefresh from "../controllers/refreshController";

const refreshRouter = express.Router();

refreshRouter.get("/", handleRefresh);

export default refreshRouter;
