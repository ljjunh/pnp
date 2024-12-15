import mockRoom from '@/mocks/fixtures/room.json';
import { server } from '@/mocks/node';
import { HttpResponse, http } from 'msw';
import { getRoom } from '@/apis/rooms/queries';

describe('Room API', () => {
  describe('getRoom', () => {
    test('성공적으로 룸 정보를 가져온다', async () => {
      const result = await getRoom(1);

      expect(result).toEqual(mockRoom);
    });

    test('서버에서 500 에러 발생시 에러를 던진다', async () => {
      server.use(
        http.get('/api/rooms/:id', () => {
          return HttpResponse.json(
            {
              success: false,
              status: 500,
              message: '서버 에러가 발생했습니다',
              data: null,
            },
            { status: 500 },
          );
        }),
      );
      await expect(getRoom(1)).rejects.toThrow('서버 에러가 발생했습니다');
    });
  });
});
