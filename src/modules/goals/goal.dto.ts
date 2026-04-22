import {
  GoalCategory,
  GoalPriority,
  GoalStatus,
} from "@/modules/goals/goal.entities";

export interface CreateGoalDTO {
  name: string;
  targetAmount: number;
  currentAmount?: number;
  category: GoalCategory;
  priority?: GoalPriority;
  status?: GoalStatus;
  deadline?: Date | null;
}

export interface UpdateGoalDTO {
  name?: string;
  targetAmount?: number;
  currentAmount?: number;
  category?: GoalCategory;
  priority?: GoalPriority;
  status?: GoalStatus;
  deadline?: Date | null;
}

export interface GoalsQueryDTO {
  status?: GoalStatus;
  category?: GoalCategory;
  priority?: GoalPriority;
}

export interface CreateGoalContributionDTO {
  amount: number;
  date: Date;
  sourceTransactionId?: string;
}
