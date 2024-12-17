import mockReview from '@/mocks/fixtures/reviews.json';
import { getReviews } from '@/apis/reviews/queries';

describe('Reviews API', () => {
  describe('getReviews', () => {
    test('성공적으로 리뷰 정보를 가져온다', async () => {
      const result = await getReviews(1);
      expect(result).toEqual(mockReview);
    });
    test('존재하지 않는 방일 경우 404 에러를 던진다', async () => {
      await expect(getReviews(999)).rejects.toThrow('존재하지 않는 방입니다.');
    });
    test('서버에서 500 에러 발생시 에러를 던진다', async () => {
      await expect(getReviews(888)).rejects.toThrow('서버 에러가 발생했습니다.');
    });
  });
});
