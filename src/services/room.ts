import { BadRequestError, NotFoundError } from '@/errors';
import { prisma } from '@/lib/server';
import { RoomWithReview } from '@/types/room';
import { extractProperty } from '@/utils/convertor';

/**
 * 숙소 정보를 조회한다
 *
 * @param {number} roomId 방 아이디
 *
 * @returns {Promise<RoomWithReview>} 방 정보
 */
export async function getRoom(roomId: number): Promise<RoomWithReview> {
  const room = await prisma.room.findUnique({
    relationLoadStrategy: 'join',
    where: { id: roomId },
    select: {
      id: true,
      airbnbLink: true,
      title: true,
      description: true,
      seoTitle: true,
      seoDescription: true,
      thumbnail: true,
      location: true,
      price: true,
      latitude: true,
      longitude: true,
      capacity: true,
      checkIn: true,
      checkOut: true,
      checkInType: true,
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
      host: {
        select: {
          id: true,
          isSuperHost: true,
          isVerified: true,
          hostStartedAt: true,
          hostTags: {
            select: {
              tag: {
                select: {
                  content: true,
                },
              },
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              image: true,
              email: true,
            },
          },
        },
      },
    },
  });

  if (!room) {
    throw new NotFoundError();
  }

  // TODO: 호스트가 가지고 있는 리뷰와 평점을 추가적으로 조회해야한다.
  const aggregate = await prisma.review.aggregate({
    where: {
      roomId: roomId,
    },
    _avg: {
      rating: true,
    },
    _count: {
      id: true,
    },
  });

  const parseRoom = {
    ...room,
    roomTags: extractProperty(room.roomTags, 'tag'),
    rules: extractProperty(room.rules, 'rule'),
    amenities: extractProperty(room.amenities, 'amenity'),
    host: {
      ...room.host,
      user: {
        ...room.host.user,
      },
      hostTags: extractProperty(room.host.hostTags, 'tag'),
    },
    count: aggregate._count.id,
    average: aggregate._avg.rating,
  };

  return parseRoom as RoomWithReview;
}

/**
 * 숙소 스크랩 여부를 조회한다.
 *
 * @param {number} roomId 방 아이디
 * @param {string} userId 사용자 아이디
 *
 * @returns {Promise<boolean>} 스크랩 여부
 */
export async function isScrap(roomId: number, userId: string): Promise<boolean> {
  const count = await prisma.roomScrap.count({
    where: {
      userId: userId,
      roomId: roomId,
    },
  });

  return count > 0;
}

/**
 * 숙소를 스크랩한다.
 *
 * @param {number} roomId 방 아이디
 * @param {string} userId 사용자 아이디
 */
export async function createRoomScrap(roomId: number, userId: string) {
  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
  });
  if (!room) {
    throw new NotFoundError();
  }

  const exist = await prisma.roomScrap.findUnique({
    where: {
      userId_roomId: {
        roomId: roomId,
        userId: userId,
      },
    },
  });

  if (exist) {
    throw new BadRequestError('이미 스크랩이 되어있습니다.');
  }

  await prisma.roomScrap.create({
    data: {
      roomId: roomId,
      userId: userId,
    },
  });
}

/**
 * 숙소 스크랩을 삭제한다.
 *
 * @param {number} roomId 방 아이디
 * @param {string} userId 사용자 아이디
 */
export async function deleteRoomScrap(roomId: number, userId: string) {
  const exist = await prisma.roomScrap.findUnique({
    where: {
      userId_roomId: {
        roomId: roomId,
        userId: userId,
      },
    },
  });

  if (!exist) {
    throw new BadRequestError('스크랩 되어있지 않습니다.');
  }

  await prisma.roomScrap.delete({
    where: {
      userId_roomId: {
        userId: userId,
        roomId: roomId,
      },
    },
  });
}
