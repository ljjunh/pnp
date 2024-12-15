import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { CustomError, UnAuthorizedError, ZodError } from '@/errors';
import { CustomResponse } from '@/lib/server';
import { updateUserSchema } from '@/schemas/user';
import { getUser, updateUser } from '@/services/user';
import { User } from '@/types/user';

export async function GET(): Promise<CustomResponse<User | undefined>> {
  const session = await auth();
  try {
    if (!session) {
      throw new UnAuthorizedError();
    }

    const userId = session.user.id;

    const user = await getUser(userId);

    return CustomResponse.ok(user);
  } catch (error) {
    console.error('유저 정보 조회 중 에러 발생: ', {
      userId: session?.user.id,
      error: error instanceof Error ? error.message : error,
    });

    if (error instanceof CustomError) {
      return CustomResponse.errors(error.message, error.statusCode);
    }

    return CustomResponse.errors();
  }
}

export async function PATCH(request: NextRequest): Promise<CustomResponse<undefined>> {
  const session = await auth();
  try {
    if (!session) {
      throw new UnAuthorizedError();
    }

    const userId = session.user.id;
    const data = updateUserSchema.parse(await request.json());

    await updateUser(userId, data);

    console.info('사용자 정보 업데이트:', {
      userId,
      updatedFields: Object.keys(data),
      timestamp: new Date().toISOString(),
    });

    return CustomResponse.empty();
  } catch (error) {
    console.error('사용자 정보 업데이트 중 에러 발생: ', {
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
