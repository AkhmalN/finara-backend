"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_repository_1 = __importDefault(require("@/modules/auth/auth.repository"));
const user_repository_1 = __importDefault(require("@/modules/users/user.repository"));
const hash_1 = require("@/utils/hash");
const jwt_1 = require("@/utils/jwt");
const AuthService = {
    registerUser: async (user) => {
        const existingUser = await auth_repository_1.default.findByEmail(user.email);
        if (existingUser) {
            throw new Error("Email already in use");
        }
        const passwordHash = await (0, hash_1.hashPassword)(user.password);
        const newUser = await user_repository_1.default.insert({
            id: crypto.randomUUID(),
            email: user.email,
            username: user.username,
            password_hash: passwordHash,
        });
        return newUser;
    },
    loginUser: async (email, password) => {
        const user = await auth_repository_1.default.findPasswordByEmail(email);
        if (!user) {
            throw new Error("Akun tidak ditemukan");
        }
        const isPasswordValid = await (0, hash_1.comparePassword)(password, user.password_hash);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }
        const token = (0, jwt_1.signToken)({ userId: user.id, email: user.email });
        return {
            access_token: token,
            user: {
                id: user.id,
            },
        };
    },
};
exports.default = AuthService;
