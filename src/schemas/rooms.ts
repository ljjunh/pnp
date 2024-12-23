import { z } from 'zod';
import { PROPERTY } from '@/constants/property';

const roomType = z.enum(['Entire', 'Private']).nullable();

const price = z
  .number({ message: '가격은 숫자여야 합니다.' })
  .min(0, { message: '가격은 0 이상이어야 합니다' })
  .max(10_000_000, { message: '가격은 10,000,000 이하여야 합니다' })
  .optional();

const bedroom = z
  .number({ message: '침실 수는 숫자여야 합니다.' })
  .min(1, { message: '침실 수는 1개 이상 8개 이하여야 합니다' })
  .max(8, { message: '침실 수는 1개 이상 8개 이하여야 합니다' })
  .optional();

const bed = z
  .number({ message: '침대 수는 숫자여야 합니다.' })
  .min(1, { message: '침대 수는 1개 이상 8개 이하여야 합니다' })
  .max(8, { message: '침대 수는 1개 이상 8개 이하여야 합니다' })
  .optional();

const bathroom = z
  .number({ message: '욕실 수는 숫자여야 합니다.' })
  .min(1, { message: '욕실 수는 1개 이상 8개 이하여야 합니다' })
  .max(8, { message: '욕실 수는 1개 이상 8개 이하여야 합니다' })
  .optional();

const amenities = z
  .array(z.string(), { message: '어메니티는 문자열의 배열이어야 합니다' })
  .default([])
  .refine((arr) => arr.every((item) => typeof item === 'string'), {
    message: '어메니티는 문자열의 배열이어야 합니다',
  });

const option = z
  .array(z.string(), { message: '옵션은 문자열의 배열이어야 합니다' })
  .default([])
  .refine((arr) => arr.every((item) => typeof item === 'string'), {
    message: '옵션은 문자열의 배열이어야 합니다',
  });

const language = z
  .array(z.number(), { message: '언어는 숫자의 배열이어야 합니다' })
  .default([])
  .refine((arr) => arr.every((item) => typeof item === 'number'), {
    message: '언어는 숫자의 배열이어야 합니다',
  });

const validPropertyValues = Object.keys(PROPERTY).map(Number);

const property = z
  .number({ message: '건물 유형은 숫자여야 합니다.' })
  .nullable()
  .optional()
  .refine((value) => value === null || value === undefined || validPropertyValues.includes(value), {
    message: '유효하지 않은 건물 유형입니다.',
  });

export const filterSchema = z.object({
  roomType,
  minPrice: price,
  maxPrice: price,
  bedroom,
  bed,
  bathroom,
  amenityArray: amenities,
  option,
  language,
  property,
});

export const priceFilterSchema = z.object({
  roomType,
  property,
});

export const createRoomSchema = z.object({
  roomType: roomType,
  price: price,
  bedRoom: bedroom,
  bed: bed,
  bathroom: bathroom,
});

export type Filter = z.infer<typeof filterSchema>;
export type PriceFilter = z.infer<typeof priceFilterSchema>;
export type CreateRoom = z.infer<typeof createRoomSchema>;
