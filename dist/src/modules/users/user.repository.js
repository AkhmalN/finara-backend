"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = __importDefault(require("@/lib/postgres"));
const UserRepository = {
    findById: async (id) => {
        // TODO: implement with PostgreSQL
        return null;
    },
    findMany: async (query) => {
        // TODO: implement with PostgreSQL
        return {
            data: [],
            meta: {
                total: 0,
                page: query.page || 1,
                limit: query.limit || 10,
                totalPages: 0,
            },
        };
    },
    insert: async (data) => {
        const { rows } = await postgres_1.default.query("INSERT INTO users (id, email, username, password_hash, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING id", [data.id, data.email, data.username, data.password_hash]);
        return rows[0] || null;
    },
    updateById: async (id, data) => {
        // TODO: implement with PostgreSQL
        return true;
    },
    deleteById: async (id) => {
        // TODO: implement with PostgreSQL
        return true;
    },
};
exports.default = UserRepository;
