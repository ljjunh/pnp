export function formatDate(dateString: Date) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  // getMonth()는 0부터 시작
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}년 ${month}월 ${day}일`;
}
