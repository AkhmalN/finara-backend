import CategoryRepository from "@/modules/categories/category.repository";
import {
  BudgetsQueryDTO,
  CreateBudgetDTO,
  UpdateBudgetDTO,
} from "@/modules/budgets/budget.dto";
import BudgetRepository from "@/modules/budgets/budget.repository";

const ensureUserId = (userId?: string): string => {
  if (!userId) {
    throw new Error("Unauthorized");
  }

  return userId;
};

const validateBudgetCategory = async (userId: string, categoryId: string) => {
  const category = await CategoryRepository.findById(categoryId);

  if (!category || category.userId !== userId) {
    throw new Error("Category not found");
  }

  if (category.type !== "expense") {
    throw new Error("Budget can only be created for expense categories");
  }

  return category;
};

const BudgetService = {
  getBudgets: async (userId?: string, query: BudgetsQueryDTO = {}) => {
    return BudgetRepository.findManyByUserId(ensureUserId(userId), query);
  },

  getBudgetById: async (userId?: string, budgetId?: string) => {
    const resolvedUserId = ensureUserId(userId);

    if (!budgetId) {
      throw new Error("Budget ID is required");
    }

    const budget = await BudgetRepository.findById(budgetId, resolvedUserId);

    if (!budget) {
      throw new Error("Budget not found");
    }

    return budget;
  },

  createBudget: async (userId?: string, dto?: CreateBudgetDTO) => {
    const resolvedUserId = ensureUserId(userId);

    if (!dto) {
      throw new Error("Budget data is required");
    }

    await validateBudgetCategory(resolvedUserId, dto.categoryId);

    const existingBudget = await BudgetRepository.findByUniqueKey(
      resolvedUserId,
      dto.categoryId,
      dto.month,
      dto.year,
    );

    if (existingBudget) {
      throw new Error("Budget for this category and period already exists");
    }

    const spent = await BudgetRepository.calculateSpent(
      resolvedUserId,
      dto.categoryId,
      dto.month,
      dto.year,
    );

    return BudgetRepository.insert(resolvedUserId, {
      id: crypto.randomUUID(),
      ...dto,
      spent,
    });
  },

  updateBudget: async (
    userId?: string,
    budgetId?: string,
    dto?: UpdateBudgetDTO,
  ) => {
    const resolvedUserId = ensureUserId(userId);

    if (!budgetId) {
      throw new Error("Budget ID is required");
    }

    if (!dto) {
      throw new Error("Budget data is required");
    }

    const existingBudget = await BudgetRepository.findById(
      budgetId,
      resolvedUserId,
    );

    if (!existingBudget) {
      throw new Error("Budget not found");
    }

    const nextCategoryId = dto.categoryId ?? existingBudget.categoryId;
    const nextMonth = dto.month ?? existingBudget.month;
    const nextYear = dto.year ?? existingBudget.year;

    await validateBudgetCategory(resolvedUserId, nextCategoryId);

    const duplicateBudget = await BudgetRepository.findByUniqueKey(
      resolvedUserId,
      nextCategoryId,
      nextMonth,
      nextYear,
      budgetId,
    );

    if (duplicateBudget) {
      throw new Error("Budget for this category and period already exists");
    }

    const spent = await BudgetRepository.calculateSpent(
      resolvedUserId,
      nextCategoryId,
      nextMonth,
      nextYear,
    );

    const updatedBudget = await BudgetRepository.update(
      budgetId,
      resolvedUserId,
      {
        ...dto,
        spent,
      },
    );

    if (!updatedBudget) {
      throw new Error("Failed to update budget");
    }

    return updatedBudget;
  },

  deleteBudget: async (userId?: string, budgetId?: string) => {
    const resolvedUserId = ensureUserId(userId);

    if (!budgetId) {
      throw new Error("Budget ID is required");
    }

    const deleted = await BudgetRepository.delete(budgetId, resolvedUserId);

    if (!deleted) {
      throw new Error("Budget not found");
    }

    return deleted;
  },
};

export default BudgetService;
