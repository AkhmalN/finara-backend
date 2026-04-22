import z from "zod";

export const createBudgetSchema = z.object({
  categoryId: z.string().min(1, "Category ID is required"),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  month: z.coerce
    .number()
    .int("Month must be an integer")
    .min(1, "Month must be between 1 and 12")
    .max(12, "Month must be between 1 and 12"),
  year: z.coerce
    .number()
    .int("Year must be an integer")
    .min(2000, "Year must be at least 2000"),
});

export const updateBudgetSchema = createBudgetSchema
  .partial()
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field must be provided",
  });

export const budgetsQuerySchema = z.object({
  month: z.coerce.number().int().min(1).max(12).optional(),
  year: z.coerce.number().int().min(2000).optional(),
  categoryId: z.string().min(1).optional(),
});

export type CreateBudgetSchema = z.infer<typeof createBudgetSchema>;
export type UpdateBudgetSchema = z.infer<typeof updateBudgetSchema>;
export type BudgetsQuerySchema = z.infer<typeof budgetsQuerySchema>;
