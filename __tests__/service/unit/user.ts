import { NotFoundError } from '@/errors';
import { prisma, remove } from '@/lib/server';
import { getUser, updateUser, updateUserImage } from '@/services/user';
import { mockUser } from '@mocks/user';

jest.mock('@/lib/server', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    $transaction: jest.fn(),
  },
  remove: jest.fn(),
}));

describe('유저 서비스 테스트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    it('ID 값에 맞는 유저 정보를 반환해야합니다.', async () => {
      const userId = '1';
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const user = await getUser(userId);

      expect(user).toEqual(mockUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: userId },
        }),
      );
    });

    it('만약, ID에 해당하는 유저 정보가 없는 경우 에러를 반환해야합니다.', async () => {
      const userId = 'Not Found';
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(getUser(userId)).rejects.toThrow(
        new NotFoundError(`유저 정보를 찾을 수 없습니다. (ID: ${userId})`),
      );
    });
  });

  describe('updateUser', () => {
    const data = { about: '' };

    it('ID 값에 맞는 유저 정보를 업데이트 해야합니다.', async () => {
      const userId = '1';
      (prisma.user.update as jest.Mock).mockResolvedValue(mockUser);

      await updateUser(userId, data);

      expect(prisma.user.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: userId },
          data,
        }),
      );
    });

    it('만약, ID에 해당하는 유저 정보가 없는 경우 에러를 반환해야합니다.', async () => {
      const userId = 'Not Found';
      (prisma.user.update as jest.Mock).mockResolvedValue(null);

      await expect(updateUser(userId, data)).rejects.toThrow(
        new NotFoundError(`유저 정보를 찾을 수 없습니다. (ID: ${userId})`),
      );
    });
  });

  describe('updateUserImage', () => {
    it('유저 프로필 이미지 정보를 업데이트 해야합니다.', async () => {
      const user = { id: '1' };
      const image = 'image.jpg';

      jest.spyOn(prisma, '$transaction').mockImplementation(async (callback) => {
        return await callback(prisma);
      });
      (prisma.user.update as jest.Mock).mockResolvedValue(mockUser);

      await updateUserImage(user, image);

      expect(prisma.$transaction).toHaveBeenCalled();
      expect(prisma.user.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: user.id },
          data: { image },
        }),
      );
    });

    it('만약, 유저가 존재하지 않는다면 에러를 반환해야합니다.', async () => {
      const user = { id: 'Not Found' };
      const image = 'image.jpg';

      jest.spyOn(prisma, '$transaction').mockImplementation(async (callback) => {
        return await callback(prisma);
      });
      (prisma.user.update as jest.Mock).mockResolvedValue(mockUser);

      await expect(updateUserImage(user, image)).rejects.toThrow(
        new NotFoundError(`유저 정보를 찾을 수 없습니다. (ID: ${user.id})`),
      );
    });

    it('만약, 프로필 이미지가 업데이트 되어야 한다면 기존 이미지를 삭제해야합니다.', async () => {
      const user = { id: '1', image: 'users/old.jpg' };
      const image = 'image.jpg';

      jest.spyOn(prisma, '$transaction').mockImplementation(async (callback) => {
        return await callback(prisma);
      });
      (prisma.user.update as jest.Mock).mockResolvedValue(mockUser);

      await updateUserImage(user, image);

      expect(prisma.$transaction).toHaveBeenCalled();
      expect(prisma.user.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: user.id },
          data: { image },
        }),
      );
      expect(remove).toHaveBeenCalledWith(user.image);
    });

    it('만약, 프로필 이미지 업로드에 실패한다면 에러 로그를 출력해야합니다.', async () => {
      const user = { id: '1', image: 'users/old.jpg' };
      const image = 'image.jpg';

      jest.spyOn(prisma, '$transaction').mockImplementation(async (callback) => {
        return await callback(prisma);
      });
      (prisma.user.update as jest.Mock).mockResolvedValue(mockUser);
      (remove as jest.Mock).mockRejectedValue(new Error('Remove Error'));

      await updateUserImage(user, image);

      expect(prisma.$transaction).toHaveBeenCalled();
      expect(prisma.user.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: user.id },
          data: { image },
        }),
      );
      expect(remove).toHaveBeenCalledWith(user.image);
    });
  });
});
