import { NotFoundError } from '@/errors';
import { ForbiddenError } from '@/errors/errors';
import { prisma } from '@/lib/server';
import { CreateReviewInput, UpdateReviewInput } from '@/schemas/review';
import { ReviewSummarize } from '@/types/review';

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
): Promise<[ReviewSummarize, number]> {
  const [reviews, aggregate] = await Promise.all([
    prisma.review.findMany({
      where: { roomId },
      orderBy: { createdAt: 'desc' },
      ...{ skip, take },
      select: {
        id: true,
        accuracy: true,
        communication: true,
        cleanliness: true,
        location: true,
        checkIn: true,
        value: true,
        content: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            image: true,
            name: true,
            host: {
              select: {
                hostStartedAt: true,
                isSuperHost: true,
              },
            },
          },
        },
      },
    }),
    prisma.review.aggregate({
      where: { roomId },
      _count: true,
      _avg: {
        accuracy: true,
        communication: true,
        cleanliness: true,
        location: true,
        checkIn: true,
        value: true,
      },
    }),
  ]);

  // 만약, 호스트 정보가 없다면 호스트 정보를 추가한다.
  const summarize: ReviewSummarize = {
    reviews: reviews.map((review) => ({
      ...review,
      user: {
        ...review.user,
        host: {
          hostStartedAt: new Date(),
          isSuperHost: false,
          ...review.user.host,
        },
      },
    })),
    count: aggregate._count,
    accuracy: aggregate._avg.accuracy || 0,
    communication: aggregate._avg.communication || 0,
    cleanliness: aggregate._avg.cleanliness || 0,
    location: aggregate._avg.location || 0,
    checkIn: aggregate._avg.checkIn || 0,
    value: aggregate._avg.value || 0,
  };

  return [summarize, aggregate._count];
}

/**
 * 리뷰를 생성한다.
 *
 * @param {number} roomId 방 아이디
 * @param {string} userId 사용자 아이디
 * @param {CreateReviewInput} data 리뷰 생성 데이터
 */
export async function createReview(
  roomId: number,
  userId: string,
  data: CreateReviewInput,
): Promise<void> {
  // * 숙소 정보 조회
  const room = await prisma.room.findUnique({
    where: { id: roomId },
    select: {
      reviewsAverage: true,
      reviewsCount: true,
      host: {
        select: {
          id: true,
          reviewsAverage: true,
          reviewsCount: true,
        },
      },
    },
  });

  if (!room) {
    throw new NotFoundError(`존재하지 않는 숙소입니다. (roomId: ${roomId})`);
  }

  // * 리뷰 생성 시 트랜잭션을 통해 숙소의 리뷰 정보와 호스트의 리뷰 정보를 업데이트 한다.
  await prisma.$transaction(async (prisma) => {
    await prisma.review.create({
      data: {
        roomId,
        userId,
        accuracy: data.accuracy,
        communication: data.communication,
        cleanliness: data.cleanliness,
        location: data.location,
        checkIn: data.checkIn,
        value: data.value,
        content: data.content,
      },
    });

    const average =
      (data.accuracy +
        data.communication +
        data.cleanliness +
        data.location +
        data.checkIn +
        data.value) /
      6;

    // * 숙소의 리뷰 정보 업데이트
    await prisma.room.update({
      where: { id: roomId },
      data: {
        reviewsCount: {
          increment: 1,
        },
        reviewsAverage:
          (room.reviewsAverage * room.reviewsCount + average) / (room.reviewsCount + 1),
      },
    });

    // * 호스트의 리뷰 정보 업데이트
    await prisma.host.update({
      where: { id: room.host.id },
      data: {
        reviewsCount: {
          increment: 1,
        },
        reviewsAverage:
          (room.host.reviewsAverage * room.host.reviewsCount + average) / room.host.reviewsCount +
          1,
      },
    });
  });
}

/**
 * 리뷰를 수정한다.
 *
 * @param {number} roomId 방 아이디
 * @param {number} reviewId 리뷰 아이디
 * @param {string} userId 사용자 아이디
 * @param {UpdateReviewInput} data 리뷰 수정 데이터
 */
export async function updateReview(
  roomId: number,
  reviewId: number,
  userId: string,
  data: UpdateReviewInput,
): Promise<void> {
  const room = await prisma.room.findUnique({
    where: { id: roomId },
    select: {
      reviewsAverage: true,
      reviewsCount: true,
      host: {
        select: {
          id: true,
          reviewsCount: true,
          reviewsAverage: true,
        },
      },
    },
  });

  if (!room) {
    throw new NotFoundError(`존재하지 않는 숙소입니다. (roomId: ${roomId})`);
  }

  const review = await prisma.review.findUnique({
    where: { id: reviewId },
    select: {
      userId: true,
      accuracy: true,
      communication: true,
      cleanliness: true,
      location: true,
      checkIn: true,
      value: true,
    },
  });

  if (!review) {
    throw new NotFoundError(`존재하지 않는 리뷰입니다. (reviewId: ${reviewId})`);
  }

  if (review.userId !== userId) {
    throw new ForbiddenError('해당 리뷰에 접근할 권한이 없습니다.');
  }

  await prisma.$transaction(async (prisma) => {
    const prevAverage =
      (review.accuracy +
        review.communication +
        review.cleanliness +
        review.location +
        review.checkIn +
        review.value) /
      6;
    const average =
      (data.accuracy +
        data.communication +
        data.cleanliness +
        data.location +
        data.checkIn +
        data.value) /
      6;

    await prisma.review.update({
      where: {
        id: reviewId,
        userId,
      },
      data: {
        accuracy: data.accuracy,
        communication: data.communication,
        cleanliness: data.cleanliness,
        location: data.location,
        checkIn: data.checkIn,
        value: data.value,
        content: data.content,
      },
    });

    // * 숙소의 리뷰 정보 업데이트
    await prisma.room.update({
      where: { id: roomId },
      data: {
        reviewsAverage:
          (room.reviewsAverage * room.reviewsCount - prevAverage + average) / room.reviewsCount,
      },
    });

    // * 호스트의 리뷰 정보 업데이트
    await prisma.host.update({
      where: { id: room.host.id },
      data: {
        reviewsAverage:
          (room.host.reviewsAverage * room.host.reviewsCount - prevAverage + average) /
          room.host.reviewsCount,
      },
    });
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
      userId,
    },
  });
}
