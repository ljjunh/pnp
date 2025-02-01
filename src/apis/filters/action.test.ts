import mockFilter from '@/mocks/fixtures/filter.json';
import { FilterType, PriceFilter } from '@/schemas/rooms';
import { getFilterCount, getFilterPrice } from '@/apis/filters/action';
import { formatFilter } from '@/utils/formatFilter';

describe('filter action test', () => {
  describe('getFilterPrice test', () => {
    const mockPriceFilter: PriceFilter = {
      roomType: mockFilter.roomType as 'Entire' | 'Private' | null | undefined,
      property: mockFilter.property,
    };

    test('성공적으로 가격 범위를 가져온다.', async () => {
      const { data } = await getFilterPrice(mockPriceFilter);

      expect(data).toHaveProperty('minPrice');
      expect(data).toHaveProperty('maxPrice');
      expect(data).toHaveProperty('distribution');
    });

    test('roomType과 property가 모두 없을 때 빈 파라미터로 요청한다', async () => {
      const emptyFilter: PriceFilter = {
        roomType: null,
        property: undefined,
      };

      const { data } = await getFilterPrice(emptyFilter);
      expect(data).toHaveProperty('minPrice');
    });

    test('서버에서 500 에러 발생 시 에러를 던진다.', async () => {
      const errorMockFilter = {
        ...mockPriceFilter,
        property: '500',
      };

      const error = await getFilterPrice(errorMockFilter);


      expect(error.message).toBe('서버 에러가 발생하였습니다. 잠시후 다시 시도해주세요.');
      expect(error.status).toBe(500);
    });

    test('네트워크 에러 발생 시 에러를 던진다.', async () => {
      const errorMockFilter = {
        ...mockPriceFilter,
        property: '501',
      };

      const error = await getFilterPrice(errorMockFilter);

      expect(error.message).toBe(
        '네트워크 문제로 가격 조회에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
      );
      expect(error.status).toBe(500);
    });

    test('서버 응답에 message가 없을 때 기본 메시지를 반환한다', async () => {
      const errorMockFilter = {
        ...mockPriceFilter,
        property: '502',
      };

      const error = await getFilterPrice(errorMockFilter);

      expect(error.message).toBe('서버 에러가 발생하였습니다. 잠시후 다시 시도해주세요.');
    });
  });

  describe('getFilterCount test', () => {
    test('성공적으로 방의 갯수를 가져온다.', async () => {
      const { data } = await getFilterCount(mockFilter as FilterType);

      expect(data).toBeGreaterThan(0);
    });

    test('filter에 맞게 url을 생성한다.', () => {
      const params = formatFilter(mockFilter as FilterType);
      const url = `/rooms/count${params.toString() ? `?${params.toString()}` : ''}`;

      expect(url).toContain('/rooms/count?');
      expect(url).toContain('roomType=Entire');
      expect(url).toContain('minPrice=10000');
    });

    test("filter가 비어있을 때 '/rooms/count'를 반환한다.", () => {
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
      };

      const params = formatFilter(emptyFilter);

      expect(params.toString()).toBe('');

      const url = `/rooms/count${params.toString() ? `?${params.toString()}` : ''}`;

      expect(url).toBe('/rooms/count');
      expect(url).not.toContain('?');
    });

    test('params가 빈 문자열일 때 기본 URL을 생성한다', () => {
      const params = '';
      const url = `/rooms/count${params?.toString() ? `?${params.toString()}` : ''}`;

      expect(url).toBe('/rooms/count');
      expect(url).not.toContain('?');
    });

    test('서버에서 500 에러 발생 시 에러를 던진다.', async () => {
      const errorMockFilter = {
        ...mockFilter,
        property: '500',
      };

      const error = await getFilterCount(errorMockFilter as FilterType);

      expect(error.message).toBe(
        '네트워크 문제로 숙소 갯수 조회에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
      );
      expect(error.status).toBe(500);
    });

    test('네트워크 에러 발생 시 에러를 던진다.', async () => {
      const errorMockFilter = {
        ...mockFilter,
        property: '501',
      };

      const error = await getFilterCount(errorMockFilter as FilterType);

      expect(error.message).toBe(
        '네트워크 문제로 숙소 갯수 조회에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
      );
      expect(error.status).toBe(500);
    });

    test('서버 응답에 message가 없을 때 기본 메시지를 반환한다', async () => {
      const errorMockFilter = {
        ...mockFilter,
        property: '502',
      };

      const error = await getFilterCount(errorMockFilter as FilterType);

      expect(error.message).toBe('서버 에러가 발생하였습니다. 잠시후 다시 시도해주세요.');
    });
  });
});
