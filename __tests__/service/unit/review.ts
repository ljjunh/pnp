import { prisma } from '@/lib/server';
import { createReview, deleteReview, getReviews, updateReview } from '@/services/review';
import { mockReview, mockReviewCreate } from '@mocks/review';
import { mockRoom } from '@mocks/room';

jest.mock('@/lib/server', () => ({
  prisma: {
    review: {
      findMany: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findUnique: jest.fn(),
      aggregate: jest.fn(),
    },
    room: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    host: {
      update: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}));

describe('리뷰 서비스 테스트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getReviews', () => {
    it('리뷰 목록과 전체 개수를 반환해야 합니다', async () => {
      const mockReviews = [mockReview];
      const roomId = 1;
      const skip = 0;
      const take = 10;

      (prisma.review.findMany as jest.Mock).mockResolvedValue(mockReviews);
      (prisma.review.aggregate as jest.Mock).mockResolvedValue({
        _count: mockReviews.length,
        _avg: {
          accuracy: 5,
          communication: 5,
          cleanliness: 5,
          location: 5,
          checkIn: 5,
          value: 5,
        },
      });

      const [reviews, total] = await getReviews(roomId, skip, take);

      expect(reviews).toEqual({
        reviews: mockReviews,
        count: mockReviews.length,
        accuracy: 5,
        communication: 5,
        cleanliness: 5,
        location: 5,
        checkIn: 5,
        value: 5,
      });
      expect(total).toBe(1);
      expect(prisma.review.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { roomId: 1 },
          skip: 0,
          take: 10,
        }),
      );
    });

    it('만약, 리뷰 조회 중 호스트 정보가 존재하지 않는다면 기본 값을 반환합니다.', async () => {
      const mockReviews = [
        {
          ...mockReview,
          user: {
            ...mockReview.user,
            host: null,
          },
        },
      ];
      const roomId = 1;
      const skip = 0;
      const take = 10;

      (prisma.review.findMany as jest.Mock).mockResolvedValue(mockReviews);
      (prisma.review.aggregate as jest.Mock).mockResolvedValue({
        _count: mockReviews.length,
        _avg: {
          accuracy: 5,
          communication: 5,
          cleanliness: 5,
          location: 5,
          checkIn: 5,
          value: 5,
        },
      });

      const [reviews, total] = await getReviews(roomId, skip, take);

      expect(reviews).toEqual({
        reviews: [
          {
            ...mockReview,
            user: {
              ...mockReview.user,
              host: {
                hostStartedAt: new Date(),
                isSuperHost: false,
              },
            },
          },
        ],
        count: mockReviews.length,
        accuracy: 5,
        communication: 5,
        cleanliness: 5,
        location: 5,
        checkIn: 5,
        value: 5,
      });
      expect(total).toBe(1);
      expect(prisma.review.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { roomId: 1 },
          skip: 0,
          take: 10,
        }),
      );
    });

    it('만약, 리뷰에 대한 정보가 없다면 기본 값을 반환해야합니다.', async () => {
      const mockReviews = [mockReview];
      const roomId = 1;
      const skip = 0;
      const take = 10;

      (prisma.review.findMany as jest.Mock).mockResolvedValue(mockReviews);
      (prisma.review.aggregate as jest.Mock).mockResolvedValue({
        _count: 0,
        _avg: {
          accuracy: null,
          communication: null,
          cleanliness: null,
          location: null,
          checkIn: null,
          value: null,
        },
      });

      const [reviews, total] = await getReviews(roomId, skip, take);

      expect(reviews).toEqual({
        reviews: mockReviews,
        count: 0,
        accuracy: 0,
        communication: 0,
        cleanliness: 0,
        location: 0,
        checkIn: 0,
        value: 0,
      });
      expect(total).toBe(0);
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
      const userId = 'user1';
      const roomId = 1;
      const { accuracy, communication, cleanliness, location, checkIn, value } = mockReviewCreate;
      const prevAverage = 5;
      const prevCount = 1;
      const average = (accuracy + communication + cleanliness + location + checkIn + value) / 6;
      const sumAverage = Number(((prevAverage * prevCount + average) / (prevCount + 1)).toFixed(1));

      (prisma.room.findUnique as jest.Mock).mockResolvedValue(mockRoom);
      (prisma.review.create as jest.Mock).mockResolvedValue(mockReview);
      (prisma.room.update as jest.Mock).mockResolvedValue({
        reviewsAverage: prevAverage,
        reviewsCount: prevCount,
      });
      (prisma.host.update as jest.Mock).mockResolvedValue({
        reviewsAverage: prevAverage,
        reviewsCount: prevCount,
      });
      jest.spyOn(prisma, '$transaction').mockImplementation(async (callback) => {
        await callback(prisma);
      });

      await createReview(1, 'user1', mockReviewCreate);

      expect(prisma.review.create).toHaveBeenCalledWith({
        data: {
          roomId: roomId,
          userId: userId,
          accuracy: mockReviewCreate.accuracy,
          communication: mockReviewCreate.communication,
          cleanliness: mockReviewCreate.cleanliness,
          location: mockReviewCreate.location,
          checkIn: mockReviewCreate.checkIn,
          value: mockReviewCreate.value,
          content: mockReviewCreate.content,
        },
      });

      expect(prisma.room.update).toHaveBeenCalledWith({
        where: {
          id: roomId,
        },
        data: {
          reviewsAverage: sumAverage,
          reviewsCount: {
            increment: 1,
          },
        },
      });

      expect(prisma.host.update).toHaveBeenCalledWith({
        where: {
          id: mockRoom.host.id,
        },
        data: {
          reviewsAverage: sumAverage,
          reviewsCount: {
            increment: 1,
          },
        },
      });
    });

    it('만약, 숙소가 존재하지 않으면 에러를 반환해야 합니다', async () => {
      const userId = 'user1';
      const roomId = 1;

      jest.spyOn(prisma, '$transaction').mockImplementation(async (callback) => {
        await callback(prisma);
      });
      (prisma.room.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(createReview(roomId, userId, mockReviewCreate)).rejects.toThrow(
        new Error(`존재하지 않는 숙소입니다. (roomId: ${roomId})`),
      );
    });

    // it('리뷰 생성 중 오류 발생시 트랜잭션이 롤백되어야 합니다', async () => {
    //   const userId = 'user1';
    //   const roomId = 1;

    //   (prisma.room.findUnique as jest.Mock).mockResolvedValue(mockRoom);
    //   (prisma.review.create as jest.Mock).mockResolvedValue(mockReview);
    //   (prisma.room.update as jest.Mock).mockRejectedValue(new Error('DB Error'));
    //   jest.spyOn(prisma, '$transaction').mockImplementation(async (callback) => {
    //     await callback(prisma);
    //   });

    //   await expect(createReview(roomId, userId, mockReviewCreate)).rejects.toThrow('DB Error');
    //   expect(prisma.review.create).not.toHaveBeenCalled();
    // });
  });

  describe('updateReview', () => {
    it('리뷰를 수정해야 합니다', async () => {
      const userId = 'user1';
      const reviewId = 1;
      const roomId = 1;
      const { accuracy, communication, cleanliness, location, checkIn, value } = mockReviewCreate;
      const average = Number(
        ((accuracy + communication + cleanliness + location + checkIn + value) / 6).toFixed(1),
      );

      (prisma.room.findUnique as jest.Mock).mockResolvedValue(mockRoom);
      (prisma.review.findUnique as jest.Mock).mockResolvedValue({
        ...mockReview,
        userId: userId,
      });
      (prisma.room.update as jest.Mock).mockResolvedValue({
        reviewsAverage: 5,
        reviewsCount: 1,
      });
      (prisma.host.update as jest.Mock).mockResolvedValue({
        reviewsAverage: 5,
        reviewsCount: 1,
      });
      jest.spyOn(prisma, '$transaction').mockImplementation(async (callback) => {
        await callback(prisma);
      });

      await updateReview(roomId, reviewId, userId, mockReviewCreate);

      expect(prisma.review.update).toHaveBeenCalledWith({
        where: {
          id: reviewId,
          userId: userId,
        },
        data: {
          accuracy: mockReviewCreate.accuracy,
          communication: mockReviewCreate.communication,
          cleanliness: mockReviewCreate.cleanliness,
          location: mockReviewCreate.location,
          checkIn: mockReviewCreate.checkIn,
          value: mockReviewCreate.value,
          content: mockReviewCreate.content,
        },
      });
      expect(prisma.room.update).toHaveBeenCalledWith({
        where: {
          id: roomId,
        },
        data: {
          reviewsAverage: average,
        },
      });
      expect(prisma.host.update).toHaveBeenCalledWith({
        where: {
          id: mockRoom.host.id,
        },
        data: {
          reviewsAverage: average,
        },
      });
    });

    it('만약, 숙소가 존재하지 않으면 에러를 반환해야 합니다', async () => {
      const reviewId = 1;
      const userId = 'user1';
      const roomId = 1;

      (prisma.room.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(updateReview(roomId, reviewId, userId, mockReviewCreate)).rejects.toThrow(
        new Error(`존재하지 않는 숙소입니다. (roomId: ${roomId})`),
      );
    });

    it('만약, 리뷰가 존재하지 않으면 에러를 반환해야 합니다', async () => {
      const reviewId = 1;
      const userId = 'user1';
      const roomId = 1;

      (prisma.room.findUnique as jest.Mock).mockResolvedValue(mockRoom);
      (prisma.review.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(updateReview(roomId, reviewId, userId, mockReviewCreate)).rejects.toThrow(
        new Error(`존재하지 않는 리뷰입니다. (reviewId: ${reviewId})`),
      );
    });

    it('만약, 리뷰를 작성한 사용자가 아니라면 에러를 반환해야 합니다', async () => {
      const reviewId = 1;
      const userId = 'wrong user';
      const roomId = 1;

      (prisma.room.findUnique as jest.Mock).mockResolvedValue(mockRoom);
      (prisma.review.findUnique as jest.Mock).mockResolvedValue(mockReview);

      await expect(updateReview(roomId, reviewId, userId, mockReviewCreate)).rejects.toThrow(
        new Error(`해당 리뷰에 접근할 권한이 없습니다.`),
      );
    });

    it('업데이트 중 오류 발생시 트랜잭션이 롤백되어야 합니다', async () => {
      const userId = 'user1';
      const reviewId = 1;
      const roomId = 1;

      (prisma.room.findUnique as jest.Mock).mockResolvedValue(mockRoom);
      (prisma.review.findUnique as jest.Mock).mockResolvedValue({
        ...mockReview,
        userId: userId,
      });

      (prisma.review.update as jest.Mock).mockRejectedValue(new Error('DB Error'));

      await expect(updateReview(roomId, reviewId, userId, mockReviewCreate)).rejects.toThrow(
        'DB Error',
      );

      // verify no changes were committed
      expect(prisma.room.update).not.toHaveBeenCalled();
      expect(prisma.host.update).not.toHaveBeenCalled();
    });
  });

  describe('deleteReview', () => {
    it('리뷰를 삭제해야 합니다', async () => {
      const reviewId = 1;
      const userId = 'user1';

      await deleteReview(reviewId, userId);

      expect(prisma.review.delete).toHaveBeenCalledWith({
        where: {
          id: reviewId,
          userId: userId,
        },
      });
    });
  });
});
