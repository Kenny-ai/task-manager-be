import express from "express";
import handleRefresh from "../controllers/Refresh";

const refreshRouter = express.Router();

refreshRouter.get("/", handleRefresh);

export default refreshRouter;
