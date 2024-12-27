'use server';

import { auth } from '@/auth';
import { CreateReservationInput } from '@/schemas/reservation';
import { ActionResponse } from '@/types/action';
import { CreateReservationResponse } from '@/types/reservation';
import { httpClient } from '@/apis/core/httpClient';

/**
 * 예약을 생성하는 서버 액션입니다.
 * @param input - 예약 생성에 필요한 입력값
 * @returns 성공 시 생성된 예약 정보를 포함한 응답을, 실패 시 에러 메시지와 상태 코드를 포함한 응답을 반환합니다.
 * @throws {never} - 모든 에러는 ActionResponse 형태로 처리됩니다.
 */
export async function createReservation(
  input: CreateReservationInput,
): Promise<ActionResponse<CreateReservationResponse>> {
  try {
    // 세션 체크
    const session = await auth();
    if (!session) {
      return {
        success: false,
        message: '로그인이 필요합니다',
        status: 401,
      };
    }

    // API 요청
    const response = await httpClient.post<CreateReservationResponse>('/reservation', input);
    // 실패 시 응답
    if (!response.success) {
      return {
        success: false,
        message: response.message || '예약에 실패했습니다',
        status: response.status,
      };
    }
    // 성공 시 응답
    return {
      success: true,
      status: 201,
      data: response.data,
    };
  } catch (error) {
    // 서버 요청 또는 처리 중 발생한 예상치 못한 오류 처리
    return {
      success: false,
      message: '예약 생성 중 오류가 발생했습니다',
      status: 500,
    };
  }
}
