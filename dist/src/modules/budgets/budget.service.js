"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_repository_1 = __importDefault(require("@/modules/categories/category.repository"));
const budget_repository_1 = __importDefault(require("@/modules/budgets/budget.repository"));
const ensureUserId = (userId) => {
    if (!userId) {
        throw new Error("Unauthorized");
    }
    return userId;
};
const validateBudgetCategory = async (userId, categoryId) => {
    const category = await category_repository_1.default.findById(categoryId);
    if (!category || category.userId !== userId) {
        throw new Error("Category not found");
    }
    if (category.type !== "expense") {
        throw new Error("Budget can only be created for expense categories");
    }
    return category;
};
const BudgetService = {
    getBudgets: async (userId, query = {}) => {
        return budget_repository_1.default.findManyByUserId(ensureUserId(userId), query);
    },
    getBudgetById: async (userId, budgetId) => {
        const resolvedUserId = ensureUserId(userId);
        if (!budgetId) {
            throw new Error("Budget ID is required");
        }
        const budget = await budget_repository_1.default.findById(budgetId, resolvedUserId);
        if (!budget) {
            throw new Error("Budget not found");
        }
        return budget;
    },
    createBudget: async (userId, dto) => {
        const resolvedUserId = ensureUserId(userId);
        if (!dto) {
            throw new Error("Budget data is required");
        }
        await validateBudgetCategory(resolvedUserId, dto.categoryId);
        const existingBudget = await budget_repository_1.default.findByUniqueKey(resolvedUserId, dto.categoryId, dto.month, dto.year);
        if (existingBudget) {
            throw new Error("Budget for this category and period already exists");
        }
        const spent = await budget_repository_1.default.calculateSpent(resolvedUserId, dto.categoryId, dto.month, dto.year);
        return budget_repository_1.default.insert(resolvedUserId, {
            id: crypto.randomUUID(),
            ...dto,
            spent,
        });
    },
    updateBudget: async (userId, budgetId, dto) => {
        const resolvedUserId = ensureUserId(userId);
        if (!budgetId) {
            throw new Error("Budget ID is required");
        }
        if (!dto) {
            throw new Error("Budget data is required");
        }
        const existingBudget = await budget_repository_1.default.findById(budgetId, resolvedUserId);
        if (!existingBudget) {
            throw new Error("Budget not found");
        }
        const nextCategoryId = dto.categoryId ?? existingBudget.categoryId;
        const nextMonth = dto.month ?? existingBudget.month;
        const nextYear = dto.year ?? existingBudget.year;
        await validateBudgetCategory(resolvedUserId, nextCategoryId);
        const duplicateBudget = await budget_repository_1.default.findByUniqueKey(resolvedUserId, nextCategoryId, nextMonth, nextYear, budgetId);
        if (duplicateBudget) {
            throw new Error("Budget for this category and period already exists");
        }
        const spent = await budget_repository_1.default.calculateSpent(resolvedUserId, nextCategoryId, nextMonth, nextYear);
        const updatedBudget = await budget_repository_1.default.update(budgetId, resolvedUserId, {
            ...dto,
            spent,
        });
        if (!updatedBudget) {
            throw new Error("Failed to update budget");
        }
        return updatedBudget;
    },
    deleteBudget: async (userId, budgetId) => {
        const resolvedUserId = ensureUserId(userId);
        if (!budgetId) {
            throw new Error("Budget ID is required");
        }
        const deleted = await budget_repository_1.default.delete(budgetId, resolvedUserId);
        if (!deleted) {
            throw new Error("Budget not found");
        }
        return deleted;
    },
};
exports.default = BudgetService;
