/**
* 날짜 문자열을 'YYYY년 MM월 DD일' 형식으로 변환합니다.
* 
* @param {Date} dateString - 변환할 날짜
* @returns {string} 'YYYY년 MM월 DD일' 형식의 날짜 문자열
* 
* @example
* // '2024년 01월 03일' 반환
* formatDate(new Date('2024-01-03'))
*/

export function formatDate(dateString: Date) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  // getMonth()는 0부터 시작
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}년 ${month}월 ${day}일`;
}
