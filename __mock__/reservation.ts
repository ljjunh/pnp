import { Decimal } from 'decimal.js';
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
    latitude: new Decimal(33.4721),
    longitude: new Decimal(126.3456),
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
    roomTags: [
      {
        id: 33,
        content: '최대 인원 2명',
      },
      {
        id: 34,
        content: '침실 1개',
      },
      {
        id: 36,
        content: '욕실 1개',
      },
      {
        id: 37,
        content: '침대 1개',
      },
    ],
    images: [
      {
        id: 402,
        roomId: 1,
        caption: 'a',
        imageLink:
          'https://a0.muscache.com/im/pictures/miso/Hosting-1003135790558909834/original/3d88ac02-7c1a-43fb-be2f-ced33b9366c7.jpeg',
        orientation: 'PORTRAIT',
      },
      {
        id: 403,
        roomId: 2,
        caption: 'c',
        imageLink:
          'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTAwMzEzNTc5MDU1ODkwOTgzNA%3D%3D/original/30a89caa-322a-40bc-af67-e3263b83d991.jpeg',
        orientation: 'LANDSCAPE',
      },
      {
        id: 404,
        roomId: 2,
        caption: 'c',
        imageLink:
          'https://a0.muscache.com/im/pictures/miso/Hosting-1003135790558909834/original/6bbaa189-5119-4afa-a5a0-70e8a95a9885.jpeg',
        orientation: 'LANDSCAPE',
      },
    ],
    rules: [
      {
        id: 1,
        category: '숙박 중',
        title: '게스트 정원 2명',
        icon: 'SYSTEM_FAMILY',
      },
      {
        id: 5,
        category: '숙박 중',
        title: '추가 이용규칙',
        icon: 'SYSTEM_CLIPBOARD',
      },
    ],
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
