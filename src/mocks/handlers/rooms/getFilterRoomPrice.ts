import { HttpResponse, http } from 'msw';

export const getFilterRoomPriceHandler = http.get('/api/rooms/price', ({ request }) => {
  const url = new URL(request.url);
  const property = url.searchParams.get('property');

  // 서버 에러 케이스
  if (property === '500') {
    return HttpResponse.json({
      success: false,
      status: 500,
      message: '서버 에러가 발생하였습니다. 잠시후 다시 시도해주세요.',
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
    });
  }

  const mockPriceData = {
    minPrice: 10000,
    maxPrice: 1000000,
    distribution: [],
  };

  return HttpResponse.json({
    success: true,
    status: 200,
    message: 'OK',
    data: mockPriceData,
  });
});
