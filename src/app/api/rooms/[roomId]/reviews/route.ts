import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createPaginationResponse, getPaginationParams, getSkipTake, prisma } from '@/lib/server';
import { z } from 'zod';
import { GETResponse, Review, ReviewParams } from '@/types/review';

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  content: z.string().min(10).max(500),
});

export async function GET(
  request: NextRequest,
  { params }: { params: ReviewParams },
): Promise<NextResponse<GETResponse>> {
  try {
    const roomId = +params.roomId;
    const { page, limit } = getPaginationParams(request);
    const { skip, take } = getSkipTake(page, limit);

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        relationLoadStrategy: 'join',
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

export async function POST(
  request: NextRequest,
  { params }: { params: ReviewParams },
): Promise<NextResponse> {
  try {
    const roomId = +params.roomId;
    const data = reviewSchema.parse(await request.json());

    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    if (!accessToken) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    await prisma.review.create({
      data: {
        roomId,
        userId: 'asd',
        rating: data.rating,
        content: data.content,
      },
    });

    return NextResponse.json({ status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '잘못된 요청 데이터입니다.', details: error.errors },
        { status: 400 },
      );
    }

    return NextResponse.json({ error: '리뷰 생성에 실패했습니다.' }, { status: 500 });
  }
}
