import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthRequest } from "@/middlewares/auth.middleware";
import BudgetService from "@/modules/budgets/budget.service";
import {
  budgetsQuerySchema,
  createBudgetSchema,
  updateBudgetSchema,
} from "@/modules/budgets/budget.validators";

const BudgetController = {
  getBudgets: async (req: AuthRequest, res: Response) => {
    try {
      const query = budgetsQuerySchema.parse(req.query);
      const budgets = await BudgetService.getBudgets(req.user?.userId, query);

      res.status(StatusCodes.OK).json({
        success: true,
        message: "Budgets retrieved successfully",
        data: budgets,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Failed to retrieve budgets",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  getBudgetById: async (req: AuthRequest, res: Response) => {
    try {
      const budgetId =
        typeof req.params.id === "string" ? req.params.id : undefined;
      const budget = await BudgetService.getBudgetById(
        req.user?.userId,
        budgetId,
      );

      res.status(StatusCodes.OK).json({
        success: true,
        message: "Budget retrieved successfully",
        data: budget,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Failed to retrieve budget",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  createBudget: async (req: AuthRequest, res: Response) => {
    try {
      const dto = createBudgetSchema.parse(req.body);
      const budget = await BudgetService.createBudget(req.user?.userId, dto);

      res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Budget created successfully",
        data: budget,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Failed to create budget",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  updateBudget: async (req: AuthRequest, res: Response) => {
    try {
      const budgetId =
        typeof req.params.id === "string" ? req.params.id : undefined;
      const dto = updateBudgetSchema.parse(req.body);
      const budget = await BudgetService.updateBudget(
        req.user?.userId,
        budgetId,
        dto,
      );

      res.status(StatusCodes.OK).json({
        success: true,
        message: "Budget updated successfully",
        data: budget,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Failed to update budget",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  deleteBudget: async (req: AuthRequest, res: Response) => {
    try {
      const budgetId =
        typeof req.params.id === "string" ? req.params.id : undefined;
      await BudgetService.deleteBudget(req.user?.userId, budgetId);

      res.status(StatusCodes.OK).json({
        success: true,
        message: "Budget deleted successfully",
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Failed to delete budget",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
};

export default BudgetController;
