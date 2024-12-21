import { differenceInMonths, differenceInYears, isBefore } from 'date-fns';

/**
 * 주어진 시작일로부터 현재까지의 경과 시간을 계산하여 문자열로 반환하는 함수
 * @param startDate - 시작 날짜
 * @returns 경과 시간을 나타내는 문자열 ('N년' 또는 'N개월' 형식)
 *
 * @description
 * 시작일부터 현재까지의 기간을 계산하여 '년' 또는 '개월' 단위로 표시
 * - 1년 이상: N년
 * - 1년 미만: N개월
 * - 1개월 미만: 1개월
 * - 미래 날짜: 0개월
 *
 * @example
 * ```ts
 * // 1년 2개월 전 날짜
 * formatElapsedTime(new Date('2023-01-01')) // returns "1년"
 *
 * // 5개월 전 날짜
 * formatElapsedTime(new Date('2023-08-01')) // returns "5개월"
 *
 * // 15일 전 날짜
 * formatElapsedTime(new Date('2024-01-15')) // returns "1개월"
 *
 * // 미래 날짜
 * formatElapsedTime(new Date('2025-01-01')) // returns "0개월"
 * ```
 *
 */
export const formatElapsedTime = (startDate: Date): string => {
  const currentDate = new Date();

  // 시작일이 현재보다 미래인 경우 예외 처리
  if (isBefore(currentDate, startDate)) {
    return '0개월';
  }

  // 전체 월 수 계산
  const monthsDiff = differenceInMonths(currentDate, startDate);
  const yearsDiff = differenceInYears(currentDate, startDate);

  // 1년 이상인 경우
  if (yearsDiff >= 1) {
    return `${yearsDiff}년`;
  }
  // 1달 미만이어도 1달로 표시
  return `${monthsDiff === 0 ? 1 : monthsDiff}개월`;
};
