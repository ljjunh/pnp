import { NextRequest } from 'next/server';
import { auth, update } from '@/auth';
import { BadRequestError, CustomError, UnAuthorizedError } from '@/errors';
import { CustomResponse } from '@/lib/server';
import { remove, upload } from '@/lib/server/s3';
import { updateUserImage } from '@/services/user';

export async function POST(request: NextRequest) {
  const session = await auth();
  try {
    if (!session) {
      throw new UnAuthorizedError();
    }

    const formData = await request.formData();
    const image = formData.get('image') as File;

    if (!image) {
      throw new BadRequestError('이미지가 업로드 되지 않았습니다.');
    }

    if (session.user.image?.startsWith('users')) {
      await remove(session.user.image);
    }

    const key = await upload(image, 'users');
    update({
      user: {
        image: key,
      },
    });

    await updateUserImage(session.user.id, key);

    return CustomResponse.empty();
  } catch (error) {
    if (error instanceof CustomError) {
      return CustomResponse.errors(error.message, error.statusCode);
    }

    return CustomResponse.errors();
  }
}
