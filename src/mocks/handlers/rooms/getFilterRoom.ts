import mockFilterRoom from '@/mocks/fixtures/filterRoom.json';
import { HttpResponse, http } from 'msw';

export const getFilterRoomHandler = http.get('/api/rooms', ({ request }) => {
  const url = new URL(request.url);
  const property = url.searchParams.get('property');

  // 서버 에러 케이스
  if (property === '500') {
    return HttpResponse.json({
      success: false,
      status: 500,
      message: '서버 에러 입니다. 잠시 후 다시 시도해주세요.',
    });
  }

  return HttpResponse.json({
    success: true,
    status: 200,
    message: 'OK',
    data: {
      data: mockFilterRoom.data,
      page: mockFilterRoom.page,
    },
  });
});
