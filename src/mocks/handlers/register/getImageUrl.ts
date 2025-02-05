import { HttpResponse, http } from 'msw';

export const getImageUrlHandler = http.post('api/rooms/:roomId/images', async ({ params }) => {
  const roomId = Number(params.roomId);

  // 403 에러
  if (roomId === 403) {
    return HttpResponse.json({
      success: false,
      status: 403,
      message: '이미지 업로드 권한이 없습니다.',
    });
  }

  // 404 에러
  if (roomId === 404) {
    return HttpResponse.json({
      success: false,
      status: 404,
      message: '숙소가 없습니다.',
    });
  }

  // 500 서버 에러
  if (roomId === 500) {
    return HttpResponse.json({
      success: false,
      status: 500,
      message: '서버 에러가 발생했습니다.',
    });
  }

  // 네트워크 에러
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

  // 성공 응답
  return HttpResponse.json({
    success: true,
    data: ['https://pre-signed-url.com/image1.jpg', 'https://pre-signed-url.com/image2.jpg'],
    status: 200,
    message: 'OK',
  });
});
