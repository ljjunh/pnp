import { BadRequestError, NotFoundError } from '@/errors';
import { ForbiddenError } from '@/errors/errors';
import { prisma } from '@/lib/server';
import {
  cancelReservation,
  checkReservation,
  confirmReservation,
  createReservation,
  getReservationByOrderNumber,
} from '@/services/reservation';
import { mockConfirmReservation, mockReservation } from '@mocks/reservation';
import { mockRoom } from '@mocks/room';

jest.mock('@/lib/server', () => ({
  prisma: {
    room: {
      findUnique: jest.fn(),
    },
    reservation: {
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  },
}));

describe('예약 서비스 테스트', () => {
  const userId = 'user1';
  const data = {
    roomId: 5,
    guestNumber: 2,
    message: '',
    checkIn: new Date('2025-12-01'),
    checkOut: new Date('2025-12-03'),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createReservation', () => {
    it('예약을 생성해야합니다.', async () => {
      const room = mockRoom;

      (prisma.room.findUnique as jest.Mock).mockResolvedValue(room);
      (prisma.reservation.findFirst as jest.Mock).mockResolvedValue(null);

      await createReservation(userId, data);

      expect(prisma.room.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: data.roomId },
        }),
      );

      expect(prisma.reservation.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            roomId: data.roomId,
            checkIn: {
              lte: data.checkOut,
            },
            checkOut: {
              gte: data.checkIn,
            },
          },
        }),
      );

      expect(prisma.reservation.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: {
            userId: userId,
            roomId: data.roomId,
            orderNumber: expect.any(String),
            checkIn: data.checkIn,
            checkOut: data.checkOut,
            guestNumber: data.guestNumber,
            totalPrice: room.price * 2,
            message: data.message,
          },
        }),
      );
    });

    it('존재하지 않는 숙소인 경우 에러를 반환해야합니다.', async () => {
      (prisma.room.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(createReservation(userId, data)).rejects.toThrow(NotFoundError);
    });

    it('만약, 숙소의 인원수를 초과한 경우 에러를 반환해야합니다.', async () => {
      const room = mockRoom;

      (prisma.room.findUnique as jest.Mock).mockResolvedValue(room);

      await expect(createReservation(userId, { ...data, guestNumber: 10 })).rejects.toThrow(
        new BadRequestError('숙소의 최대 인원 수를 초과하였습니다.'),
      );
    });

    it('이미 예약이 되어있는 경우 에러를 반환해야합니다.', async () => {
      (prisma.room.findUnique as jest.Mock).mockResolvedValue(mockRoom);
      (prisma.reservation.findFirst as jest.Mock).mockResolvedValue({});

      await expect(createReservation(userId, data)).rejects.toThrow(
        new BadRequestError('이미 예약이 되어있습니다.'),
      );
    });
  });

  describe('getReservationByOrderNumber', () => {
    const orderNumber = 'orderNumber';

    it('주문 번호를 기반으로 예약 정보를 가져온다.', async () => {
      (prisma.reservation.findUnique as jest.Mock).mockResolvedValue(mockReservation);

      const result = await getReservationByOrderNumber(orderNumber, userId);

      expect(result).toEqual(mockReservation);
      expect(prisma.reservation.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { orderNumber },
        }),
      );
    });

    it('만약, 주문 번호에 해당하는 예약 정보가 없을 경우 에러를 반환해야합니다.', async () => {
      (prisma.reservation.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(getReservationByOrderNumber('wrong orderNumber', userId)).rejects.toBeInstanceOf(
        NotFoundError,
      );
    });

    it('만약, 주문 번호에 해당하는 예약 정보가 다른 유저의 것일 경우 에러를 반환해야합니다.', async () => {
      (prisma.reservation.findUnique as jest.Mock).mockResolvedValue({ userId: 'otherUser' });

      await expect(getReservationByOrderNumber(orderNumber, userId)).rejects.toBeInstanceOf(
        ForbiddenError,
      );
    });
  });

  describe('cancelReservation', () => {
    const orderNumber = 'orderNumber';
    it('예약을 취소해야합니다.', async () => {
      (prisma.reservation.findUnique as jest.Mock).mockResolvedValue(mockReservation);

      await cancelReservation(orderNumber, userId);

      expect(prisma.reservation.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { orderNumber },
          data: { status: 'CANCELED' },
        }),
      );
    });

    it('만약, 주문 번호에 해당하는 예약 정보가 이미 취소된 경우 에러를 반환해야합니다.', async () => {
      (prisma.reservation.findUnique as jest.Mock).mockResolvedValue({ status: 'CANCELED' });

      await expect(cancelReservation(orderNumber, userId)).rejects.toThrow(
        new BadRequestError('이미 취소된 예약입니다.'),
      );
    });

    it('만약, 주문 번호에 해당하는 예약정보가 24시간 이내에 체크인인 경우 취소가 불가능하기에 에러를 반환해야합니다.', async () => {
      (prisma.reservation.findUnique as jest.Mock).mockResolvedValue({
        ...mockReservation,
        checkIn: new Date(),
      });

      await expect(cancelReservation(orderNumber, userId)).rejects.toThrow(
        new BadRequestError('체크인 24시간 전까지 취소할 수 있습니다.'),
      );
    });

    it('만약, 주문 번호에 해당하는 예약 정보가 없을 경우 에러를 반환해야합니다.', async () => {
      (prisma.reservation.findUnique as jest.Mock).mockResolvedValue(null);

      try {
        await cancelReservation('wrong orderNumber', userId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError);
      }
    });

    it('만약, 주문 번호에 해당하는 예약 정보가 다른 유저의 것일 경우 에러를 반환해야합니다.', async () => {
      (prisma.reservation.findUnique as jest.Mock).mockResolvedValue({ userId: 'otherUser' });

      await expect(cancelReservation(orderNumber, userId)).rejects.toBeInstanceOf(ForbiddenError);
    });
  });

  describe('confirmReservation', () => {
    const hostId = 'hostId';
    const orderNumber = 'orderNumber';

    it('예약을 확정해야합니다.', async () => {
      (prisma.reservation.findUnique as jest.Mock).mockResolvedValue(mockConfirmReservation);

      await confirmReservation(orderNumber, hostId);

      expect(prisma.reservation.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { orderNumber },
          data: { status: 'CONFIRMED' },
        }),
      );
    });

    it('만약, 주문번호에 해당하는 예약정보가 없다면 에러를 반환해야합니다.', async () => {
      const orderNumber = 'wrong orderNumber';
      (prisma.reservation.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(confirmReservation(orderNumber, hostId)).rejects.toThrow(
        new NotFoundError('존재하지 않는 예약 정보입니다.'),
      );
    });

    it('만약, 주문번호에 해당하는 예약 정보의 호스트 ID가 다를 경우 에러를 반환해야합니다.', async () => {
      const hostId = 'wrong hostId';
      (prisma.reservation.findUnique as jest.Mock).mockResolvedValue(mockConfirmReservation);

      await expect(confirmReservation(orderNumber, hostId)).rejects.toThrow(
        new ForbiddenError('해당 예약 정보에 접근할 권한이 없습니다.'),
      );
    });

    it('만약, 주문번호에 해당하는 예약 정보가 이미 확정된 경우 에러를 반환해야합니다.', async () => {
      (prisma.reservation.findUnique as jest.Mock).mockResolvedValue({
        ...mockConfirmReservation,
        status: 'CONFIRMED',
      });

      await expect(confirmReservation(orderNumber, hostId)).rejects.toThrow(
        new BadRequestError('확정할 수 없는 예약입니다.'),
      );
    });

    it('만약, 주문번호에 해당하는 예약 정보가 이미 취소된 경우 에러를 반환해야합니다.', async () => {
      (prisma.reservation.findUnique as jest.Mock).mockResolvedValue({
        ...mockConfirmReservation,
        status: 'CANCELLED',
      });

      await expect(confirmReservation(orderNumber, hostId)).rejects.toThrow(
        new BadRequestError('확정할 수 없는 예약입니다.'),
      );
    });
  });

  describe('checkReservation', () => {
    it('예약 가능 여부를 확인한다.', async () => {
      const data = {
        roomId: 1,
        checkIn: new Date('2025-12-01'),
        checkOut: new Date('2025-12-03'),
      };

      (prisma.reservation.findFirst as jest.Mock).mockResolvedValue(null);

      const result = await checkReservation(data);

      expect(result).toBe(true);
      expect(prisma.reservation.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            roomId: data.roomId,
            checkIn: {
              lte: data.checkIn,
            },
            checkOut: {
              gte: data.checkOut,
            },
            status: {
              in: ['PAYMENT', 'CONFIRMED', 'PENDING'],
            },
          },
        }),
      );
    });

    it('만약, 예약이 되어있다면 false를 반환해야합니다.', async () => {
      (prisma.reservation.findFirst as jest.Mock).mockResolvedValue({});

      const result = await checkReservation(data);

      expect(result).toBe(false);
    });
  });
});
