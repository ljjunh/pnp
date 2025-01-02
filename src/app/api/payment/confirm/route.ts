import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { CustomError, NotFoundError, UnAuthorizedError, ZodError } from '@/errors';
import { CustomResponse } from '@/lib/server';
import { paymentConfirmSchema } from '@/schemas/payment';
import { confirmPayment } from '@/services/payment';

export async function POST(request: NextRequest): Promise<CustomResponse> {
  const session = await auth();
  try {
    if (!session) {
      throw new UnAuthorizedError();
    }

    const schema = paymentConfirmSchema;
    const data = schema.parse(await request.json());

    const payment = await confirmPayment(session.user.id, data);

    if (!payment) {
      throw new NotFoundError('결제 정보를 찾을 수 없습니다.');
    }

    return CustomResponse.ok(payment);
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
