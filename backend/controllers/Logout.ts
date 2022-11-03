import { Request, Response } from "express";
import User from "../model/User";

const handleLogout = async (req: Request, res: Response) => {
  const cookie = req.headers.cookie;

  if (!cookie) return res.sendStatus(401);

  const refreshToken = cookie!.slice(4);

  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) {
    return res.status(403).json({ message: "user is not logged in" });
  }

  foundUser.refreshToken = "";
  await foundUser.save();

  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });

  res.status(200).json({ message: "successfully logged out" });
};

export default handleLogout;
