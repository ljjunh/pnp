import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { CustomError, UnAuthorizedError } from '@/errors';
import { CustomResponse } from '@/lib/server';
import { updateReviewSchema } from '@/schemas/review';
import { deleteReview, updateReview } from '@/services/review';
import { z } from 'zod';

interface Params {
  reviewId: string;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Params },
): Promise<CustomResponse<undefined>> {
  try {
    const session = await auth();

    if (!session) {
      throw new UnAuthorizedError();
    }

    const data = updateReviewSchema.parse(await request.json());

    const reviewId = +params.reviewId;

    // TODO: 만약, reviewId에 해당하는 리뷰가 없다면 404 에러를 번환 처리해야할까?
    // TODO: 만약, reviewId에 해당하는 리뷰는 있지만, 현재 로그인한 사용자가 작성한 리뷰가 아니라면 403 에러를 반환 처리해야할까?
    await updateReview(reviewId, session.user.id, data);

    return CustomResponse.empty();
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

export async function DELETE({ params }: { params: Params }): Promise<CustomResponse<undefined>> {
  try {
    const session = await auth();

    if (!session) {
      throw new UnAuthorizedError();
    }

    const reviewId = +params.reviewId;
    await deleteReview(reviewId, session.user.id);

    return CustomResponse.deleted();
  } catch (error) {
    console.error(error);

    if (error instanceof CustomError) {
      return CustomResponse.errors(error.message, error.statusCode);
    }

    return CustomResponse.errors();
  }
}
