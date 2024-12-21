import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { CustomError, UnAuthorizedError, ZodError } from '@/errors';
import { CustomResponse } from '@/lib/server';
import { paymentConfirmSchema } from '@/schemas/payment';
import { confirmPayment } from '@/services/payment';
import { PaymentConfirmParams } from '@/types/payment';

export async function POST(request: NextRequest, { params }: { params: PaymentConfirmParams }) {
  const session = await auth();
  try {
    if (!session) {
      throw new UnAuthorizedError();
    }

    const schema = paymentConfirmSchema[params.provider];
    const data = schema.parse(await request.json());

    await confirmPayment(params.provider, session.user.id, data);

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
