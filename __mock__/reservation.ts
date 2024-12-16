import { Reservation } from '@/types/reservation';

export const mockReservation: Reservation = {
  userId: 'user1',
  roomId: 1,
  checkIn: new Date('2025-12-01'),
  checkOut: new Date('2025-12-03'),
  message: '',
  guestNumber: 2,
  orderNumber: 'order1',
  room: {
    title: '테스트 방',
    thumbnail: 'thumbnail',
    images: [],
    rules: [],
    host: {
      id: 1,
      isSuperHost: true,
      isVerified: true,
      user: {
        id: 'host1',
        name: '호스트',
        image: 'host-image',
      },
    },
  },
};

export const mockConfirmReservation = {
  status: 'PENDING',
  room: {
    host: {
      userId: 'hostId',
    },
  },
};
