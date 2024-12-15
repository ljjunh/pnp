import { schemaType } from '@/schemas';
import { z } from 'zod';

export const updateReviewSchema = z.object({
  rating: schemaType.rating,
  content: z.string().min(1).max(1000),
});

export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;

export const createReviewSchema = z.object({
  rating: schemaType.rating,
  content: z.string().min(1).max(1000),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
