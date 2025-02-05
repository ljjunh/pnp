import mockFilterRoom from '@/mocks/fixtures/filterRoom.json';
import { HttpResponse, http } from 'msw';

export const getFilterRoomHandler = http.get('/api/rooms', ({ request }) => {
  const url = new URL(request.url);
  const property = url.searchParams.get('propertyType');

  return HttpResponse.json({
    success: true,
    status: 200,
    message: 'OK',
    data: `url: ${url}`,
  });

  // 서버 에러 케이스
  if (property === '500') {
    return HttpResponse.json({
      success: false,
      status: 500,
      message: '서버 에러 입니다. 잠시 후 다시 시도해주세요.',
    });
  }

  // 네트워크 에러 케이스
  if (property === '501') {
    return new Response(null, { status: 500 });
  }

  return HttpResponse.json({
    success: true,
    status: 200,
    message: 'OK',
    data: {
      content: mockFilterRoom.content,
      page: mockFilterRoom.page,
    },
  });
});
