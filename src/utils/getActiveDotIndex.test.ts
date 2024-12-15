import { getActiveDotIndex } from '@/utils/getActiveDotIndex';

describe('getActiveDoIndex 테스트', () => {
  test('이미지가 없거나 1장일 때는 -1을 반환', () => {
    expect(getActiveDotIndex(0, 0)).toBe(-1);
    expect(getActiveDotIndex(0, 1)).toBe(-1);
  });

  test('이미지가 2~5장일 때는 currentIndex를 그대로 반환', () => {
    // 2장일 때
    expect(getActiveDotIndex(0, 2)).toBe(0);
    expect(getActiveDotIndex(1, 2)).toBe(1);

    // 3장일 때
    expect(getActiveDotIndex(0, 3)).toBe(0);
    expect(getActiveDotIndex(1, 3)).toBe(1);
    expect(getActiveDotIndex(2, 3)).toBe(2);

    // 4장일 때
    expect(getActiveDotIndex(0, 4)).toBe(0);
    expect(getActiveDotIndex(1, 4)).toBe(1);
    expect(getActiveDotIndex(2, 4)).toBe(2);
    expect(getActiveDotIndex(3, 4)).toBe(3);

    // 5장일 때
    expect(getActiveDotIndex(0, 5)).toBe(0);
    expect(getActiveDotIndex(2, 5)).toBe(2);
    expect(getActiveDotIndex(4, 5)).toBe(4);
  });

  describe('이미지가 5장 초과일 때', () => {
    const totalLength = 8;

    test('첫 두 슬라이드의 active dot index', () => {
      expect(getActiveDotIndex(0, totalLength)).toBe(0);
      expect(getActiveDotIndex(1, totalLength)).toBe(1);
    });

    test('중간 슬라이드들의 active dot index', () => {
      expect(getActiveDotIndex(2, totalLength)).toBe(2);
      expect(getActiveDotIndex(3, totalLength)).toBe(2);
      expect(getActiveDotIndex(4, totalLength)).toBe(2);
      expect(getActiveDotIndex(5, totalLength)).toBe(2);
    });

    test('마지막 두 슬라이드의 active dot index', () => {
      expect(getActiveDotIndex(6, totalLength)).toBe(3);
      expect(getActiveDotIndex(7, totalLength)).toBe(4);
    });
  });
});
