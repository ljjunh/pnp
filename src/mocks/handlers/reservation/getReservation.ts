import mockReservation from '@/mocks/fixtures/reservation.json';
import { HttpResponse, http } from 'msw';

export const getReservationHandler = http.get('/api/reservation/:orderNumber', ({ params }) => {
  const { orderNumber } = params;

  // notFound 에러 케이스
  if (orderNumber === '404') {
    return HttpResponse.json({
      success: false,
      status: 404,
      message: '존재하지 않는 예약입니다.',
    });
  }

  // 인증 에러 케이스
  if (orderNumber === '401') {
    return HttpResponse.json({
      success: false,
      status: 401,
      message: '로그인이 필요합니다.',
    });
  }

  // 서버 에러 케이스
  if (orderNumber === '500') {
    return HttpResponse.json({
      success: false,
      status: 500,
      message: '서버 에러가 발생했습니다.',
    });
  }

  // 네트워크 에러 케이스
  if (orderNumber === '501') {
    return new Response(null, { status: 500 });
  }

  return HttpResponse.json({
    success: true,
    status: 200,
    message: 'OK',
    data: mockReservation,
  });
});
