import { prisma } from '@/lib/server';
import { createReview, deleteReview, getReviews, updateReview } from '@/services/review';

describe('리뷰 서비스 통합 테스트', () => {
  let testRoomId: number;
  let testUserId: string;

  // 테스트 전에 필요한 데이터 생성
  beforeAll(async () => {
    // 테스트용 방 생성
    const room = await prisma.room.create({
      data: {
        title: '테스트 숙소',
        description: '테스트용 숙소입니다',
        price: 100000,
        seoTitle: '테스트 숙소',
        seoDescription: '테스트용 숙소입니다',
        location: '서울',
        latitude: 37.5665,
        longitude: 126.978,
        capacity: 2,
        checkIn: '14:00',
        checkOut: '12:00',
        checkInType: 'flexible',
        host: {
          connect: {
            id: 1,
          },
        },
      },
    });
    testRoomId = room.id;

    const user = await prisma.user.create({
      data: {
        name: '테스트 사용자',
        email: 'test@example.com',
        // 필요한 다른 필드들 추가
      },
    });
    testUserId = user.id;
  });

  afterEach(async () => {
    await prisma.review.deleteMany({
      where: {
        roomId: testRoomId,
      },
    });
  });

  afterAll(async () => {
    await prisma.room.delete({
      where: { id: testRoomId! },
    });
    await prisma.user.delete({
      where: { id: testUserId },
    });
  });

  describe('getReviews 통합 테스트', () => {
    it('리뷰 목록을 정상적으로 조회해야 합니다', async () => {
      // 테스트용 리뷰 생성
      await prisma.review.create({
        data: {
          roomId: testRoomId,
          userId: testUserId,
          rating: 5,
          content: '테스트 리뷰입니다',
        },
      });

      const [reviews, total] = await getReviews(testRoomId, 0, 10);

      expect(total).toBe(1);
      expect(reviews).toHaveLength(1);
      expect(reviews[0]).toMatchObject({
        rating: 5,
        content: '테스트 리뷰입니다',
      });
    });
  });

  describe('createReview 통합 테스트', () => {
    it('새로운 리뷰를 생성해야 합니다', async () => {
      const reviewData = {
        rating: 4,
        content: '새로운 테스트 리뷰입니다',
      };

      await createReview(testRoomId, testUserId, reviewData);

      const createdReview = await prisma.review.findFirst({
        where: {
          roomId: testRoomId,
          userId: testUserId,
        },
      });

      expect(createdReview).toMatchObject(reviewData);
    });
  });

  describe('updateReview 통합 테스트', () => {
    it('기존 리뷰를 수정해야 합니다', async () => {
      // 수정할 리뷰 먼저 생성
      const review = await prisma.review.create({
        data: {
          roomId: testRoomId,
          userId: testUserId,
          rating: 3,
          content: '수정 전 리뷰',
        },
      });

      const updateData = {
        rating: 5,
        content: '수정된 리뷰입니다',
      };

      await updateReview(review.id, testUserId, updateData);

      const updatedReview = await prisma.review.findUnique({
        where: { id: review.id },
      });

      expect(updatedReview).toMatchObject(updateData);
    });
  });

  describe('deleteReview 통합 테스트', () => {
    it('리뷰를 삭제해야 합니다', async () => {
      // 삭제할 리뷰 먼저 생성
      const review = await prisma.review.create({
        data: {
          roomId: testRoomId,
          userId: testUserId,
          rating: 4,
          content: '삭제될 리뷰',
        },
      });

      await deleteReview(review.id, testUserId);

      const deletedReview = await prisma.review.findUnique({
        where: { id: review.id },
      });

      expect(deletedReview).toBeNull();
    });
  });
});
