import { z } from 'zod';

export const updateReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  content: z.string().min(1).max(1000),
});

export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;

export const createReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  content: z.string().min(1).max(1000),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;