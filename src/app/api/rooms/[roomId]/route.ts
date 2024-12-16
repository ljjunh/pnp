import { NextRequest } from 'next/server';
import { BadRequestError, CustomError } from '@/errors';
import { CustomResponse } from '@/lib/server';
import { getRoom } from '@/services/room';
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
