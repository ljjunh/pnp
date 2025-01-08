import { formatTime } from './formatTime';

describe('formatTime', () => {
  it('오후 시간을 올바르게 반환한다', () => {
    const dateString = '2025-01-09T06:00:02.338Z'; // UTC 기준 06:00 (한국 시간 15:00)
    const result = formatTime(dateString);
    expect(result).toBe('오후 3:00');
  });

  it('오전 시간을 올바르게 반환한다', () => {
    const dateString = '2025-01-10T02:00:02.338Z'; // UTC 기준 02:00 (한국 시간 11:00)
    const result = formatTime(dateString);
    expect(result).toBe('오전 11:00');
  });

  it('자정(12:00 AM)을 올바르게 반환한다', () => {
    const dateString = '2025-01-09T15:00:00.000Z'; // UTC 기준 15:00 (한국 시간 00:00)
    const result = formatTime(dateString);
    expect(result).toBe('오전 0:00');
  });

  it('정오(12:00 PM)를 올바르게 반환한다', () => {
    const dateString = '2025-01-09T03:00:00.000Z'; // UTC 기준 03:00 (한국 시간 12:00)
    const result = formatTime(dateString);
    expect(result).toBe('오후 12:00');
  });
});