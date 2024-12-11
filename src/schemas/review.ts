import { z } from 'zod';

export const updateReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  content: z.string().min(1).max(1000),
});

export const createReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  content: z.string().min(1).max(1000),
});
