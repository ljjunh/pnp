import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import {
  ErrorResponse,
  PaginationResponse,
  createPaginationResponse,
  getPaginationParams,
  getSkipTake,
} from '@/lib/server';
import { createReviewSchema } from '@/schemas/review';
import { createReview, getReviews } from '@/services/review';
import { z } from 'zod';
import { Review, ReviewParams } from '@/types/review';

export async function GET(
  request: NextRequest,
  { params }: { params: ReviewParams },
): Promise<NextResponse<PaginationResponse<Review> | ErrorResponse>> {
  try {
    const roomId = +params.roomId;
    const { page, limit } = getPaginationParams(request);
    const { skip, take } = getSkipTake(page, limit);

    const [reviews, total] = await getReviews(roomId, skip, take);

    return NextResponse.json({
      ...createPaginationResponse<Review>(reviews, total, page, limit),
    });
  } catch (error) {
    return NextResponse.json({ error: '리뷰 목록을 가져오는데 실패했습니다.' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: ReviewParams },
): Promise<NextResponse> {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    const roomId = +params.roomId;
    const data = createReviewSchema.parse(await request.json());

    await createReview(roomId, session.user.id, data.rating, data.content);

    return NextResponse.json(
      {
        success: true,
        message: '리뷰가 성공적으로 생성되었습니다.',
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '잘못된 요청 데이터입니다.', details: error.errors },
        { status: 400 },
      );
    }

    return NextResponse.json({ error: '리뷰 생성에 실패했습니다.' }, { status: 500 });
  }
}
