import { HttpResponse, http } from 'msw';

export const updateRoomRegister = http.patch('api/rooms/:roomId', async ({ params }) => {
  const roomId = Number(params.roomId);

  // 400 에러 -> '유효하지 않은 ID 형식입니다.' '예약이 존재하는 숙소는 수정할 수 없습니다.'
  if (roomId === 400) {
    return HttpResponse.json({
      success: false,
      status: 400,
      message: '유효하지 않은 ID 형식입니다.',
    });
  }

  // 401 에러
  if (roomId === 401) {
    return HttpResponse.json({
      success: false,
      status: 401,
      message: '로그인이 필요합니다.',
    });
  }

  // 403 에러
  if (roomId === 403) {
    return HttpResponse.json({
      success: false,
      status: 403,
      message: '본인의 숙소만 수정할 수 있습니다.',
    });
  }

  // 404 에러
  if (roomId === 404) {
    return HttpResponse.json({
      success: false,
      status: 404,
      message: '존재하지 않는 리소스입니다',
    });
  }

  // 500 에러 -> 서버 에러
  if (roomId === 500) {
    return HttpResponse.json({
      success: false,
      status: 500,
      message: '서버 에러가 발생했습니다.',
    });
  }

  // 501 에러 -> 네트워크 에러
  if (roomId === 501) {
    return new Response(null, { status: 500 });
  }

  // 502 에러 -> message 없이 실패하는 케이스
  if (roomId === 502) {
    return HttpResponse.json({
      success: false,
      status: 500,
    });
  }

  return HttpResponse.json({
    success: true,
    status: 200,
    message: 'OK',
  });
});
