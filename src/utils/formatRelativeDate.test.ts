import { formatRelativeDate } from '@/utils/formatRelativeDate';

describe('formatRelativeDate 테스트', () => {
  beforeEach(() => {
    // 날짜를 고정하기 위한 설정
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-12-16'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('오늘 날짜인 경우 오늘을 반환한다', () => {
    expect(formatRelativeDate(new Date('2024-12-16'))).toBe('오늘');
  });
  test('어제 날짜인 경우 "1일 전"을 반환한다', () => {
    expect(formatRelativeDate(new Date('2024-12-15'))).toBe('1일 전');
  });
  test('2-6일 전인 경우 "N일 전"을 반환한다', () => {
    expect(formatRelativeDate(new Date('2024-12-14'))).toBe('2일 전');
    expect(formatRelativeDate(new Date('2024-12-10'))).toBe('6일 전');
  });
  test('1-3주 전인 경우 "N주 전"을 반환한다', () => {
    expect(formatRelativeDate(new Date('2024-12-09'))).toBe('1주 전');
    expect(formatRelativeDate(new Date('2024-11-25'))).toBe('3주 전');
  });
  test('3주보다 이전인 경우 "YYYY년 M월" 형식을 반환한다', () => {
    expect(formatRelativeDate(new Date('2024-11-16'))).toBe('2024년 11월');
    expect(formatRelativeDate(new Date('2022-10-16'))).toBe('2022년 10월');
  });
});
