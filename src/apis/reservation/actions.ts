'use server';

import { auth } from '@/auth';
import { CreateReservationInput, createReservationSchema } from '@/schemas/reservation';
import { httpClient } from '@/apis/core/httpClient';

export async function createReservation(input: CreateReservationInput): Promise<void> {
  try {
    // 세션 체크
    const session = await auth();
    if (!session) {
      throw new Error('로그인이 필요합니다.');
    }

    // zod로 입력값 검증
    const validatedDate = createReservationSchema.parse(input);

    // API 요청
    const response = await httpClient.post<undefined>('/reservation', validatedDate);

    if (!response.success) {
      throw new Error(response.message || '예약에 실패했습니다.');
    }
    return;
  } catch (error) {
    console.error('예약 생성 중 에러 발생:', error);

    if (error instanceof Error) {
      throw error;
    }
    throw new Error('예약 생성 중 오류가 발생했습니다.');
  }
}
