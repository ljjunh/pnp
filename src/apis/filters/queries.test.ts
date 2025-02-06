import { CustomError } from '@/errors';
import mockFilterData from '@/mocks/fixtures/filter.json';
import { FilterType } from '@/schemas/rooms';
import { getFilterRoom } from '@/apis/filters/queries';
import { formatFilter } from '@/utils/formatFilter';

describe('filter query test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockFilter = mockFilterData as unknown as FilterType;

  describe('getFilterRoom test', () => {
    test('성공적으로 필터링된 방 정보를 가져온다', async () => {
      const result = await getFilterRoom(mockFilter as FilterType);

      expect(result).toHaveProperty('content');
      expect(result).toHaveProperty('page');

      expect(Array.isArray(result.content)).toBeTruthy();
      expect(result.content.length).toBeGreaterThan(0);

      if (result.content.length > 0) {
        const room = result.content[0];
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

    test('필터와 함께 page와 size이 적용된 URL을 반환한다.', () => {
      const params = formatFilter(mockFilter as FilterType);

      params.append('page', '1');
      params.append('size', '10');
      params.append('sort', 'recent');

      const url = `/rooms?${params.toString()}`;

      expect(url).toContain('/rooms?');
      expect(url).toContain('roomType=Entire');
      expect(url).toContain('capacity=4');
      expect(url).toContain('page=1');
      expect(url).toContain('size=10');
      expect(url).toContain('sort=recent');
    });

    test('page와 size, sort가 전달되지 않으면 기본값(page=1, size=10, sort=recent)을 사용한다', async () => {
      const params = formatFilter(mockFilter as FilterType);

      const page: number | undefined = undefined;
      const size: number | undefined = undefined;
      const sort: string | undefined = undefined;

      params.append('page', (page ?? 1).toString());
      params.append('size', (size ?? 10).toString());
      params.append('sort', sort ?? 'recent');

      const url = `/rooms?${params.toString()}`;

      expect(url).toContain('page=1');
      expect(url).toContain('size=10');
    });

    test('page와 size이 전달되면 해당 값을 사용한다', async () => {
      const params = formatFilter(mockFilter as FilterType);
      const page = 2;
      const size = 20;

      params.append('page', page.toString());
      params.append('size', size.toString());
      params.append('sort', 'recent');

      const url = `/rooms?${params.toString()}`;

      expect(url).toContain('page=2');
      expect(url).toContain('size=20');
    });

    test("서버에서 데이터를 가져오지 못하면 '방 정보를 불러오는데 실패했습니다.' 에러를 던진다", async () => {
      const errorMockFilter: FilterType = {
        ...mockFilter,
        property: '200',
      };

      const error = await getFilterRoom(errorMockFilter).catch((e) => e);

      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe('방 정보를 불러오는데 실패했습니다.');
      expect(error.statusCode).toBe(500);
    });

    test('response.success가 false일 때 에러를 던진다', async () => {
      const errorMockFilter: FilterType = {
        ...mockFilter,
        property: '500',
      };

      const error = await getFilterRoom(errorMockFilter).catch((e) => e);

      expect(error).toBeInstanceOf(CustomError);
    });

    test('서버에서 500 에러 발생 시 에러를 던진다', async () => {
      const errorMockFilter: FilterType = {
        ...mockFilter,
        property: '500',
      };

      const error = await getFilterRoom(errorMockFilter).catch((e) => e);

      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe('서버 에러 입니다. 잠시 후 다시 시도해주세요.');
      expect(error.statusCode).toBe(500);
    });

    test('네트워크 에러 발생 시 에러를 던진다', async () => {
      const errorMockFilter = {
        ...mockFilter,
        property: '501',
      };

      const error = await getFilterRoom(errorMockFilter as FilterType).catch((e) => e);

      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe('네트워크 에러 입니다. 잠시 후 다시 시도해주세요.');
      expect(error.statusCode).toBe(500);
    });
  });
});
