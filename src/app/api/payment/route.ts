import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { CustomError, UnAuthorizedError, ZodError } from '@/errors';
import { CustomResponse } from '@/lib/server';
import { paymentReadySchema } from '@/schemas/payment';
import { createKakaoPayLink } from '@/services/payment';
import { deviceParser } from '@/utils/agent';

export async function GET(request: NextRequest) {
  const session = await auth();

  try {
    if (!session) {
      throw new UnAuthorizedError();
    }

    const agent = deviceParser(request.headers.get('user-agent') || '');

    const searchParam = request.nextUrl.searchParams;

    const data = paymentReadySchema.parse({
      name: searchParam.get('name'),
      orderId: searchParam.get('orderId'),
      amount: Number(searchParam.get('amount')),
      orderName: searchParam.get('orderName'),
    });

    if (data.name === 'KAKAOPAY') {
      const response = await createKakaoPayLink(session.user.id, data);
      const agentLinkMap = {
        mobile: response.mobileLink,
        desktop: response.pcLink,
        android: response.androidLink,
        ios: response.iosLink,
      };
      const link = agentLinkMap[agent] || response.pcLink;
      return CustomResponse.ok({ link, tid: response.tid });
    }

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
