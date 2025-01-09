import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { BadRequestError, CustomError, UnAuthorizedError, ZodError } from '@/errors';
import {
  CustomResponse,
  PaginationResponse,
  createPaginationResponse,
  getPaginationParams,
  getSkipTake,
} from '@/lib/server';
import { createReviewSchema } from '@/schemas/review';
import { createReview, getReviews } from '@/services/review';
import { ReviewParams, ReviewSummarize } from '@/types/review';
import { CACHE_TAGS } from '@/constants/cacheTags';

export async function GET(
  request: NextRequest,
  { params }: { params: ReviewParams },
): Promise<CustomResponse<PaginationResponse<ReviewSummarize> | undefined>> {
  try {
    const roomId = Number(params.roomId);

    if (isNaN(roomId)) {
      throw new BadRequestError('유효하지 않은 ID 형식입니다.');
    }

    const searchParams = request.nextUrl.searchParams;
    const sort = searchParams.get('sort') ?? 'recent';
    const { page, limit } = getPaginationParams(request);
    const { skip, take } = getSkipTake(page, limit);

    const [reviews, total] = await getReviews(roomId, skip, take, sort);

    return CustomResponse.ok(createPaginationResponse(reviews, total, page, limit));
  } catch (error) {
    console.error('리뷰 목록 조회 중 에러 발생: ', {
      roomId: params.roomId,
      error: error instanceof Error ? error.message : error,
    });

    return CustomResponse.errors();
  }
}

export async function POST(request: NextRequest, { params }: { params: ReviewParams }) {
  const session = await auth();
  try {
    if (!session) {
      throw new UnAuthorizedError();
    }

    const roomId = Number(params.roomId);

    if (isNaN(roomId)) {
      throw new BadRequestError('유효하지 않은 ID 형식입니다.');
    }

    const data = createReviewSchema.parse(await request.json());

    await createReview(roomId, session.user.id, data);
    revalidateTag(CACHE_TAGS.ROOMS.DETAIL(roomId));
    return CustomResponse.createEmpty();
  } catch (error) {
    console.error('리뷰 생성 중 에러 발생: ', {
      roomId: params.roomId,
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
