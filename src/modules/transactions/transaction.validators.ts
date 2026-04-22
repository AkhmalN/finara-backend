import z from "zod";

export const createTransactionSchema = z.object({
  category_id: z.string().min(1, "Category ID is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  description: z.string().optional(),
  date: z.string().datetime("Invalid date format"),
  notes: z.string().optional(),
  receipt: z.string().optional(),
});

export const updateTransactionSchema = z.object({
  category_id: z.string().min(1).optional(),
  amount: z.number().positive().optional(),
  description: z.string().optional(),
  date: z.string().datetime().optional(),
  notes: z.string().optional(),
  receipt: z.string().optional(),
});

export const getTransactionsQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
  category_id: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
});
