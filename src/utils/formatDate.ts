/**
 * 날짜 문자열을 'YYYY년 MM월 DD일 (요일)' 형식으로 변환합니다.
 *
 * @param {Date} dateString - 변환할 날짜
 * @param {Object} options - 포맷 옵션
 * @param {boolean} options.showDay - 요일 표시 여부 (기본값: false)
 * @returns {string} 날짜 문자열
 *
 * @example
 * // '2024년 01월 03일' 반환
 * formatDate(new Date('2024-01-03'))
 *
 * // '2024년 01월 03일 (수)' 반환
 * formatDate(new Date('2024-01-03'), { showDay: true })
 */

export function formatDate(dateString: Date, options: { showDay?: boolean } = {}) {
  const { showDay = false } = options;
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  if (showDay) {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = days[date.getDay()];

    return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
  }

  return `${year}년 ${month}월 ${day}일`;
}
