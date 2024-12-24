'use server';

import { auth } from '@/auth';
import { CreateReservationInput } from '@/schemas/reservation';
import { ActionResponse } from '@/types/action';
import { httpClient } from '@/apis/core/httpClient';

export async function createReservation(input: CreateReservationInput): Promise<ActionResponse> {
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
    const response = await httpClient.post<undefined>('/reservation', input);

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
      status: 200,
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
