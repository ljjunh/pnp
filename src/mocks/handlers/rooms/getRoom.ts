import mockRoom from '@/mocks/fixtures/room.json';
import { HttpResponse, http } from 'msw';

export const getRoomHandler = [
  http.get('/api/rooms/:id', ({ params }) => {
    const { id } = params;

    // notFound 에러 케이스
    if (id === '404') {
      return HttpResponse.json({
        success: false,
        status: 404,
        message: '존재하지 않는 방입니다.',
      });
    }

    // 서버 에러 케이스
    if (id === '500') {
      return HttpResponse.json({
        success: false,
        status: 500,
        message: '서버 에러가 발생했습니다',
      });
    }

    // 네트워크 에러 케이스
    if (id === '501') {
      return new Response(null, { status: 500 });
    }

    return HttpResponse.json({
      success: true,
      status: 200,
      message: 'OK',
      data: mockRoom,
    });
  }),
];
