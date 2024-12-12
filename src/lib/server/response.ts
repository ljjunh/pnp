import { NextResponse } from 'next/server';

export interface BaseResponse<T> {
  success: boolean;
  status: number;
  data?: T;
  message: string;
  errors?: {
    [key: string]: string;
  }[];
}

export class CustomResponse<T = unknown> extends NextResponse<BaseResponse<T>> {
  constructor(body?: BodyInit | null, init?: ResponseInit) {
    super(body, init);
  }

  static ok<T>(data: T): CustomResponse<T> {
    return this.json(
      {
        success: true,
        status: 200,
        data: data,
        message: 'OK',
      },
      {
        status: 200,
      },
    );
  }

  static created<T>(data: T): CustomResponse<T> {
    return this.json(
      {
        success: true,
        status: 201,
        data,
        message: 'created',
      },
      {
        status: 201,
      },
    );
  }

  static errors<T>(message: string = '서버 에러 입니다.', status: number = 500): CustomResponse<T> {
    return this.json(
      {
        success: false,
        status,
        message,
      },
      {
        status,
      },
    );
  }
}
