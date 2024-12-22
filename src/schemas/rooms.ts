import { z } from 'zod';

const roomType = z.enum(['Entire', 'Private', 'Shared']).nullable();

const bedroom = z
  .number()
  .min(1, { message: '침실 수는 1개 이상 8개 이하여야 합니다' })
  .max(8, { message: '침실 수는 1개 이상 8개 이하여야 합니다' })
  .optional();

const bed = z
  .number()
  .min(1, { message: '침대 수는 1개 이상 8개 이하여야 합니다' })
  .max(8, { message: '침대 수는 1개 이상 8개 이하여야 합니다' })
  .optional();

const bathroom = z
  .number()
  .min(1, { message: '욕실 수는 1개 이상 8개 이하여야 합니다' })
  .max(8, { message: '욕실 수는 1개 이상 8개 이하여야 합니다' })
  .optional();

const amenities = z.array(z.string(), { message: '어메니티는 문자열의 배열이어야 합니다' });

const option = z.array(z.string(), { message: '옵션은 문자열의 배열이어야 합니다' });

const language = z.array(z.number(), { message: '언어는 숫자의 배열이어야 합니다' });

const property = z.string({ message: '건물 유형은 문장이어야 합니다.' }).nullable().optional();

export const filterSchema = z.object({
  roomType,
  bedroom,
  bed,
  bathroom,
  amenityArray: amenities,
  option,
  language,
  property,
});

export type Filter = z.infer<typeof filterSchema>;
