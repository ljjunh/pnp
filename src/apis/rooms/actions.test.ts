import { revalidateTag } from 'next/cache';
import { auth } from '@/auth';
import { createScrap } from '@/apis/rooms/actions';
import { CACHE_TAGS } from '@/constants/cacheTags';

// auth 모킹
jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));

// revalidateTag 모킹
jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

describe('Scrap Action Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createScrap', () => {
    test('성공적으로 스크랩에 성공한다', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      const result = await createScrap(201);

      expect(result.success).toBe(true);
      expect(result.status).toBe(201);
      expect(revalidateTag).toHaveBeenCalledWith(CACHE_TAGS.ROOMS.SCRAP(201));
      expect(revalidateTag).toHaveBeenCalledTimes(1);
    });

    test('로그인 하지 않은 경우 api호출을 하지 않고 401 응답 객체를 반환한다', async () => {
      (auth as jest.Mock).mockResolvedValue(null);

      const result = await createScrap(1);

      expect(result.success).toBe(false);
      expect(result.status).toBe(401);
      expect(result.message).toBe('로그인이 필요합니다.');
    });

    test('서버에서 401응답이 오는 경우 401 응답 객체를 반환한다', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });
      const result = await createScrap(401);

      expect(result.success).toBe(false);
      expect(result.status).toBe(401);
      expect(result.message).toBe('인증되지 않은 요청입니다');
    });

    test('서버 에러 응답에 message가 없는 경우 기본 메시지를 반환한다', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      const result = await createScrap(502);

      expect(result.success).toBe(false);
      expect(result.status).toBe(500);
      expect(result.message).toBe('스크랩에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    });

    test('서버에서 에러 응답이 온 경우 서버에서 온 응답 객체(success, status, message)를 그대로 반환한다', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      const result = await createScrap(500);

      expect(result.success).toBe(false);
      expect(result.status).toBe(500);
      expect(result.message).toBe('서버 에러가 발생했습니다.');
    });

    test('네트워크 에러 발생 시 500 응답 객체를 반환한다', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      const result = await createScrap(501);

      expect(result.success).toBe(false);
      expect(result.status).toBe(500);
      expect(result.message).toBe(
        '네트워크 문제로 스크랩에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
      );
    });
  });
});
