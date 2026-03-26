import { Request, Response } from 'express';
import UserService from '@/modules/users/user.service';
import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '@/utils/jwt';

const UserController = {
  getUsers: async (req: Request, res: Response) => {
    const query = req.query;
    try {
      const users = await UserService.getAllUsers(query);
      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Users retrieved successfully',
        data: users.data,
        meta: users.meta,
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to retrieve users',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  },
  getUser: async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
      const user = await UserService.getUserById(userId as string);
      res.status(StatusCodes.OK).json({
        success: true,
        message: 'User retrieved successfully',
        data: user,
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to retrieve user',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  },
  getUserMe: async (req: Request, res: Response) => {
    const requestHeader = req.headers.authorization;
    if (!requestHeader) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const token = requestHeader.split(' ')[1];
    const verifyUser = verifyToken(token);
    try {
      console.log(verifyUser);
    } catch (error) {}
    res.status(200).json({ message: 'User details retrieved successfully' });
  },
  createUser: async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
      const newUser = await UserService.createUser({
        username,
        email,
        password,
      });
      res.status(StatusCodes.CREATED).json({
        success: true,
        message: 'User created successfully',
        data: newUser,
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to create user',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  },
  updateUser: async (req: Request, res: Response) => {
    res.status(200).json({ message: 'User updated successfully' });
  },
  deleteUser: async (req: Request, res: Response) => {
    res.status(200).json({ message: 'User deleted successfully' });
  },
};

export default UserController;
