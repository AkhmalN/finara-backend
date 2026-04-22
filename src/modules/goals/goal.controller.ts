import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthRequest } from "@/middlewares/auth.middleware";
import GoalService from "@/modules/goals/goal.service";
import {
  createGoalContributionSchema,
  createGoalSchema,
  goalsQuerySchema,
  updateGoalSchema,
} from "@/modules/goals/goal.validators";

const GoalController = {
  getGoals: async (req: AuthRequest, res: Response) => {
    try {
      const query = goalsQuerySchema.parse(req.query);
      const goals = await GoalService.getGoals(req.user?.userId, query);

      res.status(StatusCodes.OK).json({
        success: true,
        message: "Goals retrieved successfully",
        data: goals,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Failed to retrieve goals",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  getGoalById: async (req: AuthRequest, res: Response) => {
    try {
      const goalId =
        typeof req.params.id === "string" ? req.params.id : undefined;
      const goal = await GoalService.getGoalById(req.user?.userId, goalId);

      res.status(StatusCodes.OK).json({
        success: true,
        message: "Goal retrieved successfully",
        data: goal,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Failed to retrieve goal",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  createGoal: async (req: AuthRequest, res: Response) => {
    try {
      const dto = createGoalSchema.parse(req.body);
      const goal = await GoalService.createGoal(req.user?.userId, dto);

      res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Goal created successfully",
        data: goal,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Failed to create goal",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  updateGoal: async (req: AuthRequest, res: Response) => {
    try {
      const goalId =
        typeof req.params.id === "string" ? req.params.id : undefined;
      const dto = updateGoalSchema.parse(req.body);
      const goal = await GoalService.updateGoal(req.user?.userId, goalId, dto);

      res.status(StatusCodes.OK).json({
        success: true,
        message: "Goal updated successfully",
        data: goal,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Failed to update goal",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  deleteGoal: async (req: AuthRequest, res: Response) => {
    try {
      const goalId =
        typeof req.params.id === "string" ? req.params.id : undefined;
      await GoalService.deleteGoal(req.user?.userId, goalId);

      res.status(StatusCodes.OK).json({
        success: true,
        message: "Goal deleted successfully",
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Failed to delete goal",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  getGoalContributions: async (req: AuthRequest, res: Response) => {
    try {
      const goalId =
        typeof req.params.id === "string" ? req.params.id : undefined;
      const contributions = await GoalService.getGoalContributions(
        req.user?.userId,
        goalId,
      );

      res.status(StatusCodes.OK).json({
        success: true,
        message: "Goal contributions retrieved successfully",
        data: contributions,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Failed to retrieve goal contributions",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  addGoalContribution: async (req: AuthRequest, res: Response) => {
    try {
      const goalId =
        typeof req.params.id === "string" ? req.params.id : undefined;
      const dto = createGoalContributionSchema.parse(req.body);
      const result = await GoalService.addGoalContribution(
        req.user?.userId,
        goalId,
        dto,
      );

      res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Goal contribution created successfully",
        data: result,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Failed to create goal contribution",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
};

export default GoalController;
