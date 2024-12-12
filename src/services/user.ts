import { prisma } from "@/lib/server";
import { UpdateUserInput } from "@/schemas/user";
import { User } from "@/types/user";

/**
 * 유저 정보 조회
 *
 * @param {string} userId 유저 아이디
 * @returns {Promise<User | null>} 유저 정보
 */
export async function getUser(userId: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      image: true,
      name: true,
      host: {
        select: {
          isSuperHost: true,
          isVerified: true,
          hostStartedAt: true,
          about: true,
          school: true,
          job: true,
          address: true,
          language: true,
          birth: true,
          favoriteSong: true,
          liked: true,
          interested: true,
          noTalented: true,
          bookTitle: true,
          hobby: true,
          pet: true,
          hostTags: {
            select: {
              tag: {
                select: {
                  content: true
                },
              }
            }
          }
        },
      },
    },
  });

  if (!user || !user.host) return null;

  return {
    ...user,
    host: user.host,
  };
}

/**
 * 유저 정보 업데이트
 *
 * @param {string} userId 유저 아이디
 * @param {UpdateUserInput} data 유저 업데이트 데이터
 */
export async function updateUser(userId: string, data: UpdateUserInput) {
  await prisma.user.update({
    where: { id: userId },
    data,
  });
}
