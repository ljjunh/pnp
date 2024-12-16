import { NextRequest } from 'next/server';
import { BadRequestError, CustomError } from '@/errors';
import { CustomResponse } from '@/lib/server';
import { getUser } from '@/services/user';
import { User, UserParams } from '@/types/user';

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: UserParams;
  },
): Promise<CustomResponse<User | undefined>> {
  try {
    const userId = params.userId;

    if (!userId) {
      throw new BadRequestError('유효하지 않은 사용자 ID 입니다.');
    }

    const user = await getUser(userId);

    return CustomResponse.ok(user);
  } catch (error) {
    console.error('유저 정보 조회 중 에러 발생: ', {
      userId: params.userId,
      error: error instanceof Error ? error.message : error,
    });

    if (error instanceof CustomError) {
      return CustomResponse.errors(error.message, error.statusCode);
    }

    return CustomResponse.errors();
  }
}
