import { NextRequest } from 'next/server';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

interface PaginationParams {
  page: number;
  limit: number;
}

interface PaginationMetadata {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginationResponse<T> {
  data: T[];
  page: PaginationMetadata;
}

export function getPaginationParams(
  request: NextRequest,
  defaultLimit: number = DEFAULT_LIMIT,
): PaginationParams {
  const searchParams = request.nextUrl.searchParams;
  const page = Math.max(1, Number(searchParams.get('page')) || DEFAULT_PAGE);
  // * 무제한 페이지 크기는 서버 리소스 남용으로 이어질 수 있기에 최대 페이지 크기를 제한
  const limit = Math.min(MAX_LIMIT, Math.max(1, Number(searchParams.get('limit')) || defaultLimit));

  return {
    page,
    limit,
  };
}

function getPaginationMetadata(
  totalItems: number,
  page: number,
  limit: number,
): PaginationMetadata {
  const totalPages = Math.ceil(totalItems / limit);

  return {
    currentPage: page,
    pageSize: limit,
    totalPages,
    totalItems,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

export function createPaginationResponse<T>(
  data: T[],
  totalItems: number,
  page: number,
  limit: number,
): PaginationResponse<T> {
  const metadata = getPaginationMetadata(totalItems, page, limit);

  return {
    data,
    page: metadata,
  };
}

export function getSkipTake(page: number = DEFAULT_PAGE, limit: number = DEFAULT_LIMIT) {
  // * page 값이 매우 큰 경우 skip 계산 시 정수 오버플로우가 발생할 수 있어서 안전한 최대값을 설정
  const skip = page <= 1 ? 0 : Math.min(Number.MAX_SAFE_INTEGER, (page - 1) * limit);
  return {
    skip,
    take: limit,
  };
}
