import { Application } from "express";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/dbConn";
import mongoose from "mongoose";
import registerRouter from "./routes/register";
import authRouter from "./routes/auth";
import refreshRouter from "./routes/refresh";
import logoutRouter from "./routes/logout";
import taskRouter from "./routes/tasks";
dotenv.config();

const PORT = process.env.PORT || 8000;

// connect to db
connectDB();

const app: Application = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const message = {
  name: "Kenny",
  age: 22,
};

app.use("/register", registerRouter);
app.use("/login", authRouter);
app.use("/refresh", refreshRouter);
app.use("/logout", logoutRouter);

app.use("/tasks", taskRouter);

app.get("/", (req, res) => {
  res.json(message);
});

app.listen(PORT, (): void => console.log(`Server running on PORT ${PORT}`));

mongoose.connection.once("open", () => console.log("Connected to Mongo DB"));
