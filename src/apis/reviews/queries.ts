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

export async function getReviews(roomId: number): Promise<GetReviewsResponse> {
  const response = await httpClient.get<GetReviewsResponse>(`/rooms/${roomId}/reviews`);

  if (!response.success) {
    switch (response.status) {
      default:
        throw new Error(response.message);
    }
  }
  return response.data;
}
