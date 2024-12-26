import { FilterType, PriceFilter } from '@/schemas/rooms';
import { FilterRoom, PriceFilterRange } from '@/types/room';
import { httpClient } from '../core/httpClient';

/**
 * filter에 따른 가격 범위를 조회한다
 *
 * @param {PriceFilter} filter 가격 필터
 *
 * @returns {Promise<PriceFilterRange>} 가격 범위
 */
export async function getRoomPrice(filter: PriceFilter): Promise<PriceFilterRange> {
  const params = new URLSearchParams();

  if (filter.roomType) {
    params.append('roomType', filter.roomType);
  }

  if (filter.property) {
    params.append('property', filter.property.toString());
  }

  const url = `/rooms/price${params.toString() ? `?${params.toString()}` : ''}`;

  const response = await httpClient.get<PriceFilterRange>(url);

  if (!response.success) {
    throw new Error(response.message);
  }

  return response.data;
}

/**
 *  필터 정보에 따른 방을 조회한다.
 *
 * @param {FilterType} filter 필터 정보
 *
 * @returns {Promise<FilterRoom[]>} 방 정보
 */
export async function getFilterRoom(filter: FilterType): Promise<FilterRoom[]> {
  const params = getFilterParams(filter);

  const url = `/rooms${params.toString() ? `?${params.toString()}` : ''}`;

  const response = await httpClient.get<FilterRoom[]>(url);

  if (!response.success) {
    throw new Error(response.message);
  }

  return response.data;
}

/**
 * 필터 정보에 따른 방의 갯수를 조회한다.
 *
 * @param {FilterType} filter 필터 정보
 *
 * @returns {Promise<number>} 방 정보
 */
export async function getFilterRoomCount(filter: FilterType): Promise<number> {
  const params = getFilterParams(filter);

  const url = `/rooms/count${params.toString() ? `?${params.toString()}` : ''}`;

  const response = await httpClient.get<number>(url);

  if (!response.success) {
    throw new Error(response.message);
  }

  return response.data;
}

/**
 * 필터 정보에 따라 params를 생성한다.
 *
 * @param filter 필터 정보
 * @returns {URLSearchParams} 필터 정보
 */
const getFilterParams = (filter: FilterType) => {
  const {
    roomType,
    minPrice,
    maxPrice,
    bedroom,
    bed,
    bathroom,
    amenityArray,
    option,
    language,
    property,
  } = filter;

  const params = new URLSearchParams();

  if (roomType) {
    params.append('roomType', roomType);
  }

  if (minPrice) {
    params.append('minPrice', minPrice.toString());
  }

  if (maxPrice) {
    params.append('maxPrice', maxPrice.toString());
  }

  if (bedroom) {
    params.append('bedroom', bedroom.toString());
  }

  if (bed) {
    params.append('bed', bed.toString());
  }

  if (bathroom) {
    params.append('bathroom', bathroom.toString());
  }

  if (amenityArray.length > 0) {
    params.append('amenities', amenityArray.join(','));
  }

  if (option.length > 0) {
    params.append('option', option.join(','));
  }

  if (language.length > 0) {
    params.append('language', language.join(','));
  }

  if (property) {
    params.append('property', property.toString());
  }

  return params;
};
