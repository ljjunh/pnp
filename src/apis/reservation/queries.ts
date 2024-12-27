import { notFound } from 'next/navigation';
import { CustomError } from '@/errors';
import { Reservation } from '@/types/reservation';
import { httpClient } from '@/apis/core/httpClient';

/**
 * 특정 예약 정보를 조회합니다.
 * @param orderNumber - 조회할 예약번호
 * @returns 예약 정보
 */
export async function getReservation(orderNumber: string): Promise<Reservation> {
  try {
    const response = await httpClient.get<Reservation>(`/reservation/${orderNumber}`);

    if (!response.success) {
      switch (response.status) {
        case 404:
          notFound();
        default:
          throw new CustomError(response.message, response.status);
      }
    }
    return response.data;
  } catch (error) {
    // 위에서 던진 CustomError는 그대로 다시 throw
    if (error instanceof CustomError) {
      throw error;
    }

    // fetch 실패로 인한 일반 Error는 CustomError로 변환
    throw new CustomError(
      '서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      500,
    );
  }
}
