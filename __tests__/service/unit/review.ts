import { prisma } from '@/lib/server';
import { createReview, deleteReview, getReviews, updateReview } from '@/services/review';

jest.mock('@/lib/server', () => ({
  prisma: {
    review: {
      findMany: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe('리뷰 서비스 테스트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getReviews', () => {
    it('리뷰 목록과 전체 개수를 반환해야 합니다', async () => {
      const mockReviews = [
        {
          id: 1,
          rating: 5,
          content: '좋은 숙소였습니다',
          createdAt: new Date(),
          user: {
            id: 'user1',
            image: 'image.jpg',
            name: '테스트 유저',
          },
        },
      ];

      (prisma.review.findMany as jest.Mock).mockResolvedValue(mockReviews);
      (prisma.review.count as jest.Mock).mockResolvedValue(1);

      const [reviews, total] = await getReviews(1, 0, 10);

      expect(reviews).toEqual(mockReviews);
      expect(total).toBe(1);
      expect(prisma.review.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { roomId: 1 },
          skip: 0,
          take: 10,
        }),
      );
    });
  });

  describe('createReview', () => {
    it('리뷰를 생성해야 합니다', async () => {
      const reviewData = {
        rating: 5,
        content: '좋은 숙소였습니다',
      };

      await createReview(1, 'user1', reviewData);

      expect(prisma.review.create).toHaveBeenCalledWith({
        data: {
          roomId: 1,
          userId: 'user1',
          rating: reviewData.rating,
          content: reviewData.content,
        },
      });
    });
  });

  describe('updateReview', () => {
    it('리뷰를 수정해야 합니다', async () => {
      const reviewData = {
        rating: 4,
        content: '수정된 리뷰입니다',
      };

      await updateReview(1, 'user1', reviewData);

      expect(prisma.review.update).toHaveBeenCalledWith({
        where: {
          id: 1,
          userId: 'user1',
        },
        data: {
          rating: reviewData.rating,
          content: reviewData.content,
        },
      });
    });
  });

  describe('deleteReview', () => {
    it('리뷰를 삭제해야 합니다', async () => {
      await deleteReview(1, 'user1');

      expect(prisma.review.delete).toHaveBeenCalledWith({
        where: {
          id: 1,
          userId: 'user1',
        },
      });
    });
  });
});
