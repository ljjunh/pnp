import { NextRequest } from 'next/server';
import { CustomError } from '@/errors';
import { CustomResponse } from '@/lib/server';
import { getRoom } from '@/services/room';
import { Room, RoomParams } from '@/types/room';

export async function GET(
  request: NextRequest,
  { params }: { params: RoomParams },
): Promise<CustomResponse<Room | undefined>> {
  try {
    const roomId = +params.roomId;

    const room = await getRoom(roomId);

    const roomData = {
      ...room,
      roomTags: room.roomTags.map((tag) => tag.tag),
      images: room.images,
      rules: room.rules.map((rule) => rule.rule),
      amenities: room.amenities.map((amenity) => amenity.amenity),
    };

    return CustomResponse.ok<Room>(roomData);
  } catch (error) {
    if (error instanceof CustomError) {
      return CustomResponse.errors(error.message, error.statusCode);
    }

    return CustomResponse.errors();
  }
}
