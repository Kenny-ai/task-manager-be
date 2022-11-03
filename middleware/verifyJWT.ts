import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface TokenBearer {
  username: string;
}

export let tokenBearer: TokenBearer;

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  let authHeader = req.headers.authorization as string;

  if (!authHeader) return res.status(401).json({ message: "Invalid token" });

  if (authHeader.toLowerCase().startsWith("bearer")) {
    authHeader = authHeader.slice("bearer".length).trim();
  }
  jwt.verify(
    authHeader,
    `${process.env.ACCESS_TOKEN_SECRET}`,
    (err: any, decoded: any) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      tokenBearer = decoded;
      next();
    }
  );
};

export default verifyJWT;
