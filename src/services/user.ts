import { User as SessionUser } from 'next-auth';
import { NotFoundError } from '@/errors';
import { prisma, remove } from '@/lib/server';
import { UpdateUserInput } from '@/schemas/user';
import { User } from '@/types/user';

/**
 * 유저 정보 조회
 *
 * @param {string} userId 유저 아이디
 * @returns {Promise<User | null>} 유저 정보
 */
export async function getUser(userId: string): Promise<User> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      image: true,
      name: true,
    },
  });

  if (!user) {
    throw new NotFoundError(`유저 정보를 찾을 수 없습니다. (ID: ${userId})`);
  }

  return user as User;
}

/**
 * 유저 정보 업데이트
 *
 * @param {string} userId 유저 아이디
 * @param {UpdateUserInput} data 유저 업데이트 데이터
 */
export async function updateUser(userId: string, data: UpdateUserInput) {
  const user = await prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
    },
  });

  if (!user) {
    throw new NotFoundError(`유저 정보를 찾을 수 없습니다. (ID: ${userId})`);
  }
}

/**
 * 유저 프로필 이미지 정보 업데이트
 *
 * @param {SessionUser} user
 * @param {string} image 이미지 경로
 */
export async function updateUserImage(user: SessionUser, image: string) {
  const updated = await prisma.$transaction(async (prisma) => {
    const update = await prisma.user.update({
      where: { id: user.id },
      data: { image },
      select: {
        id: true,
      },
    });

    if (user.image?.startsWith('users')) {
      try {
        await remove(user.image);
      } catch (error) {
        console.error('이전 이미지 삭제 실패:', (error as Error).message);
      }
    }

    return update.id === user.id;
  });

  if (!updated) {
    throw new NotFoundError(`유저 정보를 찾을 수 없습니다. (ID: ${user.id})`);
  }
}
