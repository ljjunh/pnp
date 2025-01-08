import { HttpResponse, http } from 'msw';

export const getScrapHandler = http.get(`/api/rooms/:roomId/scrap`, ({ params }) => {
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

  // 스크랩 된 상태
  if (roomId === 1) {
    return HttpResponse.json({
      success: true,
      status: 200,
      message: 'OK',
      data: true,
    });
  }

  // 스크랩되지 않은 상태
  if (roomId === 2) {
    return HttpResponse.json({
      success: true,
      status: 200,
      message: 'OK',
      data: false,
    });
  }
});
