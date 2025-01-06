import { addDays, subDays } from 'date-fns';
import {
  calculateNightCount,
  formatDate,
  isDateDisabled,
  isDateRangeAvailable,
} from '@/utils/dateUtils';

describe('formatDate', () => {
  test('기본 형식으로 날짜를 포맷팅한다', () => {
    const date = new Date('2024-01-01');
    expect(formatDate(date)).toBe('2024년 1월 1일');
  });

  test('사용자 지정 형식으로 날짜를 포맷팅한다', () => {
    const date = new Date('2024-01-01');
    expect(formatDate(date, 'yyyy.MM.dd')).toBe('2024.01.01');
  });
});

describe('calculateNightCount', () => {
  test('두 날짜 사이의 숙박 일수를 계산한다', () => {
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-01-03');
    expect(calculateNightCount(startDate, endDate)).toBe(2);
  });

  test('null 값이 있으면 0을 반환한다', () => {
    const date = new Date('2024-01-01');
    expect(calculateNightCount(null, date)).toBe(0);
    expect(calculateNightCount(date, null)).toBe(0);
    expect(calculateNightCount(null, null)).toBe(0);
  });
});

describe('isDateRangeAvailable', () => {
  const availableDates = ['2024-01-01', '2024-01-02', '2024-01-03'];

  test('모든 날짜가 예약 가능하면 true를 반환한다', () => {
    const start = new Date('2024-01-01');
    const end = new Date('2024-01-03');
    expect(isDateRangeAvailable(start, end, availableDates)).toBe(true);
  });

  test('하나라도 예약 불가능한 날짜가 있으면 false를 반환한다', () => {
    const start = new Date('2024-01-01');
    const end = new Date('2024-01-04');
    expect(isDateRangeAvailable(start, end, availableDates)).toBe(false);
  });
});

describe('isDateDisabled', () => {
  const availableDates = ['2024-01-01', '2024-01-02'];
  const baseDate = new Date('2024-01-01');

  test('minDate보다 이전 날짜는 true를 반환한다', () => {
    const date = subDays(baseDate, 1);
    expect(isDateDisabled(date, availableDates, baseDate)).toBe(true);
  });

  test('availableDates에 없는 날짜는 true를 반환한다', () => {
    const date = addDays(baseDate, 2);
    expect(isDateDisabled(date, availableDates, baseDate)).toBe(true);
  });

  test('조건을 모두 만족하는 날짜는 false를 반환한다', () => {
    expect(isDateDisabled(baseDate, availableDates, baseDate)).toBe(false);
  });
});
