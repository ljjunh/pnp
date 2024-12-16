import { formatElapsedTime } from '@/utils/formatElapsedTime';

describe('formatElapsedTime 테스트', () => {
  // 날짜를 고정하기 위한 설정
  beforeEach(() => {
    jest.useFakeTimers();
    // 2024년 12월 16일로 현재 날짜 고정
    jest.setSystemTime(new Date('2024-12-16'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  test('1년 이상인 경우 "N년"을 반환한다', () => {
    expect(formatElapsedTime(new Date('2020-08-09T23:46:39.915Z'))).toBe('4년');
  });

  test('1년 미만인 경우 "N개월"을 반환한다', () => {
    expect(formatElapsedTime(new Date('2024-01-09T23:46:39.915Z'))).toBe('11개월');
  });
  test('1달 미만인 경우 "1개월"을 반환한다', () => {
    expect(formatElapsedTime(new Date('2024-12-01T23:46:39.915Z'))).toBe('1개월');
  });

  test('미래 날짜인 경우 "0개월"을 반환한다', () => {
    expect(formatElapsedTime(new Date('2025-01-09T23:46:39.915Z'))).toBe('0개월');
  });
});
