import { NextRequest } from 'next/server';
import { BadRequestError, CustomError, ZodError } from '@/errors';
import { CustomResponse } from '@/lib/server';
import { reservationAvailableSchema } from '@/schemas';
import { checkReservation } from '@/services/reservation';
import { ReservationAvailable } from '@/types/reservation';
import { RoomParams } from '@/types/room';

export async function GET(
  request: NextRequest,
  { params }: { params: RoomParams },
): Promise<CustomResponse<ReservationAvailable | undefined>> {
  try {
    const { searchParams } = new URL(request.url);
    const roomId = +params.roomId;

    const checkInParam = searchParams.get('checkIn');
    const checkOutParam = searchParams.get('checkOut');
    if (!checkInParam || !checkOutParam) {
      throw new BadRequestError('체크인 날짜와 체크아웃 날짜는 필수 입력입니다');
    }

    const data = reservationAvailableSchema.parse({
      roomId,
      checkIn: new Date(checkInParam),
      checkOut: new Date(checkOutParam),
    });

    const available = await checkReservation(data);

    return CustomResponse.ok({
      available: available,
      roomId: data.roomId,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
    });
  } catch (error) {
    console.error('예약 가능 여부 확인 중 에러 발생: ', {
      roomId: params.roomId,
      params: request.nextUrl.searchParams,
      error: error,
    });

    if (error instanceof ZodError) {
      return CustomResponse.zod('입력한 값에 오류가 있습니다.', 400, error.errors);
    } else if (error instanceof CustomError) {
      return CustomResponse.errors(error.message, error.statusCode);
    }

    return CustomResponse.errors();
  }
}
