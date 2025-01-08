import { getParamFilter } from '@/utils/getParamFilter';

const mockParams = {
  roomType: 'Entire',
  minPrice: '50000',
  maxPrice: '200000',
  bedroom: '2',
  bed: '2',
  bathroom: '1',
  amenities: 'wifi,parking,kitchen',
  option: 'selfCheckIn,pet',
  language: '1,2,3',
  property: '1',
  location: '서울',
  checkIn: '2024-02-01',
  checkOut: '2024-02-05',
  guest: '2',
  baby: '1',
  pet: '1',
};

const emptyParams = {};

describe('getParamFilter test', () => {
  test('모든 params가 주어졌을 때 정상적으로 filter를 반환한다.', () => {
    const result = getParamFilter(mockParams);

    expect(result.roomType).toBe('Entire');
    expect(result.minPrice).toBe(50000);
    expect(result.maxPrice).toBe(200000);
    expect(result.bedroom).toBe(2);
    expect(result.bed).toBe(2);
    expect(result.bathroom).toBe(1);
    expect(result.amenityArray).toEqual(['wifi', 'parking', 'kitchen']);
    expect(result.option).toEqual(['selfCheckIn', 'pet']);
    expect(result.language).toEqual([1, 2, 3]);
    expect(result.property).toBe(1);
    expect(result.location).toBe('서울');
    expect(result.checkIn).toBe('2024-02-01');
    expect(result.checkOut).toBe('2024-02-05');
    expect(result.guest).toBe(2);
    expect(result.baby).toBe(1);
    expect(result.pet).toBe(1);
  });

  test('params가 주어지지 않았을 때 빈 filter를 반환한다.', () => {
    const result = getParamFilter(emptyParams);

    expect(result.roomType).toBeUndefined();
    expect(result.minPrice).toBeUndefined();
    expect(result.maxPrice).toBeUndefined();
    expect(result.bedroom).toBeUndefined();
    expect(result.bed).toBeUndefined();
    expect(result.bathroom).toBeUndefined();
    expect(result.amenityArray).toEqual([]);
    expect(result.option).toEqual([]);
    expect(result.language).toEqual([]);
    expect(result.property).toBeUndefined();
    expect(result.location).toBeUndefined();
    expect(result.checkIn).toBeUndefined();
    expect(result.checkOut).toBeUndefined();
    expect(result.guest).toBeUndefined();
    expect(result.baby).toBeUndefined();
    expect(result.pet).toBeUndefined();
  });
});
