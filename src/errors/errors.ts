import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {  
  constructor(message: string = '잘못된 요청입니다') {  
    super(message, 400);  
  }  
}

export class NotFoundError extends CustomError {
  constructor(message: string = '존재하지 않는 리소스입니다') {
    super(message, 404);
  }
}

export class UnAuthorizedError extends CustomError {
  constructor(message: string = '인증되지 않은 요청입니다') {
    super(message, 401);
  }
}