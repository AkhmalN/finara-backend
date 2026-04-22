"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("@/modules/users/user.service"));
const http_status_codes_1 = require("http-status-codes");
const jwt_1 = require("@/utils/jwt");
const UserController = {
    getUsers: async (req, res) => {
        const query = req.query;
        try {
            const users = await user_service_1.default.getAllUsers(query);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: 'Users retrieved successfully',
                data: users.data,
                meta: users.meta,
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Failed to retrieve users',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    },
    getUser: async (req, res) => {
        const userId = req.params.id;
        try {
            const user = await user_service_1.default.getUserById(userId);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: 'User retrieved successfully',
                data: user,
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Failed to retrieve user',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    },
    getUserMe: async (req, res) => {
        const requestHeader = req.headers.authorization;
        if (!requestHeader) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: 'Unauthorized',
            });
        }
        const token = requestHeader.split(' ')[1];
        const verifyUser = (0, jwt_1.verifyToken)(token);
        try {
            console.log(verifyUser);
        }
        catch (error) { }
        res.status(200).json({ message: 'User details retrieved successfully' });
    },
    createUser: async (req, res) => {
        const { username, email, password } = req.body;
        try {
            const newUser = await user_service_1.default.createUser({
                username,
                email,
                password,
            });
            res.status(http_status_codes_1.StatusCodes.CREATED).json({
                success: true,
                message: 'User created successfully',
                data: newUser,
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Failed to create user',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    },
    updateUser: async (req, res) => {
        res.status(200).json({ message: 'User updated successfully' });
    },
    deleteUser: async (req, res) => {
        res.status(200).json({ message: 'User deleted successfully' });
    },
};
exports.default = UserController;
