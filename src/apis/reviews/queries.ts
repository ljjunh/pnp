import { notFound } from 'next/navigation';
import { CustomError } from '@/errors';
import { ReviewSummarize } from '@/types/review';
import { httpClient } from '@/apis/core/httpClient';

export interface GetReviewsResponse {
  data: ReviewSummarize;
  page: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

/**
 * 특정 숙소의 리뷰 목록을 조회합니다.
 * @param roomId - 조회할 숙소의 ID
 * @param page - 페이지 번호 (기본값: 1)
 * @param limit - 페이지당 리뷰 수 (기본값: 10)
 * @returns 리뷰 목록과 페이지네이션 정보
 */

export async function getReviews(
  roomId: number,
  page?: number,
  limit?: number,
): Promise<GetReviewsResponse> {
  try {
    const response = await httpClient.get<GetReviewsResponse>(
      `/rooms/${roomId}/reviews${page ? `?page=${page}` : ''}${limit ? `${page ? '&' : '?'}limit=${limit}` : ''}`,
    );

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
