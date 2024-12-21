import { dynamoDB } from './dynamodb';
import {
  PaginationResponse,
  createPaginationResponse,
  getPaginationParams,
  getSkipTake,
} from './pagination';
import { prisma } from './prisma';
import CustomResponse from './response';
import { remove, removeBulk, upload, uploadBulk } from './s3';

export {
  CustomResponse,
  createPaginationResponse,
  dynamoDB,
  getPaginationParams,
  getSkipTake,
  prisma,
  remove,
  removeBulk,
  upload,
  uploadBulk,
};
export type { PaginationResponse };
