'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { CreateReservationInput } from '@/schemas/reservation';
import { ActionResponse } from '@/types/action';
import { CreateReservationResponse } from '@/types/reservation';
import httpClient from '@/apis/core/httpClient';
import { CACHE_TAGS } from '@/constants/cacheTags';

/**
 * 예약을 생성하는 서버 액션입니다.
 * @param input - 예약 생성에 필요한 입력값
 * @returns {Promise<ActionResponse<CreateReservationResponse>>} 성공 시 생성된 예약 정보를 포함한 응답을, 실패 시 에러 메시지와 상태 코드를 포함한 응답을 반환합니다.
 */
export async function createReservation(
  input: CreateReservationInput,
): Promise<ActionResponse<CreateReservationResponse>> {
  try {
    const cookieStore = cookies();
    const authenticated = Boolean(cookieStore.get('authenticated')?.value || 'false');

    if (!authenticated) {
      return {
        success: false,
        message: '로그인이 필요합니다.',
        status: 401,
      };
    }

    // API 요청
    const response = await httpClient.post<CreateReservationResponse>('/reservation', input);

    // API에서 명시적으로 처리되는 에러
    if (!response.success) {
      return {
        success: false,
        message: response.message || '예약에 실패했습니다. 잠시 후 다시 시도해 주세요.',
        status: response.status,
      };
    }

    revalidateTag(CACHE_TAGS.ROOMS.AVAILABLE(input.roomId));

    // 성공 시 응답
    return {
      success: true,
      status: 201,
      data: response.data,
    };
  } catch (error) {
    // fetch 자체가 실패한 경우(네트워크 연결 끊김, CORS 오류, DNS 실패 등 요청 자체가 실패한 경우)
    return {
      success: false,
      message: '네트워크 문제로 예약에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
      status: 500,
    };
  }
}
