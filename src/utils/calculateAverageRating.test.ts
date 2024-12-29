import { calculateAverageRating } from '@/utils/calculateAverageRating';

describe('calculateAverageRating 테스트', () => {
  test('점수 배열이 주어지면 평균값을 반환한다', () => {
    const scores = [5, 4, 3, 5, 4, 5];
    expect(calculateAverageRating(scores)).toBe(4.333333333333333);
  });

  test('빈 배열이 주어지면 0을 반환한다', () => {
    expect(calculateAverageRating([])).toBe(0);
  });
});
