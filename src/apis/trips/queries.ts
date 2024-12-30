import { notFound } from 'next/navigation';
import { CustomError } from '@/errors';
import { ReservationTrip } from '@/types/reservation';
import { httpClient } from '../core/httpClient';

export async function getReservationTrip(): Promise<ReservationTrip[]> {
  try {
    const response = await httpClient.get<ReservationTrip[]>('/reservation');

    if (!response.success) {
      switch (response.status) {
        case 404:
          notFound();
        default:
          throw new CustomError(response.message, response.status);
      }
    }

    // console.log(response);
    // console.log(response.data);
    // console.log(response.data[0].room.host);

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
