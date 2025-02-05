import { HttpResponse, http } from 'msw';

export const getFilterRoomCountHandler = http.get('/api/rooms/count', ({ request }) => {
  const url = new URL(request.url);
  const property = url.searchParams.get('propertyType');

  // 서버 에러 케이스
  if (property === '500') {
    return HttpResponse.json({
      success: false,
      status: 500,
      message:
        '네트워크 문제로 숙소 갯수 조회에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
    });
  }

  // 네트워크 에러 케이스
  if (property === '501') {
    return new Response(null, { status: 500 });
  }

  // 에러 메시지가 없는 경우
  if (property === '502') {
    return HttpResponse.json({
      success: false,
      status: 500,
      message: '',
    });
  }

  return HttpResponse.json({
    success: true,
    status: 200,
    message: 'OK',
    data: 100,
  });
});
