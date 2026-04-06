import { z } from "zod";

const CategoryTypeEnum = z.enum(["income", "expense"], {
  message: "Type must be either 'income' or 'expense'",
});

export const CreateCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Category name is required")
    .max(50, "Category name must be at most 50 characters"),
  type: CategoryTypeEnum,
});

export const UpdateCategorySchema = z.object({
  name: z.string().min(1).max(50).optional(),
  type: CategoryTypeEnum.optional(),
});

export const CategoriesQuerySchema = z.object({
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(10),
  type: CategoryTypeEnum.optional(),
});
