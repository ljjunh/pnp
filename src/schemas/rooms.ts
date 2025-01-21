import { latitude, longitude } from '@/schemas/type';
import { z } from 'zod';
import { PROPERTY } from '@/constants/property';

const roomType = z.enum(['Entire', 'Private']).optional().nullable();

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

const property = z
  .string({ message: '건물 유형은 숫자여야 합니다.' })
  .nullable()
  .optional()
  .refine((value) => value === null || value === undefined || PROPERTY.includes(value), {
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
  location: z.string().optional(),
  capacity: z.number().optional(),
  checkIn: z
    .string()
    .regex(/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, {
      message: '유효한 YYYY-MM-DD 형식이 아닙니다.',
    })
    .optional(),
  checkOut: z
    .string()
    .regex(/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, {
      message: '유효한 YYYY-MM-DD 형식이 아닙니다.',
    })
    .optional(),
  guest: z
    .number()
    .min(1, { message: '게스트 수는 1명 이상이어야 합니다' })
    .max(16, { message: '게스트 수는 16명 이하여야 합니다' })
    .optional(),
  baby: z
    .number()
    .min(0, { message: '유아 수는 0명 이상이어야 합니다' })
    .max(5, { message: '유아 수는 5명 이하여야 합니다' })
    .optional(),
  pet: z
    .number()
    .min(0, { message: '반려동물 수는 0마리 이상이어야 합니다' })
    .max(5, { message: '반려동물 수는 5마리 이하여야 합니다' })
    .optional(),
});

export const priceFilterSchema = z.object({
  roomType,
  property,
});

export const updateRoomSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: '제목은 3글자 이상이어야 합니다.',
    })
    .max(50, {
      message: '제목은 50글자 이하여야 합니다.',
    })
    .optional(),
  description: z
    .string()
    .min(10, {
      message: '설명은 10글자 이상이어야 합니다.',
    })
    .max(1000, {
      message: '설명은 1000글자 이하여야 합니다.',
    })
    .optional(),
  roomType: roomType,
  latitude: latitude.optional(),
  longitude: longitude.optional(),
  location: z.string().optional(),
  capacity: z.number().optional(),
  propertyType: z.string().optional(),
  price: price,
  bedRoom: bedroom,
  bed: bed,
  bathroom: bathroom,
  amenities: z.array(z.number(), { message: '편의시설 ID 값이 들어가야 합니다.' }).optional(),
  rules: z.array(z.number(), { message: '규칙 ID 값이 들어가야 합니다.' }).optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  checkInType: z.string().optional(),
});

export const SearchSchema = z.object({
  location: z.string().optional(),
  capacity: z.number().optional(),
  checkIn: z
    .string()
    .regex(/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, {
      message: '유효한 YYYY-MM-DD 형식이 아닙니다.',
    })
    .optional(),
  checkOut: z
    .string()
    .regex(/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, {
      message: '유효한 YYYY-MM-DD 형식이 아닙니다.',
    })
    .optional(),
});

export type FilterType = z.infer<typeof filterSchema>;
export type PriceFilter = z.infer<typeof priceFilterSchema>;
export type UpdateRoom = z.infer<typeof updateRoomSchema>;
export type SearchType = z.infer<typeof SearchSchema>;
