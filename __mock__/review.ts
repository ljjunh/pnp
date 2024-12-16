export const mockReview = {
  id: 1,
  rating: 5,
  content: '좋은 숙소였습니다',
  createdAt: new Date(),
  user: {
    id: 'user1',
    image: 'image.jpg',
    name: '테스트 유저',
    host: {
      hostStartedAt: new Date(),
      isSuperHost: false,
    },
  },
};
