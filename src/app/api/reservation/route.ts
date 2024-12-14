import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { CustomError, UnAuthorizedError, ZodError } from '@/errors';
import { CustomResponse } from '@/lib/server';
import { createReservationSchema } from '@/schemas';

export async function POST(request: NextRequest) {
  const session = await auth();
  try {
    if (!session) {
      throw new UnAuthorizedError();
    }

    const data = createReservationSchema.parse(await request.json());
    await createReservation(session.user.id, data);
  } catch (error) {
    if (error instanceof ZodError) {
      return CustomResponse.zod(error.message, 400, error.errors);
    } else if (error instanceof CustomError) {
      return CustomResponse.errors(error.message, error.statusCode);
    }
  }
}
