import { BadRequestError, NotFoundError } from '@/errors';
import { prisma } from '@/lib/server';
import { createRoomScrap, deleteRoomScrap, getRoom, isScrap } from '@/services/room';
import { mockRoom } from '@mocks/room';

jest.mock('@/lib/server', () => ({
  prisma: {
    room: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    review: {
      aggregate: jest.fn(),
    },
    roomScrap: {
      count: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe('숙소 서비스 테스트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getRoom', () => {
    it('ID 값에 맞는 숙소 정보를 반환해야합니다.', async () => {
      const roomId = 1;

      (prisma.room.findUnique as jest.Mock).mockResolvedValue(mockRoom);

      const room = await getRoom(1);

      expect(room).toEqual(mockRoom);
      expect(prisma.room.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: roomId },
        }),
      );
    });

    it('숙소 정보가 없을 경우 에러를 반환해야합니다.', async () => {
      (prisma.room.findUnique as jest.Mock).mockResolvedValue(null);

      try {
        await getRoom(1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError);
      }
    });
  });

  describe('isScrap', () => {
    it('스크랩이 되어있다면 true를 반환해야합니다.', async () => {
      const roomId = 1;
      const userId = 'user1';

      (prisma.roomScrap.count as jest.Mock).mockResolvedValue(1);

      const scrap = await isScrap(roomId, userId);

      expect(scrap).toBe(true);
      expect(prisma.roomScrap.count).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId, roomId },
        }),
      );
    });

    it('스크랩이 되지 않았다면 false를 반환해야합니다.', async () => {
      const roomId = 1;
      const userId = 'user1';

      (prisma.roomScrap.count as jest.Mock).mockResolvedValue(0);

      const scrap = await isScrap(roomId, userId);

      expect(scrap).toBe(false);
      expect(prisma.roomScrap.count).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId, roomId },
        }),
      );
    });
  });

  describe('createRoomScrap', () => {
    it('스크랩을 생성해야합니다.', async () => {
      const roomId = 1;
      const userId = 'user1';

      (prisma.room.findUnique as jest.Mock).mockResolvedValue(mockRoom);
      (prisma.roomScrap.findUnique as jest.Mock).mockResolvedValue(null);

      await createRoomScrap(roomId, userId);

      expect(prisma.room.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: roomId },
        }),
      );
      expect(prisma.roomScrap.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId_roomId: { userId, roomId } },
        }),
      );
      expect(prisma.roomScrap.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { userId, roomId },
        }),
      );
    });

    it('이미 스크랩이 되어있다면 에러를 반환해야합니다.', async () => {
      const roomId = 1;
      const userId = 'user1';

      (prisma.roomScrap.findUnique as jest.Mock).mockResolvedValue({
        scrap: { userId, roomId },
      });

      try {
        await createRoomScrap(roomId, userId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError);
      }
    });

    it('숙소 정보가 없을 경우 에러를 반환해야합니다.', async () => {
      const roomId = 1;
      const userId = 'user1';

      (prisma.room.findUnique as jest.Mock).mockResolvedValue(null);

      try {
        await createRoomScrap(roomId, userId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError);
      }
    });
  });

  describe('deleteRoomScrap', () => {
    it('스크랩을 삭제해야합니다.', async () => {
      const roomId = 1;
      const userId = 'user1';

      (prisma.room.findUnique as jest.Mock).mockResolvedValue(mockRoom);
      (prisma.roomScrap.findUnique as jest.Mock).mockResolvedValue({
        scrap: { userId, roomId },
      });

      await deleteRoomScrap(roomId, userId);

      expect(prisma.roomScrap.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId_roomId: { userId, roomId } },
        }),
      );
      expect(prisma.roomScrap.delete).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId_roomId: { roomId, userId } },
        }),
      );
    });

    it('만약, 스크랩이 되어있지 않다면 에러를 반환해야합니다.', async () => {
      const roomId = 1;
      const userId = 'user1';

      (prisma.roomScrap.findUnique as jest.Mock).mockResolvedValue(null);

      try {
        await deleteRoomScrap(roomId, userId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError);
      }
    });
  });
});
