import { notFound } from 'next/navigation';
import { CustomError } from '@/errors';
import { Room } from '@/types/room';
import { httpClient } from '@/apis/core/httpClient';
import { CACHE_TAGS } from '@/constants/cacheTags';

/**
 * 특정 숙소의 상세정보를 조회합니다.
 * @param id - 조회할 숙소의 ID
 * @returns {Promise<Room>} 숙소의 상세 정보
 * @remarks 숙소를 찾을 수 없는 경우 Next.js not-found 페이지를 렌더링
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

/**
 * 특정 숙소의 스크랩정보를 조회합니다.
 * @param roomId - 조회할 숙소의 ID
 * @returns {Promise<boolean>} 숙소의 스크랩 여부
 *
 * @remarks
 * 이 함수는 실패 시 false를 반환하도록 설계되었습니다.
 * 스크랩은 부가 기능이므로 오류가 발생해도 전체 페이지에 영향을 주지 않아야 하며,
 * 사용자에게 별도의 에러 메시지를 표시할 필요가 없다고 판단했습니다.
 */
export async function getScrap(roomId: number): Promise<boolean> {
  try {
    const response = await httpClient.get<boolean>(`/rooms/${roomId}/scrap`, {
      next: {
        tags: [CACHE_TAGS.ROOMS.SCRAP(roomId)],
      },
    });

    // API 응답이 성공이면 스크랩 상태 반환, 실패면 false 반환
    return response.success ? response.data : false;
  } catch (error) {
    // 네트워크 오류 등이 발생해도 false 반환하여 스크랩되지 않은 것으로 처리
    return false;
  }
}
