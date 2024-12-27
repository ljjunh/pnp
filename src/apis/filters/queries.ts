import { FilterType, PriceFilter } from '@/schemas/rooms';
import { FilterRoomResponse, PriceFilterRange } from '@/types/room';
import { formatFilter } from '@/utils/formatFilter';
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
 * @returns {Promise<FilterRoomResponse>} 방 정보
 */
export async function getFilterRoom(
  filter: FilterType,
  page?: number,
  limit?: number,
): Promise<FilterRoomResponse> {
  const params = formatFilter(filter);

  const url = `/rooms${params.toString() ? `?${params.toString()}` : ''}${page ? `${params.toString() ? '&' : '?'}page=${page}` : ''}${limit ? `${page ? '&' : '?'}limit=${limit}` : ''}`;

  const response = await httpClient.get<FilterRoomResponse>(url);

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
  const params = formatFilter(filter);

  const url = `/rooms/count${params.toString() ? `?${params.toString()}` : ''}`;

  const response = await httpClient.get<number>(url);

  if (!response.success) {
    throw new Error(response.message);
  }

  return response.data;
}
