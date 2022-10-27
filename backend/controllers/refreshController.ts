import { Request, Response } from "express";
import User from "../model/User";
import jwt from "jsonwebtoken";

const handleRefresh = async (req: Request, res: Response) => {
  const cookie = req.headers.cookie;

  if (!cookie) return res.status(401).json({ message: "No cookie detected" });

  const refreshToken = cookie!.slice(4);

  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) return res.sendStatus(403);

  jwt.verify(
    refreshToken,
    `${process.env.REFRESH_TOKEN_SECRET}`,
    (err: any, decoded: any) => {
      if (err || foundUser.username !== decoded.username)
        return res.sendStatus(403);
      const accessToken = jwt.sign(
        { username: decoded.username },
        `${process.env.ACCESS_TOKEN_SECRET}`,
        { expiresIn: "30m" }
      );
      res.json({ accessToken });
    }
  );
};

export default handleRefresh;
