import { NotFoundError } from '@/errors';
import { ForbiddenError } from '@/errors/errors';
import { prisma } from '@/lib/server';
import { CreateReviewInput, UpdateReviewInput } from '@/schemas/review';
import { Prisma } from '@prisma/client';
import { ReviewSummarize } from '@/types/review';

/**
 * 전체 리뷰를 조회한다.
 *
 * @param {number} roomId 방 아이디
 * @param {number} skip 건너뛸 리뷰 수
 * @param {number} take 가져올 리뷰 수
 * @param {string} sort 정렬 방식
 *
 * @returns {Promise<[Review[], number]>} 리뷰 목록과 전체 리뷰 수
 */
export async function getReviews(
  roomId: number,
  skip: number,
  take: number,
  sort: string,
): Promise<[ReviewSummarize, number]> {
  const orderBy = reviewSort(sort);
  const [reviews, aggregate] = await Promise.all([
    prisma.review.findMany({
      where: { roomId },
      ...{ skip, take },
      orderBy: [
        { ...orderBy },
        {
          id: 'desc',
        },
      ],
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
          hostStartedAt: review.user.host?.hostStartedAt ?? new Date(),
          isSuperHost: review.user.host?.isSuperHost ?? false,
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

  // * 만약, 사용자가 해당 숙소에 예약한 이력이 없다면 리뷰를 작성할 수 없다.
  const alreadyReview = await prisma.review.count({
    where: {
      orderNumber: data.orderNumber,
      userId,
    },
  });

  if (alreadyReview > 0) {
    throw new ForbiddenError('리뷰를 작성할 권한이 없습니다.');
  }

  // * 리뷰 생성 시 트랜잭션을 통해 숙소의 리뷰 정보와 호스트의 리뷰 정보를 업데이트 한다.
  await prisma.$transaction(async (prisma) => {
    // * 신규 리뷰 데이터 생성
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

    const average = averageReview(data);

    // * 숙소의 리뷰 정보 업데이트
    await prisma.room.update({
      where: { id: roomId },
      data: {
        reviewsCount: {
          increment: 1,
        },
        reviewsAverage: refinedAverage(
          room.reviewsAverage * room.reviewsCount + average,
          room.reviewsCount + 1,
        ),
      },
    });

    // * 호스트의 리뷰 정보 업데이트
    await prisma.host.update({
      where: { id: room.host.id },
      data: {
        reviewsCount: {
          increment: 1,
        },
        reviewsAverage: refinedAverage(
          room.host.reviewsAverage * room.host.reviewsCount + average,
          room.host.reviewsCount + 1,
        ),
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
  // * 숙소의 리뷰 정보와 리뷰에 딸린 호스트 정보를 조회한다.
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
      room: {
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
      },
    },
  });

  if (!review) {
    throw new NotFoundError(`존재하지 않는 리뷰입니다. (reviewId: ${reviewId})`);
  }

  if (review.userId !== userId) {
    throw new ForbiddenError('해당 리뷰에 접근할 권한이 없습니다.');
  }

  await prisma.$transaction(async (prisma) => {
    const prevAverage = averageReview(review);
    const average = averageReview(data);

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
        reviewsAverage: refinedAverage(
          review.room.reviewsAverage * review.room.reviewsCount - prevAverage + average,
          review.room.reviewsCount,
        ),
      },
    });

    // * 호스트의 리뷰 정보 업데이트
    await prisma.host.update({
      where: { id: review.room.host.id },
      data: {
        reviewsAverage: refinedAverage(
          review.room.host.reviewsAverage * review.room.host.reviewsCount - prevAverage + average,
          review.room.host.reviewsCount,
        ),
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
  // * 트랜잭션을 시작하기 전 리뷰 정보와 리뷰에 딸린 숙소 정보를 조회한다.
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
    select: {
      userId: true,
      value: true,
      checkIn: true,
      location: true,
      cleanliness: true,
      accuracy: true,
      communication: true,
      room: {
        select: {
          id: true,
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
      },
    },
  });

  // * 리뷰가 존재하지 않는다면 404 에러를 발생시킨다.
  if (!review) {
    throw new NotFoundError(`존재하지 않는 리뷰입니다. (reviewId: ${reviewId})`);
  }

  // * 리뷰를 작성한 사용자가 아니라면 403 에러를 발생시킨다.
  if (review.userId !== userId) {
    throw new ForbiddenError('해당 리뷰에 접근할 권한이 없습니다.');
  }

  // * 리뷰 삭제 시 트랜잭션을 통해 리뷰 정보와 숙소 정보, 호스트 정보를 업데이트 한다.
  await prisma.$transaction(async (prisma) => {
    // * 리뷰 삭제 시 반정규화 된 리뷰의 평점과 호스트의 평점을 수정해준다.
    await prisma.review.delete({
      where: {
        id: reviewId,
      },
    });

    const average = averageReview(review);

    // * 리뷰 삭제 시 숙소의 평점 정보를 업데이트 한다.
    await prisma.room.update({
      where: { id: review.room.id },
      data: {
        reviewsAverage: refinedAverage(
          review.room.reviewsAverage * review.room.reviewsCount - average,
          review.room.reviewsCount - 1,
        ),
        reviewsCount: {
          decrement: 1,
        },
      },
    });

    // * 리뷰 삭제 시 호스트의 평점 정보를 업데이트 한다.
    await prisma.host.update({
      where: { id: review.room.host.id },
      data: {
        reviewsAverage: refinedAverage(
          review.room.host.reviewsAverage * review.room.host.reviewsCount - average,
          review.room.host.reviewsCount - 1,
        ),
        reviewsCount: {
          decrement: 1,
        },
      },
    });
  });
}

/**
 * 현재 사용자가 리뷰를 작성할 수 있는지 확인한다.
 *
 * @param {string} userId 사용자 아이디
 * @param {number} roomId 방 아이디
 * @returns {string[]} 리뷰 작성 가능한 예약 번호 목록
 */
export const availableReview = async (userId: string, roomId: number): Promise<string[]> => {
  // * 사용자가 이미 작성한 리뷰 목록을 조회한다.
  const writtenReviews = await prisma.review.findMany({
    where: {
      userId,
      roomId,
    },
    select: {
      orderNumber: true,
    },
  });

  // * 사용자가 작성한 리뷰 목록을 제외한 리뷰 작성 가능한 예약 목록을 조회한다.
  const canReview = await prisma.reservation.findMany({
    where: {
      userId,
      roomId,
      // * 예약이 완료된 상태만 조회한다.
      // status: 'COMPLETED',
      // * 리뷰 작성 가능한 기간을 설정한다. (체크아웃 후 30일 이내)
      checkOut: {
        gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
      },
      orderNumber: {
        notIn: writtenReviews.map((review) => review.orderNumber ?? ''),
      },
    },
    select: {
      orderNumber: true,
    },
    // * 가장 오래된 예약부터 조회한다.
    orderBy: {
      createdAt: 'asc',
    },
  });

  return canReview.map((reservation) => reservation.orderNumber);
};

interface ReviewCreate {
  accuracy: number;
  communication: number;
  cleanliness: number;
  location: number;
  checkIn: number;
  value: number;
}

/**
 * 리뷰 평균을 계산한다.
 *
 * @param {object} data 리뷰 데이터
 * @returns {number} 리뷰 평균
 */
const averageReview = (data: ReviewCreate): number => {
  const { accuracy, communication, cleanliness, location, checkIn, value } = data;
  const sum = accuracy + communication + cleanliness + location + checkIn + value;

  return refinedAverage(sum, 6);
};

export const refinedAverage = (sum: number, count: number): number => {
  // * 리뷰 평균을 소수점 첫째 자리까지 반올림하여 반환한다. 만약, 리뷰가 없다면 0을 반환한다.
  if (count === 0) {
    return 0;
  }
  return Number((sum / count).toFixed(1));
};

const reviewSort = (sort: string) => {
  const orderBy: Prisma.ReviewOrderByWithRelationInput = {};

  if (sort === 'recent') {
    orderBy.createdAt = 'desc';
  } else if (sort === 'high') {
    orderBy.accuracy = 'desc';
  } else if (sort === 'low') {
    orderBy.accuracy = 'asc';
  }

  return orderBy;
};
