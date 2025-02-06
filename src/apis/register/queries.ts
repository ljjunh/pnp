import { CustomError } from '@/errors';
import httpClient from '@/apis/core/httpClient';

/**
 * 등록 준비 중인 숙소의 id를 조회한다.
 */
export async function getProgressRoomId(): Promise<number> {
  try {
    const response = await httpClient.get<number>('/rooms/in-progress');

    if (!response.success) {
      throw new CustomError(response.message, response.status);
    }

    // data가 없으면 에러로 간주
    if (response.data === null) {
      throw new CustomError('등록 중인 숙소 조회에 실패하였습니다.', 400);
    }

    return response.data;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }

    throw new CustomError('네트워크 에러 입니다. 잠시 후 다시 시도해주세요.', 500);
  }
}
