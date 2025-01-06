import { revalidateTag } from 'next/cache';
import { auth } from '@/auth';
import { createReview, deleteReview, updateReview } from '@/apis/reviews/actions';
import { CACHE_TAGS } from '@/constants/cacheTags';

// auth 모킹
jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));

// revalidateTag 모킹
jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

describe('Review Action Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createReview', () => {
    // 모든 테스트에서 사용할 입력값
    const input = {
      accuracy: 5,
      checkIn: 5,
      cleanliness: 5,
      communication: 5,
      location: 5,
      value: 5,
      content: '테스트입니다.',
      orderNumber: '1111-1111-1111',
    };

    test('성공적으로 리뷰를 생성한다', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      const result = await createReview(201, input);

      expect(result.success).toBe(true);
      expect(result.status).toBe(201);
      expect(revalidateTag).toHaveBeenCalledTimes(2);
      expect(revalidateTag).toHaveBeenCalledWith(CACHE_TAGS.REVIEWS.DETAIL(201));
      expect(revalidateTag).toHaveBeenCalledWith(CACHE_TAGS.REVIEWS.AVAILABLE(201));
    });

    test('로그인 하지 않은 경우 401 응답 객체를 반환한다', async () => {
      (auth as jest.Mock).mockResolvedValue(null);

      const result = await createReview(1, input);

      expect(result.success).toBe(false);
      expect(result.status).toBe(401);
      expect(result.message).toBe('로그인이 필요합니다.');
    });

    test('서버 에러 응답에 message가 없는 경우 기본 메시지를 반환한다', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      const result = await createReview(502, input);

      expect(result.success).toBe(false);
      expect(result.status).toBe(500);
      expect(result.message).toBe('리뷰 작성에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    });

    test('서버에서 에러 응답이 온 경우 서버에서 온 응답 객체(success, status, message)를 그대로 반환한다', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      const result = await createReview(500, input);

      expect(result.success).toBe(false);
      expect(result.status).toBe(500);
      expect(result.message).toBe('서버 에러가 발생했습니다.');
    });

    test('네트워크 에러 발생 시 500 응답 객체를 반환한다', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      const result = await createReview(501, input);

      expect(result.success).toBe(false);
      expect(result.status).toBe(500);
      expect(result.message).toBe(
        '네트워크 문제로 리뷰 작성에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
      );
    });
  });

  describe('updateReview', () => {
    // 모든 테스트에서 사용할 입력값
    const input = {
      accuracy: 5,
      checkIn: 5,
      cleanliness: 5,
      communication: 5,
      location: 5,
      value: 5,
      content: '테스트입니다.',
    };
    const roomId = 1;

    test('성공적으로 리뷰를 수정한다', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      const result = await updateReview(roomId, 200, input);

      expect(result.success).toBe(true);
      expect(result.status).toBe(200);
      expect(revalidateTag).toHaveBeenCalledWith(CACHE_TAGS.REVIEWS.DETAIL(roomId));
      expect(revalidateTag).toHaveBeenCalledTimes(1);
    });

    test('로그인 하지 않은 경우 401 응답 객체를 반환한다', async () => {
      (auth as jest.Mock).mockResolvedValue(null);

      const result = await updateReview(roomId, 1, input);

      expect(result.success).toBe(false);
      expect(result.status).toBe(401);
      expect(result.message).toBe('로그인이 필요합니다.');
    });

    test('서버 에러 응답에 message가 없는 경우 기본 메시지를 반환한다', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      const result = await updateReview(roomId, 502, input);
      expect(result.success).toBe(false);
      expect(result.status).toBe(500);
      expect(result.message).toBe('리뷰 수정에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    });

    test('서버에서 에러 응답이 온 경우 서버에서 온 응답 객체(success,status,message)를 그대로 반환한다', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      const result = await updateReview(roomId, 500, input);

      expect(result.success).toBe(false);
      expect(result.status).toBe(500);
      expect(result.message).toBe('서버 에러가 발생했습니다.');
    });

    test('네트워크 에러 발생 시 500 응답 객체를 반환한다', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      const result = await updateReview(roomId, 501, input);

      expect(result.success).toBe(false);
      expect(result.status).toBe(500);
      expect(result.message).toBe(
        '네트워크 문제로 리뷰 수정에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
      );
    });
  });

  describe('deleteReview', () => {
    const roomId = 1;

    test('성공적으로 리뷰를 삭제한다', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      const result = await deleteReview(roomId, 204);

      expect(result.success).toBe(true);
      expect(result.status).toBe(204);
      expect(revalidateTag).toHaveBeenCalledTimes(2);
      expect(revalidateTag).toHaveBeenCalledWith(CACHE_TAGS.REVIEWS.DETAIL(roomId));
      expect(revalidateTag).toHaveBeenCalledWith(CACHE_TAGS.REVIEWS.AVAILABLE(roomId));
    });

    test('로그인 하지 않은 경우 401 응답 객체를 반환한다', async () => {
      (auth as jest.Mock).mockResolvedValue(null);

      const result = await deleteReview(roomId, 401);

      expect(result.success).toBe(false);
      expect(result.status).toBe(401);
      expect(result.message).toBe('로그인이 필요합니다.');
    });

    test('서버 에러 응답에 message가 없는 경우 기본 메시지를 반환한다', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      const result = await deleteReview(roomId, 502);

      expect(result.success).toBe(false);
      expect(result.status).toBe(500);
      expect(result.message).toBe('리뷰 삭제에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    });

    test('서버에서 에러 응답이 온 경우 서버에서 온 응답 객체(success, status, message)를 그대로 반환한다', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      const result = await deleteReview(roomId, 500);

      expect(result.success).toBe(false);
      expect(result.status).toBe(500);
      expect(result.message).toBe('서버 에러가 발생했습니다.');
    });

    test('네트워크 에러 발생 시 500 응답 객체를 반환한다', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      const result = await deleteReview(roomId, 501);

      expect(result.success).toBe(false);
      expect(result.status).toBe(500);
      expect(result.message).toBe(
        '네트워크 문제로 리뷰 삭제에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
      );
    });
  });
});
