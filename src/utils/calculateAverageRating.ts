/**
 * 점수 배열의 평균값 계산.
 * @param scores - 계산할 점수 배열
 * @returns 평균 점수. 빈 배열인 경우 0을 반환
 */
export const calculateAverageRating = (scores: number[]): number => {
  if (!scores.length) return 0;
  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
};
