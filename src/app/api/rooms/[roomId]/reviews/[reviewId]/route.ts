import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { updateReviewSchema } from '@/schemas/review';
import { deleteReview, updateReview } from '@/services/review';

interface Params {
  reviewId: string;
}

export async function PATCH(request: NextRequest, { params }: { params: Params }) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    const data = updateReviewSchema.parse(await request.json());

    const reviewId = +params.reviewId;

    // TODO: 만약, reviewId에 해당하는 리뷰가 없다면 404 에러를 번환 처리해야할까?
    // TODO: 만약, reviewId에 해당하는 리뷰는 있지만, 현재 로그인한 사용자가 작성한 리뷰가 아니라면 403 에러를 반환 처리해야할까?
    await updateReview(reviewId, session.user.id, data.rating, data.content);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '리뷰 수정 실패' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    const reviewId = +params.reviewId;
    await deleteReview(reviewId, session.user.id);

    return NextResponse.json({ success: true, message: '리뷰 삭제 완료' }, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '리뷰 삭제 실패' }, { status: 500 });
  }
}
