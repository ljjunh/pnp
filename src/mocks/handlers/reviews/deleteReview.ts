import { HttpResponse, http } from 'msw';

export const deleteReviewHandler = http.delete(
  `api/rooms/:roomId/reviews/:reviewId`,
  async ({ params }) => {
    const reviewId = Number(params.reviewId);

    // 서버 에러 케이스
    if (reviewId === 500) {
      return HttpResponse.json({
        success: false,
        status: 500,
        message: '서버 에러가 발생했습니다.',
      });
    }

    // 네트워크 에러 케이스
    if (reviewId === 501) {
      return new Response(null, { status: 500 });
    }

    // message 없이 실패하는 케이스
    if (reviewId === 502) {
      return HttpResponse.json({
        success: false,
        status: 500,
      });
    }

    // 성공 케이스
    return HttpResponse.json({
      success: true,
      status: 204,
    });
  },
);
