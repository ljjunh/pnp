import { CustomError } from '@/errors';
import { mockReservation } from '@mocks/reservation';
import { getReservation } from '@/apis/reservation/queries';

// next/navigation의 notFound를 모킹
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

describe('Reservation Query', () => {
  describe('getReservation', () => {
    test('성공적으로 예약 정보를 가져온다', async () => {
      const result = await getReservation('1');
      // 날짜 문자열을 Date 객체로 변환
      const expectedReservation = JSON.parse(JSON.stringify(mockReservation));
      expect(result).toEqual(expectedReservation);
    });

    test('존재하지 않는 예약일 경우 notFound를 호출한다', async () => {
      const { notFound } = require('next/navigation');
      await expect(getReservation('404')).rejects.toThrow();
      expect(notFound).toHaveBeenCalled();
    });

    test('서버에서 500 에러 발생 시 에러를 던진다', async () => {
      const error = await getReservation('500').catch((e) => e);
      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe('서버 에러가 발생했습니다.');
      expect(error.statusCode).toBe(500);
    });

    test('네트워크 에러 발생 시 500 CustomError를 던진다', async () => {
      const error = await getReservation('501').catch((e) => e);
      expect(error).toBeInstanceOf(CustomError);
      expect(error.statusCode).toBe(500);
      expect(error.message).toBe(
        '서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      );
    });
  });
});
