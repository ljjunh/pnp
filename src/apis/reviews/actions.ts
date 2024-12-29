'use server';

import { revalidateTag } from 'next/cache';
import { auth } from '@/auth';
import { CreateReviewInput } from '@/schemas';
import { ActionResponse } from '@/types/action';
import { httpClient } from '@/apis/core/httpClient';
import { CACHE_TAGS } from '@/constants/cacheTags';

/**
 * 숙소에 대한 리뷰를 작성하는 서버 액션 입니다.
 * @param roomId - 리뷰를 작성할 숙소의 ID
 * @param formData - 리뷰 작성 데이터 (정확성, 의사소통, 청결도, 위치, 체크인, 가격 대비 만족도, 리뷰 내용)
 * @returns {Promise<ActionResponse>} 액션 결과
 */
export async function createReview(
  roomId: number,
  formData: CreateReviewInput,
): Promise<ActionResponse> {
  try {
    // 세션 체크
    const session = await auth();
    if (!session) {
      return {
        success: false,
        message: '로그인이 필요합니다',
        status: 401,
      };
    }
    // API 요청
    const response = await httpClient.post<void>(`/rooms/${roomId}/reviews`, formData);

    if (!response.success) {
      // API에서 명시적으로 처리되는 에러
      return {
        success: false,
        message: response.message || '리뷰 작성에 실패했습니다. 잠시 후 다시 시도해 주세요.',
        status: response.status,
      };
    }
    // 해당 숙소 리뷰 캐시 무효화
    revalidateTag(CACHE_TAGS.REVIEWS.DETAIL(roomId));

    // 성공 시 응답
    return {
      success: true,
      status: 201,
    };
  } catch (error) {
    // fetch 자체가 실패한 경우(네트워크 연결 끊김, CORS 오류, DNS 실패 등 요청 자체가 실패한 경우)
    return {
      success: false,
      message:
        '네트워크 문제로 리뷰 작성에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
      status: 500,
    };
  }
}
