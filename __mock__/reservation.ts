import { Reservation } from '@/types/reservation';

export const mockReservation: Reservation = {
  userId: 'user1',
  roomId: 1,
  checkIn: new Date('2025-12-01'),
  checkOut: new Date('2025-12-03'),
  guestNumber: 2,
  orderNumber: 'order1',
  totalPrice: 100000,
  days: 2,
  room: {
    title: '테스트 방',
    thumbnail: 'thumbnail',
    reviewsCount: 10,
    reviewsAverage: 4.5,
    propertyType: 'APARTMENT',
    price: 50000,
    checkIn: '15:00',
    checkOut: '11:00',
    checkInType: 'SELF',
    capacity: 2,
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
