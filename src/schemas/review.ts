import { schemaType } from '@/schemas';
import { z } from 'zod';

const contentType = z
  .string({
    required_error: '내용은 필수 입력입니다',
  })
  .min(1, {
    message: '내용은 최소 1자 이상이어야 합니다',
  })
  .max(1000);

export const updateReviewSchema = z.object({
  accuracy: schemaType.rating,
  checkIn: schemaType.rating,
  cleanliness: schemaType.rating,
  communication: schemaType.rating,
  location: schemaType.rating,
  value: schemaType.rating,
  content: contentType,
});

export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;

export const createReviewSchema = z.object({
  accuracy: schemaType.rating,
  checkIn: schemaType.rating,
  cleanliness: schemaType.rating,
  communication: schemaType.rating,
  location: schemaType.rating,
  value: schemaType.rating,
  content: contentType,
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
