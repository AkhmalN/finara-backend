"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgresConfig_1 = require("@/lib/postgresConfig");
const db = {
    query: async (text, params) => {
        return postgresConfig_1.postgresConfig.pool.query(text, params);
    },
    getOne: async (text, params) => {
        const result = await postgresConfig_1.postgresConfig.pool.query(text, params);
        return result.rows[0] || null;
    },
    getMany: async (text, params) => {
        const result = await postgresConfig_1.postgresConfig.pool.query(text, params);
        return result.rows;
    },
    close: async () => {
        await postgresConfig_1.postgresConfig.pool.end();
    },
};
exports.default = db;
