import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  constructor(message: string = '잘못된 요청입니다') {
    super(message, 400);
  }
}

export class UnAuthorizedError extends CustomError {
  constructor(message: string = '인증되지 않은 요청입니다') {
    super(message, 401);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string = '권한이 없습니다') {
    super(message, 403);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string = '존재하지 않는 리소스입니다') {
    super(message, 404);
  }
}

export class ServerError extends CustomError {
  constructor(message: string = '서버 에러입니다') {
    super(message, 500);
  }
}

export class TooManyRequestError extends CustomError {
  constructor(message: string = '요청이 너무 많습니다') {
    super(message, 429);
  }
}
