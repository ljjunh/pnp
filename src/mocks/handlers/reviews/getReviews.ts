import mockReviews from '@/mocks/fixtures/reviews.json';
import { HttpResponse, http } from 'msw';

export const getReviewsHandlers = [
  http.get('/api/rooms/:roomId/reviews', ({ params }) => {
    const { roomId } = params;

    // 테스트용 에러 케이스
    if (roomId === '999') {
      return HttpResponse.json({
        success: false,
        status: 404,
        message: '존재하지 않는 방입니다.',
      });
    }

    // 서버 에러 케이스
    if (roomId === '888') {
      return HttpResponse.json({
        success: false,
        status: 500,
        message: '서버 에러가 발생했습니다.',
      });
    }

    return HttpResponse.json({
      success: true,
      status: 200,
      message: 'OK',
      data: mockReviews,
    });
  }),
];
