import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { CustomError } from '@/errors';
import { CustomResponse } from '@/lib/server';
import { availableReview } from '@/services/review';
import { RoomParams } from '@/types/room';

export async function GET(
  request: NextRequest,
  { params }: { params: RoomParams },
): Promise<CustomResponse<string[]>> {
  const session = await auth();
  try {
    if (!session) {
      return CustomResponse.ok([]);
    }

    const roomId = Number(params.roomId);
    if (isNaN(roomId)) {
      throw new CustomError('유효하지 않은 ID 형식입니다.', 400);
    }

    const orderNumbers = await availableReview(session.user.id, roomId);

    return CustomResponse.ok(orderNumbers);
  } catch (error) {
    console.error('리뷰 작성 가능 여부 조회 중 에러 발생: ', {
      roomId: params.roomId,
      userId: session?.user.id,
      error: error instanceof Error ? error.message : error,
    });

    if (error instanceof CustomError) {
      return CustomResponse.errors(error.message, error.statusCode);
    }

    return CustomResponse.errors();
  }
}
