import { NextRequest } from 'next/server';
import { CustomError } from '@/errors';
import { CustomResponse } from '@/lib/server';
import { getRoom } from '@/services/room';
import { RoomParams, RoomWithReview } from '@/types/room';

export async function GET(
  request: NextRequest,
  { params }: { params: RoomParams },
): Promise<CustomResponse<RoomWithReview | undefined>> {
  try {
    const roomId = +params.roomId;

    const room = await getRoom(roomId);

    return CustomResponse.ok(room);
  } catch (error) {
    if (error instanceof CustomError) {
      return CustomResponse.errors(error.message, error.statusCode);
    }

    return CustomResponse.errors();
  }
}
