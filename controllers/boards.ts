import { Request, Response } from "express";
import Board from "../model/Board";

export const getAllBoards = async (req: Request, res: Response) => {
  try {
    const boards = await Board.find();
    return res.status(200).json({ success: true, data: boards });
  } catch (error) {
    console.error(error);
  }
};

export const getAllUserBoards = async (req: Request, res: Response) => {
  const id = req.query.id;
  try {
    const boards = await Board.find({ owner: id });
    return res.status(200).json({ success: true, data: boards });
  } catch (error) {
    console.error(error);
  }
};

export const createNewBoard = async (req: Request, res: Response) => {
  if (!req.body.name)
    return res.status(400).json({ message: "Board name is required" });

  try {
    const board = await Board.create(req.body);

    res.status(201).json({ success: true, data: board });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const updateBoard = async (req: Request, res: Response) => {
  if (!req.query.id)
    return res.status(400).json({ message: "Board id is required" });

  const id = req.query.id;

  const { name, phases } = req.body;

  try {
    const board = await Board.findByIdAndUpdate(
      id,
      { name, phases },
      { new: true }
    );
    if (!board)
      return res
        .status(404)
        .json({ success: false, message: `board with id ${id} not found` });
    return res.status(201).json({ success: true, data: board });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const deleteBoard = async (req: Request, res: Response) => {
  if (!req.query.id)
    return res.status(400).json({ message: "Board id is required" });

  const id = req.query.id;
  try {
    const board = await Board?.findByIdAndDelete(id);

    if (!board)
      return res
        .status(400)
        .json({ success: false, message: `Board with ${id} not found` });

    return res.status(200).json({
      success: true,
      message: `Successfully deleted board: ${board?.name}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

export const createNewTask = async (req: Request, res: Response) => {
  if (!req.query.id)
    return res.status(400).json({ message: "Board id is required" });

  if (!req.body.title)
    return res.status(400).json({ message: "Task title is required" });

  const id = req.query.id;

  try {
    const newTask = req.body;

    const board = await Board.findByIdAndUpdate(
      id,
      {
        $push: {
          tasks: newTask,
        },
      },
      { new: true }
    );
    if (!board)
      return res.status(404).json({ message: `board with id ${id} not found` });

    res.status(201).json({ success: true, message: "Task created" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const boardId = req.query.boardId;
  const taskId = req.query.taskId;
  if (!taskId || !boardId)
    return res.status(400).json({ message: "board and task id are required" });

  const { title, description, subtasks, phase } = req.body;

  try {
    // const board = await User.updateOne(
    //   {
    //     email: tokenBearer.email,
    //     boards: { $elemMatch: { _id: boardId, "tasks._id": taskId } },
    //   },
    //   {
    //     $set: {
    //       "boards.$[board].tasks.$[task].title": title,
    //       "boards.$[board].tasks.$[task].description": description,
    //       "boards.$[board].tasks.$[task].subtasks": subtasks,
    //       "boards.$[board].tasks.$[task].phase": phase,
    //     },
    //   },
    //   { arrayFilters: [{ "board._id": boardId }, { "task._id": taskId }] }
    // );

    const board = await Board.updateOne(
      { _id: boardId, "tasks._id": taskId },
      {
        $set: {
          "tasks.$.title": title,
          "tasks.$.description": description,
          "tasks.$.subtasks": subtasks,
          "tasks.$.phase": phase,
        },
      }
    );

    if (!board)
      return res.status(404).json({
        message: `board with id ${boardId} or task with id ${taskId} not found`,
      });
    return res.status(200).json({ message: "Task successfully updated" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const boardId = req.query.boardId;
  const taskId = req.query.taskId;
  if (!taskId || !boardId)
    return res.status(400).json({ message: "board and task id are required" });

  try {
    const board = await Board.updateOne(
      { _id: boardId },
      {
        $pull: {
          tasks: { _id: taskId },
        },
      }
    );

    if (!board)
      return res
        .status(404)
        .json({ message: `task with id ${taskId} not found` });
    return res
      .status(200)
      .json({ message: `Task ${taskId} successfully deleted` });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
