"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const budget_service_1 = __importDefault(require("@/modules/budgets/budget.service"));
const budget_validators_1 = require("@/modules/budgets/budget.validators");
const BudgetController = {
    getBudgets: async (req, res) => {
        try {
            const query = budget_validators_1.budgetsQuerySchema.parse(req.query);
            const budgets = await budget_service_1.default.getBudgets(req.user?.userId, query);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: "Budgets retrieved successfully",
                data: budgets,
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Failed to retrieve budgets",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
    getBudgetById: async (req, res) => {
        try {
            const budgetId = typeof req.params.id === "string" ? req.params.id : undefined;
            const budget = await budget_service_1.default.getBudgetById(req.user?.userId, budgetId);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: "Budget retrieved successfully",
                data: budget,
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Failed to retrieve budget",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
    createBudget: async (req, res) => {
        try {
            const dto = budget_validators_1.createBudgetSchema.parse(req.body);
            const budget = await budget_service_1.default.createBudget(req.user?.userId, dto);
            res.status(http_status_codes_1.StatusCodes.CREATED).json({
                success: true,
                message: "Budget created successfully",
                data: budget,
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Failed to create budget",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
    updateBudget: async (req, res) => {
        try {
            const budgetId = typeof req.params.id === "string" ? req.params.id : undefined;
            const dto = budget_validators_1.updateBudgetSchema.parse(req.body);
            const budget = await budget_service_1.default.updateBudget(req.user?.userId, budgetId, dto);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: "Budget updated successfully",
                data: budget,
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Failed to update budget",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
    deleteBudget: async (req, res) => {
        try {
            const budgetId = typeof req.params.id === "string" ? req.params.id : undefined;
            await budget_service_1.default.deleteBudget(req.user?.userId, budgetId);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: "Budget deleted successfully",
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Failed to delete budget",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
};
exports.default = BudgetController;
