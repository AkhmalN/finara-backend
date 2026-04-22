import z from "zod";
import {
  GOAL_CATEGORIES,
  GOAL_PRIORITIES,
  GOAL_STATUSES,
} from "@/modules/goals/goal.entities";

export const createGoalSchema = z.object({
  name: z.string().min(1, "Goal name is required"),
  targetAmount: z.coerce
    .number()
    .positive("Target amount must be greater than 0"),
  currentAmount: z.coerce
    .number()
    .min(0, "Current amount cannot be negative")
    .optional(),
  category: z.enum(GOAL_CATEGORIES),
  priority: z.enum(GOAL_PRIORITIES).optional(),
  status: z.enum(GOAL_STATUSES).optional(),
  deadline: z.coerce.date().optional().nullable(),
});

export const updateGoalSchema = createGoalSchema
  .partial()
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field must be provided",
  });

export const goalsQuerySchema = z.object({
  status: z.enum(GOAL_STATUSES).optional(),
  category: z.enum(GOAL_CATEGORIES).optional(),
  priority: z.enum(GOAL_PRIORITIES).optional(),
});

export const createGoalContributionSchema = z.object({
  amount: z.coerce
    .number()
    .positive("Contribution amount must be greater than 0"),
  date: z.coerce.date(),
  sourceTransactionId: z.string().min(1).optional(),
});

export type CreateGoalSchema = z.infer<typeof createGoalSchema>;
export type UpdateGoalSchema = z.infer<typeof updateGoalSchema>;
export type GoalsQuerySchema = z.infer<typeof goalsQuerySchema>;
export type CreateGoalContributionSchema = z.infer<
  typeof createGoalContributionSchema
>;
