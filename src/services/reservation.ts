import { BadRequestError, NotFoundError } from '@/errors';
import { prisma } from '@/lib/server';
import { CreateReservationInput } from '@/schemas';

export async function createReservation(userId: string, data: CreateReservationInput) {
  const room = await prisma.room.findUnique({
    where: {
      id: data.roomId,
    },
  });

  if (!room) {
    throw new NotFoundError();
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
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
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
      message: data.message,
    },
  });

  return reservation;
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
