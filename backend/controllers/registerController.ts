import { Request, Response } from "express";
import User from "../model/User";
import bcrypt from "bcrypt";

const handleNewUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  const duplicate = await User.findOne({ username }).exec();

  if (duplicate)
    return res
      .status(409)
      .json({ message: `${duplicate.username} already exists` });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
    });
    res.status(201).json({ message: `New user ${username} has been created` });
  } catch (error) {
    res.status(500).json({ message: error });
    console.error(error);
  }
};

export default handleNewUser;
