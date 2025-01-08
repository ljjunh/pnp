import mockRoomAvailable from '@/mocks/fixtures/roomAvailable.json';
import { HttpResponse, http } from 'msw';

export const getRoomAvailableHandler = http.get(
  '/api/rooms/:roomId/available',
  ({ params, request }) => {
    const roomId = Number(params.roomId);
    const url = new URL(request.url);
    const year = url.searchParams.get('year');
    const month = url.searchParams.get('month');

    // 잘못된 파라미터 에러 케이스
    if (!year || !month) {
      return HttpResponse.json({
        success: false,
        status: 400,
        message: '년도와 월은 필수 입력입니다.',
      });
    }

    // 서버 에러 케이스
    if (roomId === 500) {
      return HttpResponse.json({
        success: false,
        status: 500,
        message: '서버 에러가 발생했습니다.',
      });
    }

    // 네트워크 에러 케이스
    if (roomId === 501) {
      return new Response(null, { status: 500 });
    }

    return HttpResponse.json({
      success: true,
      status: 200,
      message: 'OK',
      data: mockRoomAvailable,
    });
  },
);
