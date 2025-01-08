import mockFilter from '@/mocks/fixtures/filter.json';
import { FilterType } from '@/schemas/rooms';
import { formatFilter } from '@/utils/formatFilter';

describe('formatFilter test', () => {
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

  test('filter가 비어있을 때 빈 문자열을 반환한다.', () => {
    const result = formatFilter(emptyFilter);

    expect(result.toString()).toBe('');
  });

  test('filter에 모든 값이 있을 때 올바른 query param을 반환한다.', () => {
    const result = formatFilter(mockFilter as FilterType);
    const params = new URLSearchParams(result.toString());

    expect(params.get('roomType')).toBe('Entire');
    expect(params.get('minPrice')).toBe('10000');
    expect(params.get('maxPrice')).toBe('50000');
    expect(params.get('bedroom')).toBe('2');
    expect(params.get('bed')).toBe('3');
    expect(params.get('bathroom')).toBe('1');
    expect(params.get('amenities')).toBe('wifi,parking');
    expect(params.get('option')).toBe('selfCheckIn');
    expect(params.get('language')).toBe('1,2');
    expect(params.get('property')).toBe('1');
    expect(params.get('location')).toBe('서울');
    expect(params.get('checkIn')).toBe('2024-01-01');
    expect(params.get('checkOut')).toBe('2024-01-05');
    expect(params.get('capacity')).toBe('4');
  });

  test('guest, baby, pet을 합한 값이 capacity로 들어간다.', () => {
    const result = formatFilter(mockFilter as FilterType);
    const params = new URLSearchParams(result.toString());

    expect(params.get('capacity')).toBe('4');
  });

  test('guest, baby, pet이 모두 0이면 capacity는 null이다.', () => {
    const result = formatFilter(emptyFilter);
    const params = new URLSearchParams(result.toString());

    expect(params.get('capacity')).toBe(null);
  });

  test('filter에 값이 없는 key는 query param에 추가하지 않는다.', () => {
    const filter = {
      ...mockFilter,
      roomType: null,
      amenityArray: [],
    };

    const result = formatFilter(filter as FilterType);
    const params = new URLSearchParams(result.toString());

    expect(params.get('roomType')).toBe(null);
    expect(params.get('amenities')).toBe(null);
  });
});
