import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { CustomError, UnAuthorizedError, ZodError } from '@/errors';
import { CustomResponse } from '@/lib/server';
import { createReservationSchema } from '@/schemas';
import { createReservation } from '@/services/reservation';
import { CreateReservationResponse } from '@/types/reservation';

export async function POST(
  request: NextRequest,
): Promise<CustomResponse<CreateReservationResponse>> {
  const session = await auth();
  try {
    if (!session) {
      throw new UnAuthorizedError();
    }

    const data = createReservationSchema.parse(await request.json());
    const { reservationId, orderNumber } = await createReservation(session.user.id, data);

    return CustomResponse.create({
      reservationId,
      orderNumber,
    });
  } catch (error) {
    console.error('예약 생성 중 에러 발생: ', {
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
