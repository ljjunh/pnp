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

  it('요일 표시 옵션이 true일 때 요일을 포함하여 반환한다.', () => {
    const date = new Date('2024-01-03'); // 수요일
    expect(formatDate(date, { showDay: true })).toBe('2024년 01월 03일 (수)');
  });

  it('요일 표시 옵션이 없을 때는 요일을 포함하지 않는다.', () => {
    const date = new Date('2024-01-03');
    expect(formatDate(date, {})).toBe('2024년 01월 03일');
  });

  it('모든 요일이 올바르게 표시된다.', () => {
    const weekDays = [
      { date: '2024-01-07', day: '일' },
      { date: '2024-01-08', day: '월' },
      { date: '2024-01-09', day: '화' },
      { date: '2024-01-10', day: '수' },
      { date: '2024-01-11', day: '목' },
      { date: '2024-01-12', day: '금' },
      { date: '2024-01-13', day: '토' },
    ];

    weekDays.forEach(({ date, day }) => {
      expect(formatDate(new Date(date), { showDay: true })).toBe(
        `${date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1년 $2월 $3일')} (${day})`,
      );
    });
  });
});
