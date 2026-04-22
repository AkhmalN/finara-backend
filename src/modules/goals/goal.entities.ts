export const GOAL_CATEGORIES = [
  "savings",
  "investment",
  "education",
  "travel",
  "other",
] as const;

export const GOAL_PRIORITIES = ["low", "medium", "high"] as const;

export const GOAL_STATUSES = ["active", "completed", "abandoned"] as const;

export type GoalCategory = (typeof GOAL_CATEGORIES)[number];
export type GoalPriority = (typeof GOAL_PRIORITIES)[number];
export type GoalStatus = (typeof GOAL_STATUSES)[number];

export interface GoalEntity {
  id: string;
  userId: string;
  name: string;
  targetAmount: string;
  currentAmount: string;
  category: GoalCategory;
  priority: GoalPriority;
  status: GoalStatus;
  deadline: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface GoalWithDetailsEntity extends GoalEntity {
  remainingAmount: string;
  progressPercentage: number;
  contributionCount: number;
  lastContributionDate: Date | null;
}

export interface GoalContributionEntity {
  id: string;
  userId: string;
  goalId: string;
  amount: string;
  date: Date;
  sourceTransactionId: string | null;
  createdAt: Date;
}
