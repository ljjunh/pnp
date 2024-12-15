import { truncateText } from '@/utils/truncateText';

describe('truncateText 테스트', () => {
  describe('기본 동작 테스트', () => {
    test('최대 길이보다 짧은 텍스트는 그대로 반환한다', () => {
      expect(truncateText('hello', { maxLength: 10 })).toBe('hello');
    });
    test('최대 길이보다 긴 텍스트는 잘리고 말줄임표가 추가된다', () => {
      expect(truncateText('hello world', { maxLength: 5 })).toBe('hello...');
    });
  });

  describe('공백 처리 테스트', () => {
    test('공백이 있는 경우 공백 기준으로 가른다', () => {
      expect(truncateText('hello world friend', { maxLength: 11 })).toBe('hello...');
    });

    test('공백이 없는 경우 maxLength 위치에서 자른다', () => {
      expect(truncateText('helloworld', { maxLength: 5 })).toBe('hello...');
    });

    test('첫 번째 단어가 maxLength보다 긴 경우 maxLength 위치에서 자른다', () => {
      expect(truncateText('verylongword', { maxLength: 4 })).toBe('very...');
    });
  });

  describe('옵션 파라미터 테스트', () => {
    test('기본 maxLength는 150이다', () => {
      const longText = 'a'.repeat(151);
      expect(truncateText(longText)).toBe('a'.repeat(150) + '...');
    });

    test('suffix를 커스텀할 수 있다', () => {
      expect(truncateText('hello world', { maxLength: 5, suffix: '?' })).toBe('hello?');
    });

    test('빈 suffix도 허용한다', () => {
      expect(truncateText('hello world', { maxLength: 5, suffix: '' })).toBe('hello');
    });
  });

  describe('엣지 케이스 테스트', () => {
    test('빈 문자열은 그대로 반환한다', () => {
      expect(truncateText('')).toBe('');
    });

    test('maxLength가 0인 경우 빈 문자열과 suffix를 반환한다', () => {
      expect(truncateText('hello', { maxLength: 0 })).toBe('...');
    });
  });
});
