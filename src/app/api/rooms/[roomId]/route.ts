import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { BadRequestError, CustomError, UnAuthorizedError, ZodError } from '@/errors';
import { CustomResponse } from '@/lib/server';
import { updateRoomSchema } from '@/schemas/rooms';
import { getRoom, updateRoom } from '@/services/room';
import { Room, RoomParams } from '@/types/room';

export async function GET(
  request: NextRequest,
  { params }: { params: RoomParams },
): Promise<CustomResponse<Room | undefined>> {
  try {
    const roomId = Number(params.roomId);

    if (isNaN(roomId)) {
      throw new BadRequestError('유효하지 않은 ID 형식입니다.');
    }

    const room = await getRoom(roomId);

    return CustomResponse.ok(room);
  } catch (error) {
    if (error instanceof CustomError) {
      return CustomResponse.errors(error.message, error.statusCode);
    }

    return CustomResponse.errors();
  }
}

export async function PATCH(request: NextRequest, { params }: { params: RoomParams }) {
  const session = await auth();
  try {
    if (!session) {
      throw new UnAuthorizedError();
    }

    const roomId = Number(params.roomId);

    if (isNaN(roomId)) {
      throw new BadRequestError('유효하지 않은 ID 형식입니다.');
    }

    const data = updateRoomSchema.partial().parse(await request.json());

    await updateRoom(roomId, session.user.id, data);

    return CustomResponse.empty();
  } catch (error) {
    console.error('숙소 정보 수정 중 에러 발생: ', {
      roomId: params.roomId,
      userId: session?.user.id,
      error: error instanceof Error ? error.message : error,
    });

    if (error instanceof CustomError) {
      return CustomResponse.errors(error.message, error.statusCode);
    } else if (error instanceof ZodError) {
      return CustomResponse.zod(400, error.errors);
    }

    return CustomResponse.errors();
  }
}
