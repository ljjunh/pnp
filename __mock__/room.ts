import { Decimal } from '@prisma/client/runtime/library';
import { Room } from '@/types/room';

export const mockRoom: Room = {
  id: 1,
  title: '테스트 방',
  description: '테스트 방입니다.',
  seoTitle: '테스트 방',
  seoDescription: '테스트 방입니다.',
  price: 10000,
  location: '서울',
  latitude: new Decimal(37.1234),
  longitude: new Decimal(126.1234),
  airbnbLink: 'https://www.airbnb.co.kr/',
  thumbnail: 'test.jpg',
  capacity: 2,
  checkIn: '15:00',
  checkOut: '11:00',
  checkInType: 'self',
  roomTags: [],
  images: [],
  rules: [],
  amenities: [],
  host: {
    id: 1,
    isSuperHost: true,
    isVerified: true,
    hostStartedAt: new Date('2024-01-01T00:00:00Z'),
    user: {
      id: 'userId',
      email: 'test@test.com',
      name: '테스트',
      image: 'test.jpg',
    },
    hostTags: [],
  },
};
