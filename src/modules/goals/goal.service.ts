import TransactionRepository from "@/modules/transactions/transaction.repository";
import {
  CreateGoalContributionDTO,
  CreateGoalDTO,
  GoalsQueryDTO,
  UpdateGoalDTO,
} from "@/modules/goals/goal.dto";
import GoalRepository from "@/modules/goals/goal.repository";
import { GoalStatus } from "@/modules/goals/goal.entities";

const ensureUserId = (userId?: string): string => {
  if (!userId) {
    throw new Error("Unauthorized");
  }

  return userId;
};

const resolveGoalStatus = (
  targetAmount: number,
  currentAmount: number,
  requestedStatus?: GoalStatus,
  fallbackStatus: GoalStatus = "active",
): GoalStatus => {
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
  getGoals: async (userId?: string, query: GoalsQueryDTO = {}) => {
    return GoalRepository.findManyByUserId(ensureUserId(userId), query);
  },

  getGoalById: async (userId?: string, goalId?: string) => {
    const resolvedUserId = ensureUserId(userId);

    if (!goalId) {
      throw new Error("Goal ID is required");
    }

    const goal = await GoalRepository.findById(goalId, resolvedUserId);

    if (!goal) {
      throw new Error("Goal not found");
    }

    return goal;
  },

  createGoal: async (userId?: string, dto?: CreateGoalDTO) => {
    const resolvedUserId = ensureUserId(userId);

    if (!dto) {
      throw new Error("Goal data is required");
    }

    const currentAmount = dto.currentAmount ?? 0;

    if (currentAmount > dto.targetAmount && dto.status !== "completed") {
      throw new Error(
        "Current amount cannot exceed target amount unless goal is completed",
      );
    }

    return GoalRepository.insert(resolvedUserId, {
      ...dto,
      id: crypto.randomUUID(),
      status: resolveGoalStatus(dto.targetAmount, currentAmount, dto.status),
    });
  },

  updateGoal: async (userId?: string, goalId?: string, dto?: UpdateGoalDTO) => {
    const resolvedUserId = ensureUserId(userId);

    if (!goalId) {
      throw new Error("Goal ID is required");
    }

    if (!dto) {
      throw new Error("Goal data is required");
    }

    const existingGoal = await GoalRepository.findById(goalId, resolvedUserId);

    if (!existingGoal) {
      throw new Error("Goal not found");
    }

    const nextTargetAmount =
      dto.targetAmount ?? Number(existingGoal.targetAmount);
    const nextCurrentAmount =
      dto.currentAmount ?? Number(existingGoal.currentAmount);

    if (nextCurrentAmount > nextTargetAmount && dto.status !== "completed") {
      throw new Error(
        "Current amount cannot exceed target amount unless goal is completed",
      );
    }

    const updatedGoal = await GoalRepository.update(goalId, resolvedUserId, {
      ...dto,
      status: resolveGoalStatus(
        nextTargetAmount,
        nextCurrentAmount,
        dto.status,
        existingGoal.status,
      ),
    });

    if (!updatedGoal) {
      throw new Error("Failed to update goal");
    }

    return updatedGoal;
  },

  deleteGoal: async (userId?: string, goalId?: string) => {
    const resolvedUserId = ensureUserId(userId);

    if (!goalId) {
      throw new Error("Goal ID is required");
    }

    const deleted = await GoalRepository.delete(goalId, resolvedUserId);

    if (!deleted) {
      throw new Error("Goal not found");
    }

    return deleted;
  },

  getGoalContributions: async (userId?: string, goalId?: string) => {
    const resolvedUserId = ensureUserId(userId);

    if (!goalId) {
      throw new Error("Goal ID is required");
    }

    await GoalService.getGoalById(resolvedUserId, goalId);
    return GoalRepository.findContributionsByGoalId(goalId, resolvedUserId);
  },

  addGoalContribution: async (
    userId?: string,
    goalId?: string,
    dto?: CreateGoalContributionDTO,
  ) => {
    const resolvedUserId = ensureUserId(userId);

    if (!goalId) {
      throw new Error("Goal ID is required");
    }

    if (!dto) {
      throw new Error("Contribution data is required");
    }

    await GoalService.getGoalById(resolvedUserId, goalId);

    if (dto.sourceTransactionId) {
      const transaction = await TransactionRepository.findById(
        dto.sourceTransactionId,
      );

      if (!transaction || transaction.user_id !== resolvedUserId) {
        throw new Error("Source transaction not found");
      }
    }

    return GoalRepository.addContribution(goalId, resolvedUserId, dto);
  },
};

export default GoalService;
