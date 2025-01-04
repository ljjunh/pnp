import { notFound } from 'next/navigation';
import { CustomError } from '@/errors';
import mockRoom from '@/mocks/fixtures/room.json';
import mockRoomAvailable from '@/mocks/fixtures/roomAvailable.json';
import { getRoom, getRoomAvailable, getRoomAvailableClient, getScrap } from '@/apis/rooms/queries';

// next/navigation의 notFound를 모킹
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

describe('Room Query Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getRoom', () => {
    test('성공적으로 숙소 정보를 가져온다', async () => {
      const result = await getRoom(1);

      expect(result).toEqual(mockRoom);
    });

    test('존재하지 않는 방일 경우 notFound를 호출한다', async () => {
      await expect(getRoom(404)).rejects.toThrow();
      expect(notFound).toHaveBeenCalled();
    });

    test('서버에서 500 에러 발생 시 에러를 던진다', async () => {
      const error = await getRoom(500).catch((e) => e);
      expect(error).toBeInstanceOf(CustomError);
      expect(error.statusCode).toBe(500);
      expect(error.message).toBe('서버 에러가 발생했습니다.');
    });

    test('네트워크 에러 발생 시 500 CustomError를 던진다', async () => {
      const error = await getRoom(501).catch((e) => e);
      expect(error).toBeInstanceOf(CustomError);
      expect(error.statusCode).toBe(500);
      expect(error.message).toBe(
        '서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      );
    });
  });

  describe('getScrap', () => {
    test('스크랩된 경우 true를 반환한다', async () => {
      const result = await getScrap(1);
      expect(result).toBe(true);
    });

    test('스크랩되지 않은 경우 false를 반환한다', async () => {
      const result = await getScrap(2);
      expect(result).toBe(false);
    });

    test('서버에서 500 에러 발생 시 false를 반환한다', async () => {
      const result = await getScrap(500);
      expect(result).toBe(false);
    });

    test('네트워크 에러 발생 시 false를 반환한다', async () => {
      const result = await getScrap(501);
      expect(result).toBe(false);
    });
  });

  describe('getRoomAvailable', () => {
    test('성공적으로 예약 가능한 날짜 배열을 반환한다', async () => {
      const result = await getRoomAvailable(1);
      expect(result).toStrictEqual(mockRoomAvailable);
    });

    test('서버에서 500 에러 발생 시 에러를 던진다', async () => {
      const error = await getRoomAvailable(500).catch((e) => e);
      expect(error).toBeInstanceOf(CustomError);
      expect(error.statusCode).toBe(500);
      expect(error.message).toBe('서버 에러가 발생했습니다.');
    });

    test('네트워크 에러 발생 시 500 CustomError를 던진다', async () => {
      const error = await getRoomAvailable(501).catch((e) => e);
      expect(error).toBeInstanceOf(CustomError);
      expect(error.statusCode).toBe(500);
      expect(error.message).toBe(
        '서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      );
    });
  });

  describe('getRoomAvailableClient', () => {
    test('성공적으로 예약 가능한 날짜 배열을 반환한다', async () => {
      const result = await getRoomAvailableClient(1, 2025, 1);
      expect(result).toStrictEqual(mockRoomAvailable);
    });

    test('서버에서 500 에러 발생 시 에러를 던진다', async () => {
      const error = await getRoomAvailableClient(500, 2025, 1).catch((e) => e);
      expect(error).toBeInstanceOf(CustomError);
      expect(error.statusCode).toBe(500);
      expect(error.message).toBe('서버 에러가 발생했습니다.');
    });

    test('네트워크 에러 발생 시 500 CustomError를 던진다', async () => {
      const error = await getRoomAvailableClient(501, 2025, 1).catch((e) => e);
      expect(error).toBeInstanceOf(CustomError);
      expect(error.statusCode).toBe(500);
      expect(error.message).toBe(
        '서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      );
    });
  });
});
