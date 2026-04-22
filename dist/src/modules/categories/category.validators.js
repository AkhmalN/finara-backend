"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesQuerySchema = exports.UpdateCategorySchema = exports.CreateCategorySchema = void 0;
const zod_1 = require("zod");
const CategoryTypeEnum = zod_1.z.enum(["income", "expense"], {
    message: "Type must be either 'income' or 'expense'",
});
exports.CreateCategorySchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, "Category name is required")
        .max(50, "Category name must be at most 50 characters"),
    type: CategoryTypeEnum,
});
exports.UpdateCategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(50).optional(),
    type: CategoryTypeEnum.optional(),
});
exports.CategoriesQuerySchema = zod_1.z.object({
    page: zod_1.z.number().int().positive().optional().default(1),
    limit: zod_1.z.number().int().positive().max(100).optional().default(10),
    type: CategoryTypeEnum.optional(),
});
