'use server';

import { FilterType, PriceFilter } from '@/schemas/rooms';
import { PriceFilterRange } from '@/types/room';
import { getFilterRoomCount, getRoomPrice } from './queries';

/**
 * 가격 범위를 업데이트하는 서버 액션
 *
 * @param {"Entire" | "Private" | null} roomType
 * @param {number} property
 */
export async function fetchFilterPrice({ roomType, property }: PriceFilter) {
  try {
    const priceRange: PriceFilterRange = await getRoomPrice({ roomType, property });

    return priceRange;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('알 수 없는 오류가 발생했습니다');
  }
}

/**
 * 필터 정보에 따른 방의 갯수를 조회하는 서버 액션
 */
export async function fetchFilterCount(filter: FilterType) {
  try {
    const count: number = await getFilterRoomCount(filter);

    return count;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error('알 수 없는 오류가 발생했습니다');
  }
}
