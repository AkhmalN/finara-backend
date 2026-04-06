import { Request, Response } from "express";
import CategoryService from "@/modules/categories/category.service";
import {
  CreateCategorySchema,
  UpdateCategorySchema,
} from "@/modules/categories/category.validators";
import { StatusCodes } from "http-status-codes";
import { AuthRequest } from "@/middlewares/auth.middleware";

const CategoryController = {
  getCategoriesByUser: async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;
    try {
      const categories = await CategoryService.getCategoriesByUser(userId);

      res.status(StatusCodes.OK).json({
        success: true,
        message: "Categories retrieved successfully",
        data: categories,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Failed to retrieve categories",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  getCategoryById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const category = await CategoryService.getCategoryById(id as string);

      if (!category) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "Category not found",
        });
      }

      res.status(StatusCodes.OK).json({
        success: true,
        message: "Category retrieved successfully",
        data: category,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Failed to retrieve category",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  createCategory: async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;

    try {
      const dto = CreateCategorySchema.parse(req.body);
      const category = await CategoryService.createCategory(userId, dto);

      res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Category created successfully",
        data: category,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Failed to create category",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  updateCategory: async (req: AuthRequest, res: Response) => {
    try {
      const { id: categoryId } = req.params;
      const dto = UpdateCategorySchema.parse(req.body);

      const category = await CategoryService.updateCategory(
        categoryId as string,
        dto,
      );

      res.status(StatusCodes.OK).json({
        success: true,
        message: "Category updated successfully",
        data: category,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Failed to update category",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  deleteCategory: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await CategoryService.deleteCategory(id as string);

      res.status(StatusCodes.OK).json({
        success: true,
        message: "Category deleted successfully",
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Failed to delete category",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
};

export default CategoryController;
