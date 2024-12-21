import { differenceInDays, differenceInWeeks, format, isToday, isYesterday } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * 주어진 날짜를 현재 시점 기준으로 상대적인 표현으로 변환하는 함수
 * @param targetDate - 변환할 대상 날짜
 * @returns 상대적 시간 표현 문자열
 * @description
 * 날짜를 다음과 같은 기준으로 상대적으로 변환
 * - 오늘: '오늘'
 * - 어제: '1일 전'
 * - 6일 이내: 'N일 전'
 * - 3주 이내: 'N주 전'
 * - 그 이상: 'YYYY년 M월' 형식
 *
 * @example
 * ```ts
 * const today = new Date();
 * formatRelativeDate(today); // returns "오늘"
 *
 * const yesterday = new Date(today.setDate(today.getDate() - 1));
 * formatRelativeDate(yesterday); // returns "1일 전"
 *
 * const fiveDaysAgo = new Date(today.setDate(today.getDate() - 5));
 * formatRelativeDate(fiveDaysAgo); // returns "5일 전"
 *
 * const twoWeeksAgo = new Date(today.setDate(today.getDate() - 14));
 * formatRelativeDate(twoWeeksAgo); // returns "2주 전"
 *
 * const lastYear = new Date('2023-12-01');
 * formatRelativeDate(lastYear); // returns "2023년 12월"
 * ```
 */
export const formatRelativeDate = (targetDate: Date): string => {
  if (isToday(targetDate)) return '오늘';
  if (isYesterday(targetDate)) return '1일 전';

  if (differenceInDays(new Date(), targetDate) <= 6) {
    return `${differenceInDays(new Date(), targetDate)}일 전`;
  }
  if (differenceInWeeks(new Date(), targetDate) <= 3) {
    return `${differenceInWeeks(new Date(), targetDate)}주 전`;
  }

  return format(targetDate, 'yyyy년 M월', { locale: ko });
};
