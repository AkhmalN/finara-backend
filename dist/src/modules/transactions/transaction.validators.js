"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionsQuerySchema = exports.updateTransactionSchema = exports.createTransactionSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createTransactionSchema = zod_1.default.object({
    user_id: zod_1.default.string().min(1, "User ID is required"),
    account_id: zod_1.default.string().min(1, "Account ID is required"),
    category_id: zod_1.default.string().min(1, "Category ID is required"),
    amount: zod_1.default.number().positive("Amount must be greater than 0"),
    description: zod_1.default.string().optional(),
    date: zod_1.default.string().datetime("Invalid date format"),
    notes: zod_1.default.string().optional(),
    receipt: zod_1.default.string().optional(),
});
exports.updateTransactionSchema = zod_1.default.object({
    user_id: zod_1.default.string().min(1).optional(),
    account_id: zod_1.default.string().min(1).optional(),
    category_id: zod_1.default.string().min(1).optional(),
    amount: zod_1.default.number().positive().optional(),
    description: zod_1.default.string().optional(),
    date: zod_1.default.string().datetime().optional(),
    notes: zod_1.default.string().optional(),
    receipt: zod_1.default.string().optional(),
});
exports.getTransactionsQuerySchema = zod_1.default.object({
    page: zod_1.default.coerce.number().int().positive().optional(),
    limit: zod_1.default.coerce.number().int().positive().optional(),
    user_id: zod_1.default.string().optional(),
    account_id: zod_1.default.string().optional(),
    category_id: zod_1.default.string().optional(),
    start_date: zod_1.default.string().optional(),
    end_date: zod_1.default.string().optional(),
});
