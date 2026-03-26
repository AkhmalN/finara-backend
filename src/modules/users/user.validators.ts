import z from 'zod';

export const userSchema = z.object({
  id: z.uuid(),
  username: z.string().min(3).max(20),
  email: z.email(),
  password_hash: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const createUserSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.email(),
  password: z.string().min(6),
});

export const updateUserSchema = z.object({
  username: z.string().min(3).max(20).optional(),
  email: z.email().optional(),
  password: z.string().min(6).optional(),
});

export const deleteUserSchema = z.object({
  id: z.uuid(),
});
