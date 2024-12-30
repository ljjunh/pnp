import { FilterType } from '@/schemas/rooms';
import { FilterRoomResponse } from '@/types/room';
import { formatFilter } from '@/utils/formatFilter';
import { httpClient } from '../core/httpClient';

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
