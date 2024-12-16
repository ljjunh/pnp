import { differenceInDays, differenceInWeeks, format, isToday, isYesterday } from 'date-fns';
import { ko } from 'date-fns/locale';

// 날짜 상태 반환
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
