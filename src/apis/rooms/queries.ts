import { notFound } from 'next/navigation';
import { CustomError } from '@/errors';
import { Room } from '@/types/room';
import { httpClient } from '@/apis/core/httpClient';

/**
 * 특정 숙소의 상세정보를 조회합니다.
 * @param id - 조회할 숙소의 ID
 * @returns 숙소의 상세 정보
 */
export async function getRoom(id: number): Promise<Room> {
  try {
    const response = await httpClient.get<Room>(`/rooms/${id}`);
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
