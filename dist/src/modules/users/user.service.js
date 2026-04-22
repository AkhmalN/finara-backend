"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = __importDefault(require("@/modules/users/user.repository"));
const hash_1 = require("@/utils/hash");
const UserService = {
    getUserById: async (id) => {
        const result = await user_repository_1.default.findById(id);
        return result;
    },
    getAllUsers: async (query) => {
        const result = await user_repository_1.default.findMany(query);
        return {
            data: result.data,
            meta: result.meta,
        };
    },
    createUser: async (data) => {
        const newUser = {
            username: data.username,
            email: data.email,
            password_hash: await (0, hash_1.hashPassword)(data.password),
        };
        const result = await user_repository_1.default.insert(newUser);
        return result;
    },
    updateUser: async (id, data) => {
        const updatedData = {
            username: data.username,
            email: data.email,
        };
        const result = await user_repository_1.default.updateById(id, updatedData);
        return result;
    },
    deleteUser: async (id) => {
        const result = await user_repository_1.default.deleteById(id);
        return result;
    },
};
exports.default = UserService;
