import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('날짜를 올바른 형식으로 반환한다.', () => {
    const date = new Date('2024-01-03');
    expect(formatDate(date)).toBe('2024년 01월 03일');
  });

  it('한자릿수 월, 일의 경우에도 두자릿수 형식에 맞춰 반환한다.', () => {
    const date = new Date('2024-5-5');
    expect(formatDate(date)).toBe('2024년 05월 05일');
  });
});