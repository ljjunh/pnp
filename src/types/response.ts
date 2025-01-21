import { ZodIssue } from 'zod';

export interface BaseResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data: T;
  errors?: ZodIssue[];
}
