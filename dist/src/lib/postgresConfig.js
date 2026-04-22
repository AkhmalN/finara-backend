"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postgresConfig = void 0;
const pg_1 = require("pg");
const env_1 = require("../config/env");
const pool = new pg_1.Pool({
    host: env_1.ENV.DB_HOST,
    port: env_1.ENV.DB_PORT,
    database: env_1.ENV.DB_NAME,
    user: env_1.ENV.DB_USER,
    password: env_1.ENV.DB_PASSWORD,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
pool.on("error", (err) => {
    console.error("Unexpected error on idle client", err);
});
exports.postgresConfig = {
    pool,
};
