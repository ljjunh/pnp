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

    test('filter에 맞게 url을 생성한다.', () => {
      const params = formatFilter(mockFilter as FilterType);
      const url = `/rooms${params.toString() ? `?${params.toString()}` : ''}${params.toString() ? '&' : '?'}page=${1}&limit=${10}`;

      expect(url).toContain('/rooms?');
      expect(url).toContain('roomType=Entire');
      expect(url).toContain('capacity=4');
      expect(url).toContain('&page=1');
      expect(url).toContain('&limit=10');
    });

    test("filter가 비어있고, page와 limit이 주어지면 '/rooms?page=1&limit=10'을 반환한다.", () => {
      const emptyFilter: FilterType = {
        roomType: null,
        minPrice: 0,
        maxPrice: 0,
        bedroom: 0,
        bed: 0,
        bathroom: 0,
        amenityArray: [],
        option: [],
        language: [],
        property: 0,
        location: '',
        checkIn: '',
        checkOut: '',
        guest: 0,
        baby: 0,
        pet: 0,
      };
      const page = 1;
      const limit = 10;

      const params = formatFilter(emptyFilter);

      const url = `/rooms${params.toString() ? `?${params.toString()}` : ''}${params.toString() ? '&' : '?'}page=${page}&limit=${limit}`;

      expect(url).toContain('/rooms?');
      expect(url).not.toContain('roomType=Entire');
      expect(url).toContain('page=1');
      expect(url).toContain('limit=10');
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
