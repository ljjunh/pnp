import mockFilter from '@/mocks/fixtures/filter.json';
import { getFilterCount, getFilterPrice } from './action';

describe('filter action test', () => {
  describe('getFilterPrice test', () => {
    test('성공적으로 가격 범위를 가져온다.', async () => {
      const { data } = await getFilterPrice(mockFilter);

      expect(data).toHaveProperty('minPrice');
      expect(data).toHaveProperty('maxPrice');
      expect(data).toHaveProperty('distribution');
    });

    test('서버에서 500 에러 발생 시 에러를 던진다.', async () => {
      const errorMockFilter = {
        ...mockFilter,
        property: 500,
      };

      const error = await getFilterPrice(errorMockFilter);

      expect(error.message).toBe(
        '네트워크 문제로 가격 조회에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
      );
      expect(error.status).toBe(500);
    });
  });

  describe('getFilterCount test', () => {
    test('성공적으로 방의 갯수를 가져온다.', async () => {
      const { data } = await getFilterCount(mockFilter);

      expect(data).toBeGreaterThan(0);
    });

    test('서버에서 500 에러 발생 시 에러를 던진다.', async () => {
      const errorMockFilter = {
        ...mockFilter,
        property: 500,
      };

      const error = await getFilterCount(errorMockFilter);

      expect(error.message).toBe(
        '네트워크 문제로 숙소 갯수 조회에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
      );
      expect(error.status).toBe(500);
    });
  });
});
