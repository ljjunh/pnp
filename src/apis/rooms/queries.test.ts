import { notFound } from 'next/navigation';
import { CustomError } from '@/errors';
import mockRoom from '@/mocks/fixtures/room.json';
import { getRoom } from '@/apis/rooms/queries';

// next/navigation의 notFound를 모킹
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

describe('Room Query Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getRoom', () => {
    test('성공적으로 룸 정보를 가져온다', async () => {
      const result = await getRoom(1);

      expect(result).toEqual(mockRoom);
    });

    test('존재하지 않는 방일 경우 notFound를 호출한다.', async () => {
      await expect(getRoom(404)).rejects.toThrow();
      expect(notFound).toHaveBeenCalled();
    });

    test('서버에서 500 에러 발생 시 에러를 던진다', async () => {
      const error = await getRoom(500).catch((e) => e);
      expect(error).toBeInstanceOf(CustomError);
      expect(error.statusCode).toBe(500);
      expect(error.message).toBe('서버 에러가 발생했습니다');
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
});
