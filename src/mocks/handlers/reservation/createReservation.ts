import { CreateReservationInput } from '@/schemas/reservation';
import { HttpResponse, http } from 'msw';

export const createReservationHandler = http.post('/api/reservation', async ({ request }) => {
  const input = (await request.json()) as CreateReservationInput;

  // 서버 에러 케이스
  if (input.roomId === 500) {
    return HttpResponse.json({
      success: false,
      status: 500,
      message: '서버 에러가 발생했습니다.',
    });
  }

  // 네트워크 에러 케이스
  if (input.roomId === 501) {
    return new Response(null, { status: 500 });
  }

  // message 없이 실패하는 케이스 추가
  if (input.roomId === 502) {
    return HttpResponse.json({
      success: false,
      status: 500,
    });
  }

  // 성공 케이스
  return HttpResponse.json({
    success: true,
    status: 201,
    data: {
      reservationId: 4,
      orderNumber: '20241227-000000016-030643',
    },
    message: 'CREATED',
  });
});
