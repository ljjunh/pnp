import mockRoom from '@/mocks/fixtures/room.json';
import { getRoom } from '@/apis/rooms/queries';

describe('Room API', () => {
  describe('getRoom', () => {
    test('성공적으로 룸 정보를 가져온다', async () => {
      const result = await getRoom(1);

      expect(result).toEqual(mockRoom);
    });

    test('존재하지 않는 방일 경우 404 에러를 던진다', async () => {
      await expect(getRoom(999)).rejects.toThrow('존재하지 않는 방입니다.');
    });

    test('서버에서 500 에러 발생시 에러를 던진다', async () => {
      await expect(getRoom(888)).rejects.toThrow('서버 에러가 발생했습니다');
    });
  });
});
