"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_repository_1 = __importDefault(require("@/modules/transactions/transaction.repository"));
const goal_repository_1 = __importDefault(require("@/modules/goals/goal.repository"));
const ensureUserId = (userId) => {
    if (!userId) {
        throw new Error("Unauthorized");
    }
    return userId;
};
const resolveGoalStatus = (targetAmount, currentAmount, requestedStatus, fallbackStatus = "active") => {
    if (requestedStatus) {
        return requestedStatus;
    }
    if (currentAmount >= targetAmount) {
        return "completed";
    }
    if (fallbackStatus === "completed") {
        return "active";
    }
    return fallbackStatus;
};
const GoalService = {
    getGoals: async (userId, query = {}) => {
        return goal_repository_1.default.findManyByUserId(ensureUserId(userId), query);
    },
    getGoalById: async (userId, goalId) => {
        const resolvedUserId = ensureUserId(userId);
        if (!goalId) {
            throw new Error("Goal ID is required");
        }
        const goal = await goal_repository_1.default.findById(goalId, resolvedUserId);
        if (!goal) {
            throw new Error("Goal not found");
        }
        return goal;
    },
    createGoal: async (userId, dto) => {
        const resolvedUserId = ensureUserId(userId);
        if (!dto) {
            throw new Error("Goal data is required");
        }
        const currentAmount = dto.currentAmount ?? 0;
        if (currentAmount > dto.targetAmount && dto.status !== "completed") {
            throw new Error("Current amount cannot exceed target amount unless goal is completed");
        }
        return goal_repository_1.default.insert(resolvedUserId, {
            ...dto,
            id: crypto.randomUUID(),
            status: resolveGoalStatus(dto.targetAmount, currentAmount, dto.status),
        });
    },
    updateGoal: async (userId, goalId, dto) => {
        const resolvedUserId = ensureUserId(userId);
        if (!goalId) {
            throw new Error("Goal ID is required");
        }
        if (!dto) {
            throw new Error("Goal data is required");
        }
        const existingGoal = await goal_repository_1.default.findById(goalId, resolvedUserId);
        if (!existingGoal) {
            throw new Error("Goal not found");
        }
        const nextTargetAmount = dto.targetAmount ?? Number(existingGoal.targetAmount);
        const nextCurrentAmount = dto.currentAmount ?? Number(existingGoal.currentAmount);
        if (nextCurrentAmount > nextTargetAmount && dto.status !== "completed") {
            throw new Error("Current amount cannot exceed target amount unless goal is completed");
        }
        const updatedGoal = await goal_repository_1.default.update(goalId, resolvedUserId, {
            ...dto,
            status: resolveGoalStatus(nextTargetAmount, nextCurrentAmount, dto.status, existingGoal.status),
        });
        if (!updatedGoal) {
            throw new Error("Failed to update goal");
        }
        return updatedGoal;
    },
    deleteGoal: async (userId, goalId) => {
        const resolvedUserId = ensureUserId(userId);
        if (!goalId) {
            throw new Error("Goal ID is required");
        }
        const deleted = await goal_repository_1.default.delete(goalId, resolvedUserId);
        if (!deleted) {
            throw new Error("Goal not found");
        }
        return deleted;
    },
    getGoalContributions: async (userId, goalId) => {
        const resolvedUserId = ensureUserId(userId);
        if (!goalId) {
            throw new Error("Goal ID is required");
        }
        await GoalService.getGoalById(resolvedUserId, goalId);
        return goal_repository_1.default.findContributionsByGoalId(goalId, resolvedUserId);
    },
    addGoalContribution: async (userId, goalId, dto) => {
        const resolvedUserId = ensureUserId(userId);
        if (!goalId) {
            throw new Error("Goal ID is required");
        }
        if (!dto) {
            throw new Error("Contribution data is required");
        }
        await GoalService.getGoalById(resolvedUserId, goalId);
        if (dto.sourceTransactionId) {
            const transaction = await transaction_repository_1.default.findById(dto.sourceTransactionId);
            if (!transaction || transaction.user_id !== resolvedUserId) {
                throw new Error("Source transaction not found");
            }
        }
        return goal_repository_1.default.addContribution(goalId, resolvedUserId, dto);
    },
};
exports.default = GoalService;
