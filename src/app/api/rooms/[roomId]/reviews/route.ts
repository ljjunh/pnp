import { NextRequest, NextResponse } from 'next/server';
import {
  ErrorResponse,
  PaginationResponse,
  createPaginationResponse,
  getPaginationParams,
  getSkipTake,
  prisma,
} from '@/lib/server';
import type { Review as PrismaReview, User } from '@prisma/client';

interface Params {
  roomId: string;
}

type Review = Pick<PrismaReview, 'id' | 'rating' | 'content' | 'createdAt'> & {
  user: Pick<User, 'id' | 'image' | 'name'>;
};

type ReviewResponse = PaginationResponse<Review> | ErrorResponse;

export async function GET(
  request: NextRequest,
  { params }: { params: Params },
): Promise<NextResponse<ReviewResponse>> {
  const roomId = +params.roomId;

  try {
    const { page, limit } = getPaginationParams(request);
    const { skip, take } = getSkipTake(page, limit);

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

    return NextResponse.json({
      ...createPaginationResponse<Review>(reviews, total, page, limit),
    });
  } catch (error) {
    return NextResponse.json({ error: '리뷰 목록을 가져오는데 실패했습니다.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: Params }) {
  console.log(request);
  console.log(params);
  return NextResponse.json({ message: '리뷰 생성 완료' });
}
