"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = __importDefault(require("@/lib/postgres"));
const LicenseRepository = {
    findById: async (id) => {
        const { rows } = await postgres_1.default.query("SELECT id, email, license_key, is_active, activated_at, created_at, updated_at FROM licenses WHERE id = $1", [id]);
        return rows[0] || null;
    },
    findByEmail: async (email) => {
        const { rows } = await postgres_1.default.query("SELECT id, email, license_key, is_active, activated_at, created_at, updated_at FROM licenses WHERE email = $1", [email]);
        return rows[0] || null;
    },
    findByLicenseKey: async (licenseKey) => {
        const { rows } = await postgres_1.default.query("SELECT id, email, license_key, is_active, activated_at, created_at, updated_at FROM licenses WHERE license_key = $1", [licenseKey]);
        return rows[0] || null;
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
        const { rows } = await postgres_1.default.query("INSERT INTO licenses (id, email, license_key, order_id, is_active, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [
            data.id,
            data.email,
            data.license_key,
            data.order_id,
            data.is_active,
            data.created_at,
            data.updated_at,
        ]);
        return rows[0] || null;
    },
    updateLicense: async (data) => {
        const { rows } = await postgres_1.default.query("UPDATE licenses SET is_active = $1, activated_at = $2, updated_at = $3 WHERE id = $4 RETURNING *", [data.is_active, new Date(), new Date(), data.id]);
        return rows[0] || null;
    },
    deleteById: async (id) => {
        await postgres_1.default.query("DELETE FROM licenses WHERE id = $1", [id]);
        return true;
    },
};
exports.default = LicenseRepository;
