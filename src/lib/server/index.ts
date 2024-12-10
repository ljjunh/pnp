import { prisma } from './client';
import {
  PaginationResponse,
  createPaginationResponse,
  getPaginationParams,
  getSkipTake,
} from './pagination';
import { ErrorResponse } from './response';

export { createPaginationResponse, getPaginationParams, getSkipTake, prisma };
export type { ErrorResponse, PaginationResponse };
