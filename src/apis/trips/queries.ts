import { CustomError } from '@/errors';
import { ReservationTrip } from '@/types/reservation';
import { httpClient } from '@/apis/core/httpClient';

/**
 * 예약된 여행 정보를 조회합니다.
 * @returns {Promise<ReservationTrip[]>} 에약된 여행 정보
 * @remarks 숙소를 찾을 수 없는 경우 Next.js not-found 페이지를 렌더링
 */

export async function getReservationTrip(): Promise<ReservationTrip[]> {
  try {
    const response = await httpClient.get<ReservationTrip[]>('/reservation');

    if (!response.success && response.status) {
      throw new CustomError(response.message, response.status);
    }

    return response.data;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(
      '서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      500,
    );
  }
}
