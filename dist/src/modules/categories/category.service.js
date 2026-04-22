"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_repository_1 = __importDefault(require("@/modules/categories/category.repository"));
const CategoryService = {
    getCategoriesByUser: async (userId) => {
        return await category_repository_1.default.findByUserId(userId);
    },
    getCategoryById: async (categoryId) => {
        return await category_repository_1.default.findById(categoryId);
    },
    createCategory: async (userId, dto) => {
        const existing = await category_repository_1.default.findByUserIdAndName(userId, dto.name);
        if (existing) {
            throw new Error(`Category "${dto.name}" already exists`);
        }
        const categoryData = {
            id: crypto.randomUUID(),
            userId,
            name: dto.name,
            type: dto.type,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        return await category_repository_1.default.insert(categoryData);
    },
    updateCategory: async (categoryId, dto) => {
        const existingCategory = await category_repository_1.default.findById(categoryId);
        if (!existingCategory) {
            throw new Error("Category not found");
        }
        const updatedCategory = {
            name: dto.name ?? existingCategory.name,
            type: dto.type ?? existingCategory.type,
            updatedAt: new Date(),
        };
        return await category_repository_1.default.update(categoryId, updatedCategory);
    },
    deleteCategory: async (categoryId) => {
        return await category_repository_1.default.delete(categoryId);
    },
};
exports.default = CategoryService;
