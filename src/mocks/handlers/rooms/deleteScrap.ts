import { HttpResponse, http } from 'msw';

export const deleteScrapHandler = http.delete(`/api/rooms/:roomId/scrap`, async ({ params }) => {
  const roomId = Number(params.roomId);

  if (roomId === 401) {
    return HttpResponse.json({
      success: false,
      status: 401,
      message: '인증되지 않은 요청입니다',
    });
  }

  if (roomId === 400) {
    return HttpResponse.json({
      success: false,
      status: 400,
      message: '유효하지 않은 ID 형식입니다.',
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

  // message 없이 실패하는 케이스
  if (roomId === 502) {
    return HttpResponse.json({
      success: false,
      status: 500,
    });
  }

  return HttpResponse.json({
    success: true,
    status: 204,
  });
});
