import { CustomError } from '@/errors';
import httpClient from '../core/httpClient';

/**
 * 등록 준비 중인 숙소의 id를 조회한다.
 *
 * 없으면 0 return
 */
export async function getProgressRoomId(): Promise<number> {
  try {
    const response = await httpClient.get<number>('/rooms/in-progress');

    if (!response.success) {
      throw new CustomError(response.message, response.status);
    }

    return response.data;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }

    throw new CustomError('네트워크 에러 입니다. 잠시 후 다시 시도해주세요.', 500);
  }
}
