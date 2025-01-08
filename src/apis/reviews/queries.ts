import { notFound } from 'next/navigation';
import { CustomError } from '@/errors';
import { ReviewSortType, ReviewSummarize } from '@/types/review';
import { httpClient } from '@/apis/core/httpClient';
import { CACHE_TAGS } from '@/constants/cacheTags';

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
 * @param options -Next.js 캐싱 설정을 위한 옵션 (서버 컴포넌트에서만 사용)
 * @returns 리뷰 목록과 페이지네이션 정보
 */
export async function getReviews(
  roomId: number,
  page?: number,
  limit?: number,
  sortType?: ReviewSortType,
  options?: { next?: NextFetchRequestConfig },
): Promise<GetReviewsResponse> {
  try {
    let queryParams;
    if (page || limit || sortType) {
      // 파라미터가 하나라도 있을 때만 생성
      queryParams = new URLSearchParams();
      if (page) queryParams.append('page', String(page));
      if (limit) queryParams.append('limit', String(limit));
      if (sortType) queryParams.append('sort', sortType);
    }

    const queryString = queryParams?.toString();
    const url = `/rooms/${roomId}/reviews${queryParams ? `?${queryString}` : ''}`;

    const response = await httpClient.get<GetReviewsResponse>(url, options);

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
 * 특정 숙소의 리뷰권한을 조회합니다.
 * @param roomId - 조회할 숙소의 ID
 * @returns {Promise<string[]>} 리뷰 작성 가능한 orderNumber 배열, 권한이 없거나 오류 발생 시 빈 배열([]) 반환
 *
 * @remarks
 * - 리뷰 작성 권한이 있다면 주문번호 배열 반환, 없다면 빈 배열([])이 반환됩니다.
 * - 숙소 하나에 여러 번 예약이 가능하므로 여러 개의 주문번호가 반환될 수 있습니다.
 * - 배열은 예약 날짜 기준 오름차순 정렬 (오래된 예약이 앞쪽에 위치)
 * - 네트워크 오류 등이 발생해도 빈 배열([])을 반환하여 권한 없음과 동일하게 처리합니다.
 * - 리뷰 권한 조회는 부가 기능이므로 오류가 발생해도 전체 페이지에 영향을 주지 않아야 하며,
 * - 사용자에게 별도의 에러 메시지를 표시할 필요가 없다고 판단했습니다.
 */
export async function getReviewAvailable(roomId: number): Promise<string[]> {
  try {
    const response = await httpClient.get<string[]>(`/rooms/${roomId}/reviews/available`, {
      next: {
        tags: [CACHE_TAGS.REVIEWS.AVAILABLE(roomId)],
      },
    });

    return response.success ? response.data : [];
  } catch {
    // 네트워크 오류 등이 발생해도 [] 빈배열을 반환하여 권한없음 처리
    return [];
  }
}
