import { getActiveDotIndex } from '@/utils/getActiveDotIndex';

describe('getActiveDoIndex 테스트', () => {
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
