import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { CustomError, UnAuthorizedError, ZodError } from '@/errors';
import { CustomResponse } from '@/lib/server';
import { paymentCreateSchema } from '@/schemas/payment';
import { createPayment } from '@/services/payment';

export async function POST(request: NextRequest) {
  const session = await auth();
  try {
    if (!session) {
      throw new UnAuthorizedError();
    }

    const data = paymentCreateSchema.parse(await request.json());
    createPayment(session.user.id, data);

    return CustomResponse.empty();
  } catch (error) {
    console.error('결제 요청에 실패하였습니다.', {
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
