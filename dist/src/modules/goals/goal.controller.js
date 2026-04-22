"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const goal_service_1 = __importDefault(require("@/modules/goals/goal.service"));
const goal_validators_1 = require("@/modules/goals/goal.validators");
const GoalController = {
    getGoals: async (req, res) => {
        try {
            const query = goal_validators_1.goalsQuerySchema.parse(req.query);
            const goals = await goal_service_1.default.getGoals(req.user?.userId, query);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: "Goals retrieved successfully",
                data: goals,
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Failed to retrieve goals",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
    getGoalById: async (req, res) => {
        try {
            const goalId = typeof req.params.id === "string" ? req.params.id : undefined;
            const goal = await goal_service_1.default.getGoalById(req.user?.userId, goalId);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: "Goal retrieved successfully",
                data: goal,
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Failed to retrieve goal",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
    createGoal: async (req, res) => {
        try {
            const dto = goal_validators_1.createGoalSchema.parse(req.body);
            const goal = await goal_service_1.default.createGoal(req.user?.userId, dto);
            res.status(http_status_codes_1.StatusCodes.CREATED).json({
                success: true,
                message: "Goal created successfully",
                data: goal,
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Failed to create goal",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
    updateGoal: async (req, res) => {
        try {
            const goalId = typeof req.params.id === "string" ? req.params.id : undefined;
            const dto = goal_validators_1.updateGoalSchema.parse(req.body);
            const goal = await goal_service_1.default.updateGoal(req.user?.userId, goalId, dto);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: "Goal updated successfully",
                data: goal,
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Failed to update goal",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
    deleteGoal: async (req, res) => {
        try {
            const goalId = typeof req.params.id === "string" ? req.params.id : undefined;
            await goal_service_1.default.deleteGoal(req.user?.userId, goalId);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: "Goal deleted successfully",
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Failed to delete goal",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
    getGoalContributions: async (req, res) => {
        try {
            const goalId = typeof req.params.id === "string" ? req.params.id : undefined;
            const contributions = await goal_service_1.default.getGoalContributions(req.user?.userId, goalId);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: "Goal contributions retrieved successfully",
                data: contributions,
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Failed to retrieve goal contributions",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
    addGoalContribution: async (req, res) => {
        try {
            const goalId = typeof req.params.id === "string" ? req.params.id : undefined;
            const dto = goal_validators_1.createGoalContributionSchema.parse(req.body);
            const result = await goal_service_1.default.addGoalContribution(req.user?.userId, goalId, dto);
            res.status(http_status_codes_1.StatusCodes.CREATED).json({
                success: true,
                message: "Goal contribution created successfully",
                data: result,
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Failed to create goal contribution",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
};
exports.default = GoalController;
