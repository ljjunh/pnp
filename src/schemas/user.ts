import { z } from 'zod';

export const updateUserSchema = z.object({
  about: z.string().optional(),
  school: z.string().nullable().optional(),
  job: z.string().nullable().optional(), 
  address: z.string().nullable().optional(),
  language: z.string().nullable().optional(),
  birth: z.string().nullable().optional(),
  favoriteSong: z.string().nullable().optional(),
  liked: z.string().nullable().optional(),
  interested: z.string().nullable().optional(),
  noTalented: z.string().nullable().optional(),
  bookTitle: z.string().nullable().optional(),
  hobby: z.string().nullable().optional(),
  pet: z.string().nullable().optional()
});
