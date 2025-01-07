import { CustomError } from '@/errors';
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
  try {
    const params = formatFilter(filter);

    const url = `/rooms${params.toString() ? `?${params.toString()}` : ''}${page ? `${params.toString() ? '&' : '?'}page=${page}` : ''}${limit ? `${page ? '&' : '?'}limit=${limit}` : ''}`;

    const response = await httpClient.get<FilterRoomResponse>(url);

    if (!response.success && response.status) {
      throw new CustomError(response.message, response.status);
    }

    return response.data;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }

    throw new CustomError('네트워크 에러 입니다. 잠시 후 다시 시도해주세요.', 500);
  }
}
