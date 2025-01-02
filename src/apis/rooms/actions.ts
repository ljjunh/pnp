'use server';

import { revalidateTag } from 'next/cache';
import { auth } from '@/auth';
import { ActionResponse } from '@/types/action';
import { httpClient } from '@/apis/core/httpClient';
import { CACHE_TAGS } from '@/constants/cacheTags';

/**
 * 숙소에 대한 스크랩을 하는 서버 액션 입니다.
 * @param roomId - 스크랩 할 숙소의 ID
 * @returns {Promise<ActionResponse>} 액션 결과
 */
export async function createScrap(roomId: number): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session) {
      return {
        success: false,
        message: '로그인이 필요합니다.',
        status: 401,
      };
    }

    const response = await httpClient.post<null>(`/rooms/${roomId}/scrap`);

    if (!response.success) {
      return {
        success: false,
        message: response.message || '스크랩에 실패했습니다. 잠시 후 다시 시도해 주세요.',
        status: response.status,
      };
    }

    // 캐시 무효화
    revalidateTag(CACHE_TAGS.ROOMS.SCRAP(roomId));

    return {
      success: true,
      status: 201,
    };
  } catch {
    return {
      success: false,
      message: '네트워크 문제로 스크랩에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
      status: 500,
    };
  }
}

/**
 * 숙소에 대한 스크랩을 제거하는 서버 액션 입니다.
 * @param roomId - 스크랩을 제거 할 숙소의 ID
 * @returns {Promise<ActionResponse>} 액션 결과
 */
export async function deleteScrap(roomId: number): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session) {
      return {
        success: false,
        message: '로그인이 필요합니다.',
        status: 401,
      };
    }

    const response = await httpClient.delete(`/rooms/${roomId}/scrap`);

    if (!response.success) {
      return {
        success: false,
        message: response.message || '스크랩 삭제에 실패했습니다. 잠시 후 다시 시도해 주세요.',
        status: response.status,
      };
    }

    revalidateTag(CACHE_TAGS.ROOMS.SCRAP(roomId));

    return {
      success: true,
      status: 204,
    };
  } catch {
    return {
      success: false,
      message:
        '네트워크 문제로 스크랩 삭제에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
      status: 500,
    };
  }
}
