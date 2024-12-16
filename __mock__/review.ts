export const mockReview = {
  id: 1,
  accuracy: 5,
  checkIn: 5,
  cleanliness: 5,
  communication: 5,
  location: 5,
  value: 5,
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

export const mockReviewCreate = {
  accuracy: 5,
  checkIn: 4,
  cleanliness: 3,
  communication: 5,
  location: 4,
  value: 5,
  content: '좋은 숙소였습니다',
};
