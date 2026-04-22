"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("./auth.service"));
const auth_validator_1 = require("./auth.validator");
const http_status_codes_1 = require("http-status-codes");
const AuthController = {
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            await auth_service_1.default.registerUser({ username, email, password });
            res.json({
                success: true,
                message: "Register success",
            });
        }
        catch (error) {
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ message: error.message, success: false });
        }
    },
    login: async (req, res) => {
        try {
            const parsed = auth_validator_1.loginSchema.parse(req.body);
            const result = await auth_service_1.default.loginUser(parsed.email, parsed.password);
            res.json({
                success: true,
                message: "Login success",
                data: result,
            });
        }
        catch (error) {
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ message: error.message, success: false });
        }
    },
};
exports.default = AuthController;
