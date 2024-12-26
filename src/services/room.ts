import { BadRequestError, NotFoundError } from '@/errors';
import { ForbiddenError } from '@/errors/errors';
import { prisma, upload } from '@/lib/server';
import { FilterType, PriceFilter, UpdateRoom } from '@/schemas/rooms';
import { Prisma, RoomImage } from '@prisma/client';
import { FilterRoom, PriceFilterRange, Room } from '@/types/room';
import { extractProperty } from '@/utils/convertor';
import { PROPERTY } from '@/constants/property';

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
 *
 * @param {PriceFilter} filter 가격 필터
 */
export async function getRoomPrice(filter: PriceFilter): Promise<PriceFilterRange> {
  const { roomType, property } = filter;

  const whereConditions: Prisma.RoomWhereInput = {
    ...(roomType && {
      roomType: roomType === 'Entire' ? ROOM_TYPE.Entire : ROOM_TYPE.Private || ROOM_TYPE.Shared,
    }),
    ...(property && {
      propertyType: {
        contains: PROPERTY[+property as keyof typeof PROPERTY],
      },
    }),
  };

  const price = await prisma.room.findMany({
    where: whereConditions,
    select: {
      price: true,
    },
    orderBy: { price: 'asc' },
  });

  const prices = extractProperty(price, 'price');

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const interval = (maxPrice - minPrice) / 50;

  // interval이 너무 작은 경우 처리
  const minimumInterval = 15000; // 최소 구간 설정
  const calculatedInterval = Math.max(interval, minimumInterval);

  const distribution = Array.from({ length: 50 }, (_, i) => {
    const rangeStart = minPrice + calculatedInterval * i;
    const rangeEnd = rangeStart + calculatedInterval;

    return {
      distance: `${Math.floor(rangeStart)}-${Math.floor(rangeEnd)}`,
      count: 0,
    };
  });

  // prices가 비어있을 경우
  if (prices.length === 0) {
    return {
      minPrice: 0,
      maxPrice: 0,
      distribution: [],
    };
  }

  // prices가 1개일 경우
  if (minPrice === maxPrice) {
    return {
      minPrice,
      maxPrice,
      distribution: [
        {
          distance: `${minPrice}-${maxPrice}`,
          count: prices.length,
        },
      ],
    };
  }

  prices.forEach((price) => {
    const binIndex = Math.floor((price - minPrice) / calculatedInterval);
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
 * @param {FilterType} filter 필터 정보
 */

const ROOM_TYPE = {
  Entire: 'Entire home/apt',
  Private: 'Private room',
  Shared: 'Shared room',
};

export async function getFilterRoom(filter: FilterType): Promise<FilterRoom[]> {
  const whereConditions = getWhereConditions(filter);

  const rooms = await prisma.room.findMany({
    relationLoadStrategy: 'join',
    where: whereConditions,
    select: {
      id: true,
      location: true,
      price: true,
      latitude: true,
      longitude: true,
      reviewsAverage: true,
      images: {
        select: {
          id: true,
          imageLink: true,
          orientation: true,
        },
      },
    },
  });

  return rooms;
}

/**
 * 숙소 필터 정보에 따라 숙소의 갯수를 조회한다.
 *
 * @param {FilterType} filter 필터 정보
 */
export async function getFilterRoomCount(filter: FilterType): Promise<number> {
  const whereConditions = getWhereConditions(filter);

  const count = await prisma.room.count({
    where: whereConditions,
  });

  return count;
}

/**
 * 필터 정보에 따라 where 조건을 생성한다.
 * @param {FilterType} filter 필터 조건
 *
 */
const getWhereConditions = (filter: FilterType) => {
  const {
    roomType,
    minPrice,
    maxPrice,
    bedroom,
    bed,
    bathroom,
    amenityArray,
    option,
    language,
    property,
  } = filter;

  const whereConditions: Prisma.RoomWhereInput = {};

  if (roomType) {
    whereConditions.roomType =
      roomType === 'Entire' ? ROOM_TYPE.Entire : ROOM_TYPE.Private || ROOM_TYPE.Shared;
  }

  if (minPrice || maxPrice) {
    whereConditions.price = {
      gte: minPrice || 0,
      lte: maxPrice || 10_000_000,
    };
  }

  const tagConditions = [];

  if (bedroom) {
    tagConditions.push({
      roomTags: {
        some: {
          tag: {
            content: {
              in: Array.from({ length: 17 - bedroom + 1 }, (_, i) => `침실 ${i + bedroom}개`),
            },
          },
        },
      },
    });
  }

  if (bed) {
    tagConditions.push({
      roomTags: {
        some: {
          tag: {
            content: {
              in: Array.from({ length: 17 - bed + 1 }, (_, i) => `침대 ${i + bed}개`),
            },
          },
        },
      },
    });
  }

  if (bathroom) {
    tagConditions.push({
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
    });
  }

  if (tagConditions.length > 0) {
    whereConditions.AND = tagConditions;
  }

  if (amenityArray.length > 0 || option.length > 0) {
    whereConditions.amenities = {
      some: {
        amenity: {
          icon: {
            in: [...amenityArray, ...option],
          },
        },
      },
    };
  }

  if (language.length > 0) {
    whereConditions.host = {
      languages: {
        some: {
          language: {
            id: {
              in: language,
            },
          },
        },
      },
    };
  }

  if (property) {
    whereConditions.propertyType = {
      contains: PROPERTY[+property as keyof typeof PROPERTY],
    };
  }

  return whereConditions;
};

/**
 * 숙소를 생성한다.
 *
 * @param {string} userId 호스트 아이디
 * @returns {Promise<number>} 생성된 방 아이디
 */
export async function createRoom(userId: string): Promise<number> {
  const room = await prisma.room.create({
    data: {
      host: {
        connect: {
          userId: userId,
        },
      },
      location: '',
      title: '',
      description: '',
      seoTitle: '',
      seoDescription: '',
      thumbnail: '',
      price: 0,
      latitude: 0,
      longitude: 0,
      capacity: 0,
      checkIn: '',
      checkOut: '',
      checkInType: '',
      propertyType: '',
      roomType: '',
    },
  });

  return room.id;
}

/**
 * 숙소를 수정한다.
 *
 * @param {number} roomId 방 아이디
 * @param {string} userId 호스트 아이디
 * @param {UpdateRoom} data 수정할 방 정보
 */
export async function updateRoom(roomId: number, userId: string, data: UpdateRoom) {
  const room = await prisma.room.findFirst({
    where: {
      id: roomId,
    },
    select: {
      host: {
        select: {
          userId: true,
        },
      },
      reservations: {
        where: {
          NOT: {
            status: 'CANCELED',
          },
          checkIn: {
            lte: new Date(),
          },
        },
      },
    },
  });

  if (!room) {
    throw new NotFoundError();
  }

  if (room.host.userId !== userId) {
    throw new ForbiddenError('본인의 숙소만 수정할 수 있습니다.');
  }

  if (room.reservations.length > 0) {
    throw new BadRequestError('예약이 존재하는 숙소는 수정할 수 없습니다.');
  }

  // TODO: amenity 수정 로직에서 N+1 문제 발생 및 해결 필요.
  const updateData: Prisma.RoomUpdateInput = {
    ...(data.roomType && { roomType: data.roomType }),
    ...(data.bed && { bed: data.bed }),
    ...(data.bathroom && { bathroom: data.bathroom }),
    ...(data.price && { price: data.price }),
    ...(data.bedRoom && { bedRoom: data.bedRoom }),
    ...(data.title && { title: data.title, seoTitle: data.title }),
    ...(data.description && { description: data.description, seoDescription: data.description }),
    ...(data.latitude && { latitude: data.latitude }),
    ...(data.longitude && { longitude: data.longitude }),
    ...(data.location && { location: data.location }),
    ...(data.capacity && { capacity: data.capacity }),
    ...(data.checkIn && { checkIn: data.checkIn }),
    ...(data.checkOut && { checkOut: data.checkOut }),
    ...(data.checkInType && { checkInType: data.checkInType }),
    ...(data.amenities && {
      amenities: {
        connectOrCreate: data.amenities.map((amenityId) => ({
          where: {
            roomId_amenityId: { amenityId, roomId },
          },
          create: { amenityId },
        })),
      },
    }),
    ...(data.rules && {
      rules: {
        connectOrCreate: data.rules.map((ruleId) => ({
          where: {
            roomId_ruleId: { ruleId, roomId },
          },
          create: { ruleId },
        })),
      },
    }),
  };

  await prisma.room.update({
    where: {
      id: roomId,
    },
    data: updateData,
  });
}

/**
 * 숙소에 존재하는 이미지들을 조회한다.
 *
 * @param {number} roomId 방 아이디
 * @param {string} userId 사용자 아이디
 *
 * @returns {Promise<RoomImage[]>} 방 이미지들
 */
export async function getRoomImages(roomId: number, userId: string): Promise<RoomImage[]> {
  const room = await prisma.room.findFirst({
    where: {
      id: roomId,
    },
    select: {
      host: {
        select: {
          userId: true,
        },
      },
      images: true,
    },
  });

  if (!room) {
    throw new NotFoundError();
  }

  if (room.host.userId !== userId) {
    throw new ForbiddenError('본인의 숙소만 조회할 수 있습니다.');
  }

  return room.images;
}

/**
 * 숙소 이미지를 업로드한다.
 *
 * @param {number} roomId 방 아이디
 * @param {string} userId 사용자 아이디
 * @param {File[]} images 이미지 파일들
 */
export async function uploadRoomImages(roomId: number, userId: string, images: File[]) {
  const room = await prisma.room.findFirst({
    where: {
      id: roomId,
    },
    select: {
      host: {
        select: {
          userId: true,
        },
      },
    },
  });

  if (!room) {
    throw new NotFoundError();
  }

  if (room.host.userId !== userId) {
    throw new ForbiddenError('본인의 숙소만 조회할 수 있습니다.');
  }

  const uploadImages = images.map(async (image: File, index: number) => {
    const imageKey = await upload(image, 'rooms');

    return prisma.roomImage.create({
      data: {
        imageLink: imageKey,
        orientation: 'LANDSCAPE',
        roomId: roomId,
        caption: `숙소 이미지 ${index + 1}`,
      },
    });
  });

  await Promise.all(uploadImages);
}
