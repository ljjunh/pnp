type TruncateOptions = {
  maxLength?: number;
  suffix?: string;
};

/**
 * 텍스트가 최대 길이를 초과하는지 확인하는 함수
 *
 * @param text - 검사할 텍스트
 * @param maxLength - 최대 허용 길이
 * @returns 텍스트가 최대 길이를 초과하면 true, 아니면 false
 */
const shouldTruncate = (text: string, maxLength: number): boolean => {
  return text.length > maxLength;
};

/**
 * 주어진 최대 길이 내에서 마지막 공백의 위치를 찾는 함수
 *
 * @param text - 검사할 텍스트
 * @param maxLength - 검사할 최대 길이
 * @returns 마지막 공백의 인덱스, 공백이 없으면 -1
 */
const findLastSpace = (text: string, maxLength: number): number => {
  return text.slice(0, maxLength).lastIndexOf(' ');
};

/**
 * 텍스트를 자를 위치의 인덱스를 계산하는 함수
 *
 * @param text - 대상 텍스트
 * @param maxLength - 최대 길이
 * @returns 텍스트를 자를 위치의 인덱스 (공백이 있으면 공백 위치, 없으면 maxLength)
 */
const getTruncateIndex = (text: string, maxLength: number): number => {
  const lastSpaceIndex = findLastSpace(text, maxLength);

  return lastSpaceIndex > 0 ? lastSpaceIndex : maxLength;
};

/**
 * 긴 텍스트를 지정된 길이로 자르고 접미사를 추가하는 함수
 * @param text - 자를 대상 텍스트
 * @param options - 자르기 옵션
 * @param options.maxLength - 최대 텍스트 길이 (기본값: 150)
 * @param options.suffix - 자른 텍스트 뒤에 추가할 문자열 (기본값: '...')
 * @returns 잘린 텍스트 (필요한 경우 접미사 포함)
 *
 * @description
 * 텍스트가 지정된 최대 길이를 초과할 경우, 다음과 같은 규칙으로 텍스트를 자른다
 * 1. 최대 길이 내에서 마지막 공백을 찾아 자연스럽게 단어 단위로 자름
 * 2. 공백이 없는 경우 최대 길이에서 강제로 자름
 * 3. 자른 텍스트 뒤에 지정된 접미사(기본값: '...')를 추가
 *
 * @example
 * ```ts
 * // 기본 사용
 * truncateText("This is a very long text that needs to be truncated")
 * // returns "This is a very long..."
 *
 * // 옵션 지정
 * truncateText("Short text", { maxLength: 20 }) // returns "Short text"
 * truncateText("Long text to truncate", { maxLength: 10, suffix: '…' })
 * // returns "Long text…"
 * ```
 *
 */
export const truncateText = (
  text: string,
  { maxLength = 150, suffix = '...' }: TruncateOptions = {},
): string => {
  if (!shouldTruncate(text, maxLength)) {
    return text;
  }

  const truncateIndex = getTruncateIndex(text, maxLength);

  return `${text.slice(0, truncateIndex)}${suffix}`;
};
