import { z } from 'zod';

export const rating = z
  .number({
    required_error: '평점은 필수 입력입니다',
    invalid_type_error: '평점은 숫자여야 합니다',
  })
  .min(1)
  .max(5);

export const orderNumber = z.string().nonempty({
  message: '주문번호는 필수 입력입니다',
});

export const checkIn = z.coerce
  .date({
    required_error: '체크인 날짜는 필수 입력입니다',
    invalid_type_error: '올바른 날짜 형식이 아닙니다',
  })
  .refine((date) => date.getTime() > Date.now(), '오늘 이후 날짜만 예약할 수 있습니다');

export const checkOut = z.coerce
  .date({
    required_error: '체크아웃 날짜는 필수 입력입니다',
    invalid_type_error: '올바른 날짜 형식이 아닙니다',
  })
  .refine((date) => date.getTime() > Date.now(), '오늘 이후 날짜만 예약할 수 있습니다');
