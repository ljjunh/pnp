'use server';

import { FilterType, PriceFilter } from '@/schemas/rooms';
import { ActionResponse } from '@/types/action';
import { PriceFilterRange } from '@/types/room';
import { formatFilter } from '@/utils/formatFilter';
import { httpClient } from '../core/httpClient';

/**
 * 가격 범위를 업데이트하는 서버 액션
 *
 * @param {"Entire" | "Private" | null} roomType
 * @param {number} property
 */
export async function getFilterPrice({
  roomType,
  property,
}: PriceFilter): Promise<ActionResponse<PriceFilterRange>> {
  console.log('호출');
  try {
    const params = new URLSearchParams();

    if (roomType) {
      params.append('roomType', roomType);
    }

    if (property) {
      params.append('property', property.toString());
    }

    const url = `/rooms/price${params.toString() ? `?${params.toString()}` : ''}`;

    const response = await httpClient.get<PriceFilterRange>(url);

    if (!response.success) {
      return {
        success: false,
        message: response.message || '가격 범위를 조회하는데 실패했습니다.',
        status: response.status,
      };
    }

    return {
      success: true,
      status: 200,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        '네트워크 문제로 가격 조회에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
      status: 500,
    };
  }
}

/**
 * 필터 정보에 따른 방의 갯수를 조회하는 서버 액션
 * @param {FilterType} filter 필터 정보
 *
 * @returns {Promise<ActionResponse<number>>} 방 정보
 */
export async function getFilterCount(filter: FilterType) {
  try {
    const params = formatFilter(filter);

    const url = `/rooms/count${params.toString() ? `?${params.toString()}` : ''}`;

    const response = await httpClient.get<number>(url);

    if (!response.success) {
      return {
        success: false,
        message: response.message || '숙소 갯수를 조회하는 데 실패하였습니다.',
        status: response.status,
      };
    }

    return {
      success: true,
      status: 200,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        '네트워크 문제로 숙소 갯수 조회에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
      status: 500,
    };
  }
}
