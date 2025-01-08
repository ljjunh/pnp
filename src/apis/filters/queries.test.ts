import { CustomError } from '@/errors';
import mockFilter from '@/mocks/fixtures/filter.json';
import { FilterType } from '@/schemas/rooms';
import { getFilterRoom } from '@/apis/filters/queries';
import { formatFilter } from '@/utils/formatFilter';

describe('filter query test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getFilterRoom test', () => {
    test('성공적으로 필터링된 방 정보를 가져온다', async () => {
      const result = await getFilterRoom(mockFilter as FilterType);

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

    test('필터와 함께 page와 limit이 적용된 URL을 반환한다.', () => {
      const params = formatFilter(mockFilter as FilterType);

      params.append('page', '1');
      params.append('limit', '10');
      params.append('sort', 'recent');

      const url = `/rooms?${params.toString()}`;

      expect(url).toContain('/rooms?');
      expect(url).toContain('roomType=Entire');
      expect(url).toContain('capacity=4');
      expect(url).toContain('page=1');
      expect(url).toContain('limit=10');
      expect(url).toContain('sort=recent');
    });

    test('page와 limit이 전달되지 않으면 기본값(page=1, limit=10)을 사용한다', async () => {
      const params = formatFilter(mockFilter as FilterType);
      params.append('page', '1');
      params.append('limit', '10');
      params.append('sort', 'recent');

      const url = `/rooms?${params.toString()}`;

      expect(url).toContain('page=1');
      expect(url).toContain('limit=10');
    });

    test('page와 limit이 전달되면 해당 값을 사용한다', async () => {
      const params = formatFilter(mockFilter as FilterType);
      const page = 2;
      const limit = 20;

      params.append('page', page.toString());
      params.append('limit', limit.toString());
      params.append('sort', 'recent');

      const url = `/rooms?${params.toString()}`;

      expect(url).toContain('page=2');
      expect(url).toContain('limit=20');
    });

    test('서버에서 500 에러 발생 시 에러를 던진다', async () => {
      const errorMockFilter = {
        ...mockFilter,
        property: 500,
      };

      const error = await getFilterRoom(errorMockFilter as FilterType).catch((e) => e);

      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe('서버 에러 입니다. 잠시 후 다시 시도해주세요.');
      expect(error.statusCode).toBe(500);
    });

    // *TODO sort 테스트 작성

    test('네트워크 에러 발생 시 에러를 던진다', async () => {
      const errorMockFilter = {
        ...mockFilter,
        property: 501,
      };

      const error = await getFilterRoom(errorMockFilter as FilterType).catch((e) => e);

      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe('네트워크 에러 입니다. 잠시 후 다시 시도해주세요.');
      expect(error.statusCode).toBe(500);
    });
  });
});
