import { z } from 'zod';

export const updateUserSchema = z.object({  
  about: z.string().max(1000).optional(),  
  school: z.string().max(100).nullable().optional(),  
  job: z.string().max(100).nullable().optional(),  
  address: z.string().max(200).nullable().optional(),  
  language: z.string().max(50).nullable().optional(),  
  birth: z.string()  
    .regex(/^\d{4}-\d{2}-\d{2}$/, '올바른 날짜 형식이 아닙니다 (YYYY-MM-DD)')  
    .nullable()  
    .optional(),  
  favoriteSong: z.string().max(200).nullable().optional(),  
  liked: z.string().max(500).nullable().optional(),  
  interested: z.string().max(500).nullable().optional(),  
  noTalented: z.string().max(500).nullable().optional(),  
  bookTitle: z.string().max(200).nullable().optional(),  
  hobby: z.string().max(200).nullable().optional(),  
  pet: z.string().max(200).nullable().optional()  
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
