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
 *
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
  const response = await httpClient.get<GetReviewsResponse>(
    `/rooms/${roomId}/reviews${page ? `?page=${page}` : ''}${limit ? `${page ? '&' : '?'}limit=${limit}` : ''}`,
  );

  if (!response.success) {
    switch (response.status) {
      default:
        throw new Error(response.message);
    }
  }
  return response.data;
}
