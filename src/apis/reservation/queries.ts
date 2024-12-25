import { Reservation } from '@/types/reservation';
import { httpClient } from '@/apis/core/httpClient';

export async function getReservation(orderNumber: string): Promise<Reservation> {
  const response = await httpClient.get<Reservation>(`/reservation/${orderNumber}`);

  if (!response.success) {
    switch (response.status) {
      default:
        throw new Error(response.message);
    }
  }
  return response.data;
}
