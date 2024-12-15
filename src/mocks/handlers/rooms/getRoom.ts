import mockRoom from '@/mocks/fixtures/room.json';
import { HttpResponse, http } from 'msw';

export const getRoomHandlers = [
  http.get('/api/rooms/:id', () => {
    return HttpResponse.json({
      success: true,
      status: 200,
      message: 'OK',
      data: mockRoom,
    });
  }),
];
