import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/server';

interface Params {
  roomId: string;
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const roomId = Number(params.roomId);

  const room = await prisma.room.findUnique({
    where: { id: roomId },
    include: {
      roomTags: {
        select: {
          tag: {
            select: {
              id: true,
              content: true,
            },
          },
        },
      },
      images: {
        select: {
          id: true,
          imageLink: true,
          orientation: true,
        },
      },
      rules: {
        select: {
          rule: true,
        },
      },
      amenities: {
        select: {
          amenity: true,
        },
      },
    },
  });

  if (!room) {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 });
  }

  const roomData = {
    ...room,
    roomTags: room.roomTags.map((tag) => tag.tag),
    roomRules: room.rules.map((rule) => rule.rule),
    roomAmenities: room.amenities.map((amenity) => amenity.amenity),
  };

  return NextResponse.json(roomData);
}
