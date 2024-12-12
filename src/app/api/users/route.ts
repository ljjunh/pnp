import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { CustomError, UnAuthorizedError } from '@/errors';
import { CustomResponse } from '@/lib/server';
import { updateUserSchema } from '@/schemas/user';
import { getUser, updateUser } from '@/services/user';
import { z } from 'zod';
import { User } from '@/types/user';

export async function GET(): Promise<CustomResponse<User | undefined>> {
  try {
    const session = await auth();

    if (!session) {
      throw new UnAuthorizedError();
    }

    const userId = session.user.id;

    const user = await getUser(userId);

    return CustomResponse.ok<User>(user);
  } catch (error) {
    console.error(error);

    if (error instanceof CustomError) {
      return CustomResponse.errors(error.message, error.statusCode);
    }

    return CustomResponse.errors();
  }
}

export async function PATCH(request: NextRequest): Promise<CustomResponse<undefined>> {
  try {
    const session = await auth();

    if (!session) {
      throw new UnAuthorizedError();
    }

    const userId = session.user.id;
    const data = updateUserSchema.parse(await request.json());

    await updateUser(userId, data);

    return CustomResponse.empty();
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return CustomResponse.zod('잘못된 요청 데이터입니다.', 400, error.errors);
    } else if (error instanceof CustomError) {
      return CustomResponse.errors(error.message, error.statusCode);
    }

    return CustomResponse.errors();
  }
}
