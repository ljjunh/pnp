import { CustomError } from '@/errors/custom-error';
import { BadRequestError, NotFoundError, UnAuthorizedError } from '@/errors/errors';
import { z } from 'zod';

const ZodError = z.ZodError;

export { BadRequestError, CustomError, NotFoundError, UnAuthorizedError, ZodError };
