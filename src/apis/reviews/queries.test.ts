import { notFound } from 'next/navigation';
import { CustomError } from '@/errors';
import mockReview from '@/mocks/fixtures/reviews.json';
import { getReviewAvailable, getReviews } from '@/apis/reviews/queries';

// next/navigation의 notFound를 모킹
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

describe('Reviews Query Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('getReviews', () => {
    test('성공적으로 리뷰 정보를 가져온다', async () => {
      const result = await getReviews(1);
      expect(result).toEqual(mockReview);
    });

    test('파라미터로 올바른 URL 요청을 보낸다', async () => {
      let result = await getReviews(1, undefined, undefined, 'low');
      expect(result).toEqual(mockReview);

      result = await getReviews(1, undefined, 10);
      expect(result).toEqual(mockReview);

      result = await getReviews(1, 2, 10);
      expect(result).toEqual(mockReview);

      result = await getReviews(1);
      expect(result).toEqual(mockReview);
    });

    test('존재하지 않는 방일 경우 notFound를 호출한다.', async () => {
      await expect(getReviews(404)).rejects.toThrow();
      expect(notFound).toHaveBeenCalled();
    });

    test('서버에서 500 에러 발생 시 에러를 던진다', async () => {
      const error = await getReviews(500).catch((e) => e);
      expect(error).toBeInstanceOf(CustomError);
      expect(error.statusCode).toBe(500);
      expect(error.message).toBe('서버 에러가 발생했습니다.');
    });

    test('네트워크 에러 발생 시 500 CustomError를 던진다', async () => {
      const error = await getReviews(501).catch((e) => e);
      expect(error).toBeInstanceOf(CustomError);
      expect(error.statusCode).toBe(500);
      expect(error.message).toBe(
        '서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      );
    });

    test('페이지네이션 파라미터로 리뷰 정보를 가져온다', async () => {
      // 페이지만 있는 경우
      let result = await getReviews(1, 2);
      expect(result).toEqual(mockReview);

      // limit만 있는 경우
      result = await getReviews(1, undefined, 10);
      expect(result).toEqual(mockReview);

      // page와 limit 모두 있는 경우
      result = await getReviews(1, 2, 10);
      expect(result).toEqual(mockReview);

      // 둘 다 없는 경우 (기본값 사용)
      result = await getReviews(1);
      expect(result).toEqual(mockReview);
    });
  });

  describe('getScrap', () => {
    test('리뷰 작성 권한이 있는 경우 OrderNumbers 배열을 반환한다', async () => {
      const result = await getReviewAvailable(1);
      expect(result).toStrictEqual(['1111-1111-1111']);
    });

    test('리뷰 작성 권한이 없는 경우 빈 배열을 반환한다', async () => {
      const result = await getReviewAvailable(2);
      expect(result).toStrictEqual([]);
    });

    test('서버에서 500 에러 발생 시 빈 배열을 반환한다', async () => {
      const result = await getReviewAvailable(500);
      expect(result).toStrictEqual([]);
    });

    test('네트워크 에러 발생 시 빈 배열을 반환한다', async () => {
      const result = await getReviewAvailable(501);
      expect(result).toStrictEqual([]);
    });

    test('잘못된 요청 에러 발생 시 빈 배열을 반환한다', async () => {
      const result = await getReviewAvailable(400);
      expect(result).toStrictEqual([]);
    });

    test('인증 에러 발생 시 빈 배열을 반환한다', async () => {
      const result = await getReviewAvailable(401);
      expect(result).toStrictEqual([]);
    });
  });
});
