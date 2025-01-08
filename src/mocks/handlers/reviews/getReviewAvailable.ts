import { HttpResponse, http } from 'msw';

export const getReviewAvailableHandler = http.get(
  `/api/rooms/:roomId/reviews/available`,
  ({ params }) => {
    const roomId = Number(params.roomId);

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

    // 잘못된 요청값 케이스
    if (roomId === 400) {
      return HttpResponse.json({
        success: false,
        status: 400,
        data: null,
        message: '유효하지 않은 ID 형식입니다.',
      });
    }

    // 인증 에러 케이스 : 이 요청에서는 성공과 함께 빈배열 반환
    if (roomId === 401) {
      return HttpResponse.json({
        success: true,
        status: 200,
        data: [],
        message: 'OK',
      });
    }

    // 권한이 있는 케이스
    if (roomId === 1) {
      return HttpResponse.json({
        success: true,
        status: 200,
        data: ['1111-1111-1111'],
        message: 'OK',
      });
    }

    // 권한이 없는 케이스
    if (roomId === 2) {
      return HttpResponse.json({
        success: true,
        status: 200,
        data: [],
        message: 'OK',
      });
    }
  },
);
