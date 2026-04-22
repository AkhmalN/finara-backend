"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserSchema = exports.updateUserSchema = exports.createUserSchema = exports.userSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userSchema = zod_1.default.object({
    id: zod_1.default.uuid(),
    username: zod_1.default.string().min(3).max(20),
    email: zod_1.default.email(),
    password_hash: zod_1.default.string(),
    created_at: zod_1.default.date(),
    updated_at: zod_1.default.date(),
});
exports.createUserSchema = zod_1.default.object({
    username: zod_1.default.string().min(3).max(20),
    email: zod_1.default.email(),
    password: zod_1.default.string().min(6),
});
exports.updateUserSchema = zod_1.default.object({
    username: zod_1.default.string().min(3).max(20).optional(),
    email: zod_1.default.email().optional(),
    password: zod_1.default.string().min(6).optional(),
});
exports.deleteUserSchema = zod_1.default.object({
    id: zod_1.default.uuid(),
});
