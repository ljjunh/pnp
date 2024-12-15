import { Room } from '@/types/room';
import { httpClient } from '@/apis/core/httpClient';

export async function getRoom(id: number): Promise<Room> {
  const response = await httpClient.get<Room>(`/rooms/${id}`);

  if (!response.success) {
    switch (response.status) {
      default:
        throw new Error(response.message);
    }
  }

  return response.data;
}
