import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { BadRequestError, CustomError, UnAuthorizedError } from '@/errors';
import { CustomResponse } from '@/lib/server';
import { getRoomImages, uploadRoomImages } from '@/services/room';
import { RoomImage } from '@prisma/client';
import { RoomParams } from '@/types/room';

export async function GET(
  request: NextRequest,
  { params }: { params: RoomParams },
): Promise<CustomResponse<RoomImage[]>> {
  const session = await auth();
  try {
    if (!session) {
      throw new UnAuthorizedError();
    }

    const roomId = Number(params.roomId);

    if (Number.isNaN(roomId)) {
      throw new BadRequestError('유효하지 않은 ID 형식입니다.');
    }

    const images = await getRoomImages(roomId, session.user.id);

    return CustomResponse.ok({ images });
  } catch (error) {
    console.error('숙소 이미지 조회 중 에러 발생: ', {
      roomId: params.roomId,
      userId: session?.user.id,
      error: error instanceof Error ? error.message : error,
    });

    if (error instanceof CustomError) {
      return CustomResponse.errors(error.message, error.statusCode);
    }

    return CustomResponse.errors();
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: RoomParams },
): Promise<CustomResponse> {
  const session = await auth();
  try {
    if (!session) {
      throw new UnAuthorizedError();
    }

    const roomId = Number(params.roomId);

    if (Number.isNaN(roomId)) {
      throw new BadRequestError('유효하지 않은 ID 형식입니다.');
    }

    const formData = await request.formData();
    const images = formData.getAll('images') as File[];

    await uploadRoomImages(roomId, session.user.id, images);

    return CustomResponse.empty();
  } catch (error) {
    console.error('숙소 이미지 업로드 중 에러 발생: ', {
      roomId: params.roomId,
      userId: session?.user.id,
      error: error instanceof Error ? error.message : error,
    });

    if (error instanceof CustomError) {
      return CustomResponse.errors(error.message, error.statusCode);
    }

    return CustomResponse.errors();
  }
}
