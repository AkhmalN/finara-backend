"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.licensesQuerySchema = exports.activateLicenseSchema = exports.claimLicenseSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.claimLicenseSchema = zod_1.default.object({
    email: zod_1.default.string().email("Invalid email address"),
    order_id: zod_1.default.string().min(1, "Order ID is optional").optional(),
});
exports.activateLicenseSchema = zod_1.default.object({
    email: zod_1.default.string().email("Invalid email address"),
    license_key: zod_1.default.string().min(1, "License key is required"),
});
exports.licensesQuerySchema = zod_1.default.object({
    page: zod_1.default.coerce.number().int().positive().optional(),
    limit: zod_1.default.coerce.number().int().positive().optional(),
    search: zod_1.default.string().optional(),
});
