"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_service_1 = __importDefault(require("@/modules/categories/category.service"));
const category_validators_1 = require("@/modules/categories/category.validators");
const http_status_codes_1 = require("http-status-codes");
const CategoryController = {
    getCategoriesByUser: async (req, res) => {
        const userId = req.user?.userId;
        try {
            const categories = await category_service_1.default.getCategoriesByUser(userId);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: "Categories retrieved successfully",
                data: categories,
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Failed to retrieve categories",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
    getCategoryById: async (req, res) => {
        try {
            const { id } = req.params;
            const category = await category_service_1.default.getCategoryById(id);
            if (!category) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    success: false,
                    message: "Category not found",
                });
            }
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: "Category retrieved successfully",
                data: category,
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Failed to retrieve category",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
    createCategory: async (req, res) => {
        const userId = req.user?.userId;
        try {
            const dto = category_validators_1.CreateCategorySchema.parse(req.body);
            const category = await category_service_1.default.createCategory(userId, dto);
            res.status(http_status_codes_1.StatusCodes.CREATED).json({
                success: true,
                message: "Category created successfully",
                data: category,
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Failed to create category",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { id: categoryId } = req.params;
            const dto = category_validators_1.UpdateCategorySchema.parse(req.body);
            const category = await category_service_1.default.updateCategory(categoryId, dto);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: "Category updated successfully",
                data: category,
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Failed to update category",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const { id } = req.params;
            await category_service_1.default.deleteCategory(id);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: "Category deleted successfully",
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Failed to delete category",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
};
exports.default = CategoryController;
