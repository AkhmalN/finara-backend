import z from "zod";

export const claimLicenseSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const activateLicenseSchema = z.object({
  email: z.string().email("Invalid email address"),
  license_key: z.string().min(1, "License key is required"),
});

export const licensesQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
  search: z.string().optional(),
});
