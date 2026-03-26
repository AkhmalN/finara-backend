import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/utils/jwt";
import { StatusCodes } from "http-status-codes";

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid Token" });
  }
};
