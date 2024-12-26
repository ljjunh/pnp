import { z } from 'zod';

export type Refinement = {
  refinement: (data: { checkIn: Date; checkOut: Date }) => boolean;
  options: {
    message: string;
    path: string[];
  };
};

export const latitude = z
  .number({
    required_error: '위도는 필수 입력입니다',
    invalid_type_error: '위도는 숫자여야 합니다',
  })
  .min(-90, {
    message: '위도는 -90에서 90 사이여야 합니다',
  })
  .max(90, {
    message: '위도는 -90에서 90 사이여야 합니다',
  });

export const longitude = z
  .number({
    required_error: '경도는 필수 입력입니다',
    invalid_type_error: '경도는 숫자여야 합니다',
  })
  .min(-180, {
    message: '경도는 -180에서 180 사이여야 합니다',
  })
  .max(180, {
    message: '경도는 -180에서 180 사이여야 합니다',
  });

export const rating = z
  .number({
    required_error: '평점은 필수 입력입니다',
    invalid_type_error: '평점은 숫자여야 합니다',
  })
  .min(1, {
    message: '평점은 1에서 5 사이여야 합니다',
  })
  .max(5, {
    message: '평점은 1에서 5 사이여야 합니다',
  });

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
  .refine((date: Date) => date.getTime() > Date.now(), '오늘 이후 날짜만 예약할 수 있습니다');

export const dateRefinement: Refinement = {
  refinement: (data: { checkIn: Date; checkOut: Date }) =>
    data.checkOut.getTime() > data.checkIn.getTime(),
  options: {
    message: '체크아웃 날짜는 체크인 날짜 이후여야 합니다',
    path: ['checkOut'],
  },
};
