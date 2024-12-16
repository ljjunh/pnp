import { differenceInMonths, differenceInYears, isBefore } from 'date-fns';

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
