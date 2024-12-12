import { prisma } from '@/lib/server';
import { Review } from '@/types/review';

/**
 * 전체 리뷰를 조회한다.
 *
 * @param {number} roomId 방 아이디
 * @param {number} skip 건너뛸 리뷰 수
 * @param {number} take 가져올 리뷰 수
 *
 * @returns {Promise<[Review[], number]>} 리뷰 목록과 전체 리뷰 수
 */
export async function getReviews(
  roomId: number,
  skip: number,
  take: number,
): Promise<[Review[], number]> {
  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
      where: { roomId },
      orderBy: { createdAt: 'desc' },
      ...{ skip, take },
      select: {
        id: true,
        rating: true,
        content: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            image: true,
            name: true,
          },
        },
      },
    }),
    prisma.review.count({
      where: { roomId },
    }),
  ]);

  return [reviews, total];
}

/**
 * 리뷰를 생성한다.
 *
 * @param {number} roomId 방 아이디
 * @param {string} userId 사용자 아이디
 * @param {number} rating 평점
 * @param {string} content 내용
 */
export async function createReview(
  roomId: number,
  userId: string,
  rating: number,
  content: string,
): Promise<void> {
  await prisma.review.create({
    data: {
      roomId,
      userId: userId,
      rating: rating,
      content: content,
    },
  });
}

/**
 * 리뷰를 수정한다.
 *
 * @param {number} reviewId 리뷰 아이디
 * @param {string} userId 사용자 아이디
 * @param {number} rating 평점
 * @param {string} content 내용
 */
export async function updateReview(
  reviewId: number,
  userId: string,
  rating: number,
  content: string,
): Promise<void> {
  await prisma.review.update({
    where: {
      id: reviewId,
      userId: userId,
    },
    data: {
      rating: rating,
      content: content,
    },
  });
}

/**
 * 리뷰를 삭제한다.
 *
 * @param {number} reviewId 리뷰 아이디
 * @param {string} userId 사용자 아이디
 */
export async function deleteReview(reviewId: number, userId: string): Promise<void> {
  await prisma.review.delete({
    where: {
      id: reviewId,
      userId: userId,
    },
  });
}
