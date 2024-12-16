type TruncateOptions = {
  maxLength?: number;
  suffix?: string;
};

/**
 * 텍스트가 최대 길이를 초과하는지 확인
 */
const shouldTruncate = (text: string, maxLength: number): boolean => {
  return text.length > maxLength;
};

/**
 * 주어진 최대 길이 내에서 마지막 공백의 위치를 찾음
 */
const findLastSpace = (text: string, maxLength: number): number => {
  return text.slice(0, maxLength).lastIndexOf(' ');
};

/**
 * 텍스트를 자를 위치의 인덱스를 계산
 */
const getTruncateIndex = (text: string, maxLength: number): number => {
  const lastSpaceIndex = findLastSpace(text, maxLength);

  return lastSpaceIndex > 0 ? lastSpaceIndex : maxLength;
};

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
