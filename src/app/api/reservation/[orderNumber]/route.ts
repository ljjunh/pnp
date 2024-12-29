import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { CustomError, UnAuthorizedError } from '@/errors';
import { CustomResponse } from '@/lib/server';
import {
  cancelReservation,
  confirmReservation,
  getReservationByOrderNumber,
} from '@/services/reservation';
import { Reservation, ReservationParams } from '@/types/reservation';

export async function GET(
  request: NextRequest,
  { params }: { params: ReservationParams },
): Promise<CustomResponse<Reservation | undefined>> {
  const session = await auth();
  try {
    if (!session) {
      throw new UnAuthorizedError();
    }

    const reservation = await getReservationByOrderNumber(session.user.id, params.orderNumber);

    return CustomResponse.ok(reservation);
  } catch (error) {
    console.error('예약 목록 조회 중 에러 발생: ', {
      userId: session?.user.id,
      orderNumber: params.orderNumber,
      error: error instanceof Error ? error.message : error,
    });

    if (error instanceof CustomError) {
      return CustomResponse.errors(error.message, error.statusCode);
    }

    return CustomResponse.errors();
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: ReservationParams },
): Promise<CustomResponse<undefined>> {
  const session = await auth();
  try {
    if (!session) {
      throw new UnAuthorizedError();
    }

    await confirmReservation(session.user.id, params.orderNumber);

    // TODO: 예약 확정 후, 예약 확정 메일 혹은 알림을 보내야할까?

    return CustomResponse.empty();
  } catch (error) {
    console.error('예약 생성 중 에러 발생: ', {
      userId: session?.user.id,
      error: error instanceof Error ? error.message : error,
    });

    if (error instanceof CustomError) {
      return CustomResponse.errors(error.message, error.statusCode);
    }

    return CustomResponse.errors();
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: ReservationParams },
): Promise<CustomResponse<undefined> | Response> {
  const session = await auth();
  try {
    if (!session) {
      throw new UnAuthorizedError();
    }

    await cancelReservation(session.user.id, params.orderNumber);
    return CustomResponse.deleted();
  } catch (error) {
    console.error('예약 취소 중 에러 발생: ', {
      userId: session?.user.id,
      orderNumber: params.orderNumber,
      error: error instanceof Error ? error.message : error,
    });

    if (error instanceof CustomError) {
      return CustomResponse.errors(error.message, error.statusCode);
    }

    return CustomResponse.errors();
  }
}
