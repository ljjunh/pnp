import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { CustomError, UnAuthorizedError, ZodError } from '@/errors';
import { CustomResponse } from '@/lib/server';
import { updateReviewSchema } from '@/schemas/review';
import { deleteReview, updateReview } from '@/services/review';
import { ReviewParams } from '@/types/review';

export async function PATCH(
  request: NextRequest,
  { params }: { params: ReviewParams },
): Promise<CustomResponse<undefined>> {
  const session = await auth();
  try {
    if (!session) {
      throw new UnAuthorizedError();
    }

    const data = updateReviewSchema.parse(await request.json());

    const reviewId = +params.reviewId;

    await updateReview(reviewId, session.user.id, data);

    return CustomResponse.empty();
  } catch (error) {
    console.error('리뷰 수정 중 에러 발생: ', {
      reviewId: params.reviewId,
      userId: session?.user.id,
      error: error instanceof Error ? error.message : error,
    });

    if (error instanceof ZodError) {
      return CustomResponse.zod(400, error.errors);
    } else if (error instanceof CustomError) {
      return CustomResponse.errors(error.message, error.statusCode);
    }

    return CustomResponse.errors();
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: ReviewParams },
): Promise<CustomResponse<undefined>> {
  const session = await auth();
  try {
    if (!session) {
      throw new UnAuthorizedError();
    }

    const reviewId = +params.reviewId;
    await deleteReview(reviewId, session.user.id);

    return CustomResponse.deleted();
  } catch (error) {
    console.error('리뷰 삭제 중 에러 발생: ', {
      reviewId: params.reviewId,
      userId: session?.user.id,
      error: error instanceof Error ? error.message : error,
    });

    if (error instanceof CustomError) {
      return CustomResponse.errors(error.message, error.statusCode);
    }

    return CustomResponse.errors();
  }
}
