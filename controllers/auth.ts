import { Request, Response } from "express";
import User from "../model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "email and password are required" });

  try {
    const user = await User.findOne({ email }).exec();

    if (!user)
      return res.status(401).json({ message: `incorrect email or password` });

    // evaluate password
    const match = await bcrypt.compare(password, user.password!);

    if (!match)
      return res.status(401).json({ message: `incorrect email or password` });

    const accessToken = jwt.sign(
      { email },
      `${process.env.ACCESS_TOKEN_SECRET}`,
      {
        expiresIn: "1d",
      }
    );
    const refreshToken = jwt.sign(
      { email },
      `${process.env.REFRESH_TOKEN_SECRET}`,
      {
        expiresIn: "1d",
      }
    );

    await User.findOneAndUpdate({ email }, { $set: { refreshToken } });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      data: {
        name: user.name,
        id: user.id,
        refreshToken: user.refreshToken,
        token: accessToken,
      },
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const logout = async (req: Request, res: Response) => {
  const cookie = req.headers.cookie;

  if (!cookie) return res.sendStatus(401);

  const refreshToken = cookie!.slice(4);

  try {
    const user = await User.findOne({ refreshToken }).exec();

    if (!user) {
      return res.status(403).json({ message: "user is not logged in" });
    }

    user.refreshToken = "";
    await user.save();

    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });

    res.status(200).json({ message: "successfully logged out" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const refresh = async (req: Request, res: Response) => {
  const cookie = req.headers.cookie;

  if (!cookie) return res.status(401).json({ message: "No cookie detected" });

  const refreshToken = cookie!.slice(4);
  try {
    const user = await User.findOne({ refreshToken }).exec();

    if (!user) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      `${process.env.REFRESH_TOKEN_SECRET}`,
      (err: any, decoded: any) => {
        if (err || user.email !== decoded.email) return res.sendStatus(403);
        const accessToken = jwt.sign(
          { email: decoded.email },
          `${process.env.ACCESS_TOKEN_SECRET}`,
          { expiresIn: "30m" }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ message: "name, email and password are required" });

  const duplicate = await User.findOne({ email }).exec();

  if (duplicate)
    return res
      .status(409)
      .json({ message: `${duplicate.email} already exists` });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ message: `New user ${email} has been created`, user });
  } catch (error) {
    res.status(500).send(error);
    console.error(error);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
