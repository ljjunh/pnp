import { BadRequestError, NotFoundError } from '@/errors';
import { prisma } from '@/lib/server';
import { Prisma } from '@prisma/client';
import { Room } from '@/types/room';
import { extractProperty } from '@/utils/convertor';

/**
 * 숙소 정보를 조회한다
 *
 * @param {number} roomId 방 아이디
 *
 * @returns {Promise<Room>} 방 정보
 */
export async function getRoom(roomId: number): Promise<Room> {
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
      reviewsCount: true,
      reviewsAverage: true,
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
          reviewsAverage: true,
          reviewsCount: true,
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
  };

  return parseRoom;
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

/**
 * 숙소의 가격을 조회한다.
 */
export async function getRoomPrice() {
  const price = await prisma.room.findMany({
    select: {
      price: true,
    },
    orderBy: { price: 'asc' },
  });

  const prices = extractProperty(price, 'price');

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const interval = (maxPrice - minPrice) / 50;

  const distribution = Array.from({ length: 50 }, (_, i) => {
    const rangeStart = minPrice + interval * i;
    const rangeEnd = rangeStart + interval;

    return {
      distance: `${Math.floor(rangeStart)}-${Math.floor(rangeEnd)}`,
      count: 0,
    };
  });

  prices.forEach((price) => {
    const binIndex = Math.floor((price - minPrice) / interval);
    const safeIndex = binIndex >= 50 ? 49 : binIndex;
    distribution[safeIndex].count++;
  });

  const priceData = {
    minPrice,
    maxPrice,
    distribution,
  };

  return priceData;
}

/**
 * 필터 정보에 따라 숙소를 조회한다.
 *
 * @param {string} roomType 방 타입
 * @param {number} bedroom 침실 수
 * @param {number} bed 침대 수
 * @param {number} bathroom 욕실 수
 * @param {string[]} amenityArray 편의시설
 * @param {string[]} option 예약 옵션
 * @param {string[]} language 호스트 언어
 *
 */
interface FilterRoom {
  roomType?: string | null;
  bedroom?: number | null;
  bed?: number | null;
  bathroom?: number | null;
  amenityArray: string[] | null;
  option: string[] | null;
  language: number[] | null;
}

export async function getFilterRoom({
  roomType,
  bedroom,
  bed,
  bathroom,
  amenityArray,
  option,
  language,
}: FilterRoom): Promise<Room[]> {
  const ROOM_TYPE = {
    Entire: 'Entire home/apt',
    Private: 'Private room',
    Shared: 'Shared room',
  };

  const whereConditions: Prisma.RoomWhereInput = {
    ...(roomType && {
      roomType:
        roomType === 'Entire'
          ? ROOM_TYPE.Entire
          : {
              in: [ROOM_TYPE.Private, ROOM_TYPE.Shared],
            },
    }),
    ...(bedroom && {
      roomTags: {
        some: {
          tag: {
            content: {
              in: Array.from({ length: 17 - bedroom + 1 }, (_, i) => `침실 ${i + bedroom}개`),
            },
          },
        },
      },
    }),
    ...(bed && {
      roomTags: {
        some: {
          tag: {
            content: {
              in: Array.from({ length: 17 - bed + 1 }, (_, i) => `침대 ${i + bed}개`),
            },
          },
        },
      },
    }),
    ...(bathroom && {
      roomTags: {
        some: {
          tag: {
            content: {
              in: Array.from(
                { length: 10 - bathroom + 1 },
                (_, i) => `욕실 ${(i + bathroom) / 2}개`,
              ),
            },
          },
        },
      },
    }),
    ...(amenityArray && {
      amenities: {
        some: {
          amenity: {
            icon: {
              in: amenityArray,
            },
          },
        },
      },
    }),
    ...(option && {
      amenities: {
        some: {
          amenity: {
            icon: {
              in: option,
            },
          },
        },
      },
    }),
    ...(language && {
      host: {
        languages: {
          some: {
            language: {
              id: {
                in: language,
              },
            },
          },
        },
      },
    }),
  };

  const rooms = await prisma.room.findMany({
    relationLoadStrategy: 'join',
    where: whereConditions,
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
      reviewsCount: true,
      reviewsAverage: true,
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
          reviewsAverage: true,
          reviewsCount: true,
          languages: {
            select: {
              language: {
                select: {
                  content: true,
                },
              },
            },
          },
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

  const parseRooms = rooms.map((room) => ({
    ...room,
    roomTags: room.roomTags.map((tag) => tag.tag),
    rules: room.rules.map((rule) => rule.rule),
    amenities: room.amenities.map((amenity) => amenity.amenity),
    host: {
      ...room.host,
      hostTags: room.host.hostTags.map((tag) => tag.tag),
    },
  }));

  return parseRooms;
}
