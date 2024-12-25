import { BadRequestError, NotFoundError } from '@/errors';
import { ForbiddenError } from '@/errors/errors';
import { prisma } from '@/lib/server';
import { CreateReservationInput, ReservationAvailableInput } from '@/schemas';
import { Reservation } from '@/types/reservation';

/**
 * 새롭게 숙소를 예약한다.
 *
 * @param {string} userId 사용자 ID
 * @param {CreateReservationInput} data 예약 생성 데이터
 * @returns {Promise<{
 *  reservationId: number;
 *  orderNumber: string;
 * }>} 예약 ID
 */
export async function createReservation(
  userId: string,
  data: CreateReservationInput,
): Promise<{
  reservationId: number;
  orderNumber: string;
}> {
  const room = await prisma.room.findUnique({
    where: {
      id: data.roomId,
    },
  });

  // * 존재하지 않는 숙소인 경우
  if (!room) {
    throw new NotFoundError();
  }

  // * 숙소의 인원 수를 넘은 경우
  if (room.capacity < data.guestNumber) {
    throw new BadRequestError('숙소의 최대 인원 수를 초과하였습니다.');
  }

  // * 이미 예약이 되어있는지 확인
  const isAlreadyReserve = await prisma.reservation.findFirst({
    where: {
      roomId: data.roomId,
      checkIn: {
        lte: data.checkOut,
      },
      checkOut: {
        gte: data.checkIn,
      },
    },
  });

  if (isAlreadyReserve) {
    throw new BadRequestError('이미 예약이 되어있습니다.');
  }

  // * 예약한 숙박 일수를 계산
  const differenceInTime = data.checkOut.getTime() - data.checkIn.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  const price = room.price * differenceInDays;

  // * 주문 번호 생성
  const orderNumber = generateOrderNumber(data.roomId);

  const reservation = await prisma.reservation.create({
    data: {
      userId: userId,
      roomId: data.roomId,
      orderNumber: orderNumber,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guestNumber: data.guestNumber,
      totalPrice: price,
    },
  });

  return {
    reservationId: reservation.id,
    orderNumber: orderNumber,
  };
}

/**
 * 주문 번호를 기반으로 예약 정보를 가져온다.
 *
 * @param {string} userId 사용자 ID
 * @param {string} orderNumber 주문 번호
 *
 * @returns {Promise<Reservation>} 예약 정보
 */
export async function getReservationByOrderNumber(
  userId: string,
  orderNumber: string,
): Promise<Reservation> {
  const reservation = await prisma.reservation.findUnique({
    relationLoadStrategy: 'join',
    where: {
      orderNumber: orderNumber,
    },
    select: {
      userId: true,
      roomId: true,
      orderNumber: true,
      checkIn: true,
      totalPrice: true,
      checkOut: true,
      guestNumber: true,
      // * 숙소 정보 한번에 조회
      room: {
        select: {
          title: true,
          thumbnail: true,
          reviewsCount: true,
          reviewsAverage: true,
          propertyType: true,
          // * 숙소의 호스트 정보
          host: {
            select: {
              id: true,
              isSuperHost: true,
              isVerified: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!reservation) {
    throw new NotFoundError('존재하지 않는 예약 정보입니다.');
  }

  if (reservation.userId !== userId) {
    throw new ForbiddenError('해당 예약 정보에 접근할 권한이 없습니다.');
  }

  return reservation;
}

/**
 * 주문 번호를 기반으로 예약을 취소한다.
 *
 * @param {string} orderNumber 주문 번호
 * @param {string} userId 사용자 ID
 */
export async function cancelReservation(orderNumber: string, userId: string) {
  const reservation = await prisma.reservation.findUnique({
    where: {
      orderNumber: orderNumber,
    },
  });

  if (!reservation) {
    throw new NotFoundError('존재하지 않는 예약 정보입니다.');
  }

  if (reservation.status === 'CANCELED') {
    throw new BadRequestError('이미 취소된 예약입니다.');
  }

  // * 체크인 24시간 전까지 취소할 수 있음
  const checkInDate = new Date(reservation.checkIn);
  const now = new Date();
  const hoursUntilCheckIn = (checkInDate.getTime() - now.getTime()) / (1000 * 3600);
  if (hoursUntilCheckIn < 24) {
    throw new BadRequestError('체크인 24시간 전까지 취소할 수 있습니다.');
  }

  if (reservation.userId !== userId) {
    throw new ForbiddenError('해당 예약 정보에 접근할 권한이 없습니다.');
  }

  await prisma.reservation.update({
    where: {
      orderNumber: orderNumber,
    },
    data: {
      status: 'CANCELED',
    },
  });
}

/**
 * 주문 번호를 기반으로 예약을 확정짓는다.
 *
 * @param {string} orderNumber 주문 번호
 * @param {string} userId 사용자 ID (호스트)
 */
export async function confirmReservation(orderNumber: string, userId: string) {
  const reservation = await prisma.reservation.findUnique({
    relationLoadStrategy: 'join',
    where: {
      orderNumber: orderNumber,
    },
    select: {
      status: true,
      room: {
        select: {
          host: {
            select: {
              userId: true,
            },
          },
        },
      },
    },
  });

  if (!reservation) {
    throw new NotFoundError('존재하지 않는 예약 정보입니다.');
  }

  if (reservation.room.host.userId !== userId) {
    throw new ForbiddenError('해당 예약 정보에 접근할 권한이 없습니다.');
  }

  // * 이미 확정된 예약이거나 취소된 예약인 경우는 확정할 수 없음
  if (reservation.status === 'CANCELED' || reservation.status === 'CONFIRMED') {
    throw new BadRequestError('확정할 수 없는 예약입니다.');
  }

  await prisma.reservation.update({
    where: {
      orderNumber: orderNumber,
    },
    data: {
      status: 'CONFIRMED',
    },
  });
}

/**
 * 예약 가능 여부를 확인한다.
 *
 * @param {ReservationAvailableInput} data 예약 가능 여부 확인 데이터
 */
export async function checkReservation(data: ReservationAvailableInput): Promise<boolean> {
  const reservation = await prisma.reservation.findFirst({
    where: {
      roomId: data.roomId,
      status: {
        in: ['PAYMENT', 'CONFIRMED', 'PENDING'],
      },
      checkIn: {
        lte: data.checkIn,
      },
      checkOut: {
        gte: data.checkOut,
      },
    },
  });

  return !reservation;
}

/**
 * 주문 번호를 생성한다.
 *
 * @param {number} roomId Room ID
 * @returns {string} 주문 번호
 */
const generateOrderNumber = (roomId: number): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const MAX_ROOM_ID = 999_999_999;
  const paddedRoomId = roomId.toString().padStart(MAX_ROOM_ID.toString().length, '0');

  const random = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(6, '0');

  return `${year}${month}${day}-${paddedRoomId}-${random}`;
};
