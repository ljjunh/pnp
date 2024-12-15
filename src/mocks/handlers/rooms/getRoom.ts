import mockRoom from '@/mocks/fixtures/room.json';
import { HttpResponse, http } from 'msw';

export const getRoomHandlers = [
  http.get('/api/rooms/:id', ({ params }) => {
    const { id } = params;

    if (id === '999') {
      // 테스트용 에러 케이스
      return HttpResponse.json({
        success: false,
        status: 404,
        message: '존재하지 않는 방입니다.',
      });
    }

    if (id === '888') {
      // 500 에러 케이스 추가
      return HttpResponse.json({
        success: false,
        status: 500,
        message: '서버 에러가 발생했습니다',
      });
    }

    return HttpResponse.json({
      success: true,
      status: 200,
      message: 'OK',
      data: mockRoom,
    });
  }),
];
