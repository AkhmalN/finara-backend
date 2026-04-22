"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = __importDefault(require("@/lib/postgres"));
const AuthRepository = {
    findByEmail: async (email) => {
        const { rows } = await postgres_1.default.query("SELECT id, email FROM users WHERE email = $1", [email]);
        return rows[0] || null;
    },
    findPasswordByEmail: async (email) => {
        const { rows } = await postgres_1.default.query("SELECT id, password_hash FROM users WHERE email = $1", [email]);
        return rows[0] || null;
    },
};
exports.default = AuthRepository;
