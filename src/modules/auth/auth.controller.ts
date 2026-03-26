import { Request, Response } from "express";
import AuthService from "./auth.service";
import { loginSchema } from "./auth.validator";
import { StatusCodes } from "http-status-codes";

const AuthController = {
  register: async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
      await AuthService.registerUser({ username, email, password });
      res.json({
        success: true,
        message: "Register success",
      });
    } catch (error: any) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message, success: false });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const parsed = loginSchema.parse(req.body);
      const result = await AuthService.loginUser(parsed.email, parsed.password);

      res.json({
        success: true,
        message: "Login success",
        data: result,
      });
    } catch (error: any) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message, success: false });
    }
  },
};

export default AuthController;
