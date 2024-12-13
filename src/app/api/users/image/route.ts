import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { BadRequestError, CustomError, UnAuthorizedError } from '@/errors';
import { CustomResponse } from '@/lib/server';
import { ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE, upload } from '@/lib/server/s3';
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

    if (image.size > MAX_FILE_SIZE) {
      throw new BadRequestError('이미지 크기는 5MB를 초과할 수 없습니다.');
    }

    if (!ALLOWED_IMAGE_TYPES.includes(image.type)) {
      throw new BadRequestError('지원되지 않는 이미지 형식입니다.');
    }

    const newImageKey = await upload(image, 'users');

    await updateUserImage(session.user, newImageKey);

    return CustomResponse.empty();
  } catch (error) {
    if (error instanceof CustomError) {
      return CustomResponse.errors(error.message, error.statusCode);
    }

    return CustomResponse.errors();
  }
}
