/**
 * 객체 배열에서 특정 속성값들만 추출하여 새로운 배열로 반환합니다.
 * @param {T[]} items - 처리할 객체들의 배열
 * @param {K} key - 추출할 속성의 키
 * @returns {T[K][]} 속성값들로 이루어진 배열
 * @throws items가 빈 배열인 경우
 */
export function extractProperty<T, K extends keyof T>(items: T[], key: K): T[K][] {
  if (!items || items.length === 0) {
    throw new Error('items is empty');
  }
  return items.map((item) => item[key]);
}
