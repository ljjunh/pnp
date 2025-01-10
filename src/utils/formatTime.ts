/**
 * 날짜 문자열을 '오전/오후 hh:mm' 형식으로 변환합니다.
 *
 * @param {Date} dateString - 변환할 날짜
 * @returns {string} '오전/오후 hh:mm' 형식의 시간 문자열
 *
 * @example
 * // '오후 4:00' 반환
 * formatTimeOnly('2025-01-09T06:00:02.338Z');
 * // '오전 11:00' 반환
 * formatTimeOnly('2025-01-10T02:00:02.338Z');
 */

export function formatTime(dateString: Date) {
  const date = new Date(dateString);
  const hour = date.getHours();

  const ampm = hour < 12 ? '오전' : '오후';
  const formattedHour = hour <= 12 ? hour : hour - 12;

  return `${ampm} ${formattedHour}:00`;
}
