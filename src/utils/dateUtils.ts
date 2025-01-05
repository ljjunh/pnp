import { addDays, differenceInDays, format } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * 날짜를 지정된 형식의 한국어 문자열로 포맷팅
 * @param date - 포맷팅할 Date 객체
 * @param formatStr - 날짜 포맷 문자열 (기본값: 'yyyy년 M월 d일')
 * @returns 포맷팅된 날짜 문자열
 */
export const formatDate = (date: Date, formatStr: string = 'yyyy년 M월 d일') => {
  return format(date, formatStr, { locale: ko });
};

/**
 * 두 날짜 사이의 숙박 일수를 계산
 * @param startDate - 체크인 날짜
 * @param endDate - 체크아웃 날짜
 * @returns 숙박 일수 (날짜가 유효하지 않으면 0 반환)
 */
export const calculateNightCount = (startDate: Date | null, endDate: Date | null): number => {
  if (!startDate || !endDate) return 0;
  return differenceInDays(endDate, startDate);
};

/**
 * 지정된 날짜 범위의 모든 날짜가 예약 가능한지 확인
 * @param start - 시작 날짜
 * @param end - 종료 날짜
 * @param availableDates - 예약 가능한 날짜들의 문자열 배열 ('YYYY-MM-DD' 형식)
 * @returns 모든 날짜가 예약 가능하면 true, 아니면 false
 */
export const isDateRangeAvailable = (start: Date, end: Date, availableDates: string[]): boolean => {
  const dayCount = differenceInDays(end, start) + 1;

  return Array.from({ length: dayCount }).every((_, index) => {
    const currentDate = addDays(start, index);
    const dateString = format(currentDate, 'yyyy-MM-dd');

    return availableDates.includes(dateString);
  });
};

/**
 * 특정 날짜가 예약 불가능한지 확인
 * @param date - 확인할 날짜
 * @param availableDates - 예약 가능한 날짜들의 문자열 배열 ('YYYY-MM-DD' 형식)
 * @param minDate - 최소 선택 가능 날짜 (기본값: 현재 날짜)
 * @returns 예약 불가능하면 true, 가능하면 false
 */
export const isDateDisabled = (
  date: Date,
  availableDates: string[],
  minDate: Date = new Date(),
): boolean => {
  // 날짜가 오늘보다 이전이면 disable
  if (date < minDate) return true;

  const dateString = format(date, 'yyyy-MM-dd');

  return !availableDates.includes(dateString);
};
