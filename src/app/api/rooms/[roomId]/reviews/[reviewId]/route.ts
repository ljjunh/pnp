import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { BadRequestError, CustomError, UnAuthorizedError, ZodError } from '@/errors';
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

    const roomId = Number(params.roomId);
    const reviewId = Number(params.reviewId);

    if (isNaN(roomId) || isNaN(reviewId)) {
      throw new BadRequestError('유효하지 않은 ID 형식입니다.');
    }

    await updateReview(roomId, reviewId, session.user.id, data);

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

    const reviewId = Number(params.reviewId);
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
