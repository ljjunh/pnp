import { BadRequestError, CustomError } from '@/errors';
import { CustomResponse } from '@/lib/server';
import { getUser } from '@/services/user';
import { User, UserParams } from '@/types/user';

export async function GET({
  params,
}: {
  params: UserParams;
}): Promise<CustomResponse<User | undefined>> {
  try {
    const userId = params.userId;
    if (!userId) {
      throw new BadRequestError();
    }

    const user = await getUser(userId);

    return CustomResponse.ok(user);
  } catch (error) {
    console.error(error);

    if (error instanceof CustomError) {
      return CustomResponse.errors(error.message, error.statusCode);
    }

    return CustomResponse.errors();
  }
}
