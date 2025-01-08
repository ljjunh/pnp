import { NextRequest } from 'next/server';
import { BadRequestError, CustomError, ZodError } from '@/errors';
import { CustomResponse } from '@/lib/server';
import { reservationAvailableSchema } from '@/schemas';
import { checkReservation } from '@/services/reservation';
import { RoomParams } from '@/types/room';

export async function GET(
  request: NextRequest,
  { params }: { params: RoomParams },
): Promise<CustomResponse<string[]>> {
  try {
    const { searchParams } = new URL(request.url);
    const roomId = Number(params.roomId);
    if (isNaN(roomId)) {
      throw new BadRequestError('유효하지 않은 ID 형식입니다.');
    }

    const year = Number(searchParams.get('year'));
    const month = Number(searchParams.get('month'));
    if (Number.isNaN(year) || Number.isNaN(month)) {
      throw new BadRequestError('년도와 월은 필수 입력입니다.');
    }

    const data = reservationAvailableSchema.parse({
      roomId,
      year,
      month,
    });

    const dates = await checkReservation(data);

    return CustomResponse.ok(dates);
  } catch (error) {
    console.error('예약 가능 여부 확인 중 에러 발생: ', {
      roomId: params.roomId,
      params: request.nextUrl.searchParams,
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
