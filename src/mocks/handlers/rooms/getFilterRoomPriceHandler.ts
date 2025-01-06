import { HttpResponse, http } from 'msw';

export const getFilterRoomPriceHandler = http.get('/api/rooms/price', ({ request }) => {
  const url = new URL(request.url);
  const property = url.searchParams.get('property');

  // 서버 에러 케이스
  if (property === '500') {
    return HttpResponse.json({
      success: false,
      status: 500,
      message:
        '네트워크 문제로 가격 조회에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
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
