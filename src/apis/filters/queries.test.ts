import { CustomError } from '@/errors';
import mockFilter from '@/mocks/fixtures/filter.json';
import { getFilterRoom } from '@/apis/filters/queries';

describe('filter query test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getFilterRoom test', () => {
    test('성공적으로 필터링된 방 정보를 가져온다', async () => {
      const result = await getFilterRoom(mockFilter);

      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('page');

      expect(Array.isArray(result.data)).toBeTruthy();
      expect(result.data.length).toBeGreaterThan(0);

      if (result.data.length > 0) {
        const room = result.data[0];
        expect(room).toHaveProperty('id');
        expect(room).toHaveProperty('location');
        expect(room).toHaveProperty('price');
        expect(room).toHaveProperty('latitude');
        expect(room).toHaveProperty('longitude');
        expect(room).toHaveProperty('reviewsAverage');
        expect(room).toHaveProperty('images');
        expect(room).toHaveProperty('scrapped');
      }
    });

    test('서버에서 500 에러 발생 시 에러를 던진다', async () => {
      const errorMockFilter = {
        ...mockFilter,
        property: 500,
      };

      const error = await getFilterRoom(errorMockFilter).catch((e) => e);

      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe('서버 에러 입니다. 잠시 후 다시 시도해주세요.');
      expect(error.statusCode).toBe(500);
    });
  });
});
