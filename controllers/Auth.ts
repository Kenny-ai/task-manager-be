import { Request, Response } from "express";
import User from "../model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const handleLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  const foundUser = await User.findOne({ username }).exec();

  if (!foundUser)
    return res.status(401).json({ message: `incorrect username or password` });

  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);

  if (!match)
    return res.status(401).json({ message: `incorrect username or password` });

  const accessToken = jwt.sign(
    { username },
    `${process.env.ACCESS_TOKEN_SECRET}`,
    {
      expiresIn: "30m",
    }
  );
  const refreshToken = jwt.sign(
    { username },
    `${process.env.REFRESH_TOKEN_SECRET}`,
    {
      expiresIn: "1d",
    }
  );

  await User.findOneAndUpdate({ username }, { $set: { refreshToken } });

  // foundUser.refreshToken = refreshToken;
  // await foundUser.save();

  // res.cookie("jwt", refreshToken, {
  //   httpOnly: true,
  //   // domain: "https://kenybolu-url-shortener.vercel.app",
  //   sameSite: "none",
  //   // secure: true,
  //   maxAge: 24 * 60 * 60 * 1000,
  // });
  res.cookie("jwt", refreshToken);
  res.status(200).json({ accessToken });
};
export default handleLogin;
