import { Request, Response } from "express";
import User from "../model/User";
import { tokenBasedUser } from "./verifyJWT";

export const getAllTasks = async (req: Request, res: Response) => {
  const loggedIn = await User.findOne({
    username: tokenBasedUser.username,
  }).exec();
  const tasks = loggedIn?.tasks;
  res.status(200).json({ tasks });
};

export const createNewTask = async (req: Request, res: Response) => {
  if (!req.body.title)
    return res.status(400).json({ message: "task title is required" });

  const { title, description, subtasks, status } = req.body;

  try {
    const loggedIn = await User.findOne({
      username: tokenBasedUser.username,
    }).exec();

    await loggedIn?.updateOne({
      $push: { tasks: { title, description, subtasks, status } },
    });

    const result = await loggedIn?.save();
    res.status(201).json({ message: "Task created" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
export const updateTask = async (req: Request, res: Response) => {};
export const deleteTask = async (req: Request, res: Response) => {};
