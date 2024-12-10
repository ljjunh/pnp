import { NextRequest, NextResponse } from 'next/server';
import { getPaginationMetadata, getPaginationParams, getSkipTake, prisma } from '@/lib/server';

interface ReviewRouteParams {
  roomId: number;
}

export async function GET(
  request: NextRequest,
  { params: { roomId } }: { params: ReviewRouteParams },
) {
  try {
    const { page, limit } = getPaginationParams(request);
    const { skip, take } = getSkipTake(page, limit);

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where: { roomId },
        orderBy: { createdAt: 'desc' },
        ...{ skip, take },
      }),
      prisma.review.count({
        where: { roomId },
      }),
    ]);

    return NextResponse.json({
      data: reviews,
      metadata: getPaginationMetadata(total, page, limit),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '리뷰 목록을 가져오는데 실패했습니다.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: ReviewRouteParams }) {
  // 새로운 리뷰 생성
  return NextResponse.json({ message: '리뷰 생성 완료' });
}
