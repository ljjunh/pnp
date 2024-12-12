import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { CustomError, UnAuthorizedError } from '@/errors';
import {
  CustomResponse,
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
): Promise<CustomResponse<PaginationResponse<Review> | undefined>> {
  try {
    const roomId = +params.roomId;
    const { page, limit } = getPaginationParams(request);
    const { skip, take } = getSkipTake(page, limit);

    const [reviews, total] = await getReviews(roomId, skip, take);

    return CustomResponse.ok(createPaginationResponse(reviews, total, page, limit));
  } catch (error) {
    console.error(error);

    return CustomResponse.errors();
  }
}

export async function POST(request: NextRequest, { params }: { params: ReviewParams }) {
  try {
    const session = await auth();

    if (!session) {
      throw new UnAuthorizedError();
    }

    const roomId = +params.roomId;
    const data = createReviewSchema.parse(await request.json());

    await createReview(roomId, session.user.id, data);
    return CustomResponse.created();
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return CustomResponse.zod('잘못된 요청 데이터입니다.', 400, error.errors);
    } else if (error instanceof CustomError) {
      return CustomResponse.errors(error.message, error.statusCode);
    }

    return CustomResponse.errors();
  }
}
