import { NextRequest } from 'next/server';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginationMetadata {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export function getPaginationParams(
  request: NextRequest,
  defaultLimit: number = DEFAULT_LIMIT,
): PaginationParams {
  const searchParams = request.nextUrl.searchParams;
  const page = Math.max(1, Number(searchParams.get('page')) || DEFAULT_PAGE);
  const limit = Math.max(1, Number(searchParams.get('limit')) || defaultLimit);

  return {
    page,
    limit,
  };
}

export function getPaginationMetadata(
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

export function getSkipTake(page: number = DEFAULT_PAGE, limit: number = DEFAULT_LIMIT) {
  return {
    skip: (page - 1) * limit,
    take: limit,
  };
}
