import { CustomError } from '@/errors';
import { FilterType } from '@/schemas/rooms';
import { FilterRoomResponse } from '@/types/room';
import httpClient from '@/apis/core/httpClient';
import { formatFilter } from '@/utils/formatFilter';

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
  sort?: string,
): Promise<FilterRoomResponse> {
  try {
    const params = formatFilter(filter);

    // * params는 객체기 때문에 params 자체를 바꿀 수 없지만, 내부에 존재하는 실제 파라미터 값은 추가 가능함.
    params.append('page', (page ?? 1).toString());
    params.append('limit', (limit ?? 10).toString());
    params.append('sort', sort ?? 'recent');

    const url = `/rooms?${params.toString()}`;

    const response = await httpClient.get<FilterRoomResponse>(url);

    response.data.page.hasNextPage =
      response.data.page.totalElements > response.data.page.size * response.data.page.number;
    response.data.page.hasPrevPage = response.data.page.number >= 0;

    if (!response.success) {
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
