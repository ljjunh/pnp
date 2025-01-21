'use server';

import { FilterType, PriceFilter } from '@/schemas/rooms';
import { ActionResponse } from '@/types/action';
import { PriceFilterRange } from '@/types/room';
import { httpClient } from '@/apis/core/httpClient';
import { formatFilter } from '@/utils/formatFilter';

/**
 * 가격 범위를 업데이트하는 서버 액션
 *
 * @param {"Entire" | "Private" | null} roomType
 * @param {string} property
 */
export async function getFilterPrice({
  roomType,
  property,
}: PriceFilter): Promise<ActionResponse<PriceFilterRange>> {
  try {
    const params = new URLSearchParams();

    if (roomType) {
      params.append('roomType', roomType);
    }

    if (property) {
      params.append('propertyType', property.toString());
    }

    console.log(params);

    const url = `/rooms/price${params.toString() ? `?${params.toString()}` : ''}`;

    const response = await httpClient.get<PriceFilterRange>(url);

    if (!response.success) {
      return {
        success: false,
        message: response.message || '서버 에러가 발생하였습니다. 잠시후 다시 시도해주세요.',
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
        message: response.message || '서버 에러가 발생하였습니다. 잠시후 다시 시도해주세요.',
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
