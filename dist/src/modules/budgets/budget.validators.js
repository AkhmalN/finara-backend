"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.budgetsQuerySchema = exports.updateBudgetSchema = exports.createBudgetSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createBudgetSchema = zod_1.default.object({
    categoryId: zod_1.default.string().min(1, "Category ID is required"),
    amount: zod_1.default.coerce.number().positive("Amount must be greater than 0"),
    month: zod_1.default.coerce
        .number()
        .int("Month must be an integer")
        .min(1, "Month must be between 1 and 12")
        .max(12, "Month must be between 1 and 12"),
    year: zod_1.default.coerce
        .number()
        .int("Year must be an integer")
        .min(2000, "Year must be at least 2000"),
});
exports.updateBudgetSchema = exports.createBudgetSchema.partial().refine((value) => Object.keys(value).length > 0, {
    message: "At least one field must be provided",
});
exports.budgetsQuerySchema = zod_1.default.object({
    month: zod_1.default.coerce.number().int().min(1).max(12).optional(),
    year: zod_1.default.coerce.number().int().min(2000).optional(),
    categoryId: zod_1.default.string().min(1).optional(),
});
