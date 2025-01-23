'use server';

import {cookies} from 'next/headers';
import { ActionResponse } from '@/types/action';
import { CreateRoomResponse } from '@/types/room';
import httpClient from '@/apis/core/httpClient';

/**
 * 숙소 데이터를 업데이트 하는 함수
 *
 * @param {number} roomId 숙소 ID
 * @param {Record<string, string | number>} updateData 업데이트 데이터
 */
export async function updateRoomRegister(
  roomId: number,
  updateData?: Record<string, string | string[] | number>,
): Promise<ActionResponse> {
  try {
    const cookieStore = cookies();
    const authenticated = Boolean(cookieStore.get('authenticated')?.value || 'false');

    if (!authenticated) {
      return {
        success: false,
        message: '로그인이 필요합니다.',
        status: 401,
      };
    }

    if (!updateData) {
      return {
        success: false,
        message: '업데이트 정보를 입력해 주세요.',
        status: 400,
      };
    }

    const response = await httpClient.patch(`/rooms/${roomId}`, updateData);

    if (!response.success) {
      switch (response.status) {
        case 400:
          return {
            success: response.success,
            message: response.message, // '유효하지 않은 ID 형식입니다.' '예약이 존재하는 숙소는 수정할 수 없습니다.'
            status: response.status,
          };
        case 401:
          return {
            success: response.success,
            message: response.message, // '인증되지 않은 요청입니다.'
            status: response.status,
          };
        case 403:
          return {
            success: response.success,
            message: response.message, // '본인의 숙소만 수정할 수 있습니다.'
            status: response.status,
          };
        case 404:
          return {
            success: response.success,
            message: response.message, // '존재하지 않는 리소스입니다'
            status: response.status,
          };
        // 500 에러 -> 서버 에러
        default:
          return {
            success: response.success,
            message:
              response.message || '숙소 정보 수정에 실패했습니다. 잠시 후 다시 시도해 주세요.',
            status: response.status,
          };
      }
    }

    // 성공 시 응답
    return {
      success: response.success,
      status: response.status,
      message: response.message,
    };
  } catch (error) {
    return {
      success: false,
      message: '숙소 정보 수정 중 에러가 발생했습니다. 잠시 후 다시 시도해 주세요.', // 네트워크 에러
      status: 500,
    };
  }
}

/**
 * roomId를 생성하는 함수
 */
// TODO: validation zod 사용해서 처리
export async function createRoomId(): Promise<ActionResponse<CreateRoomResponse>> {
  try {
    // FIXME: 인증
    const cookieStore = cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    if (!accessToken) {
      return {
        success: false,
        message: '로그인이 필요합니다.',
        status: 401,
      };
    }

    const response = await httpClient.post<CreateRoomResponse>('/rooms');

    if (!response.success) {
      switch (response.status) {
        case 401:
          return {
            success: response.success,
            message: response.message,
            status: response.status,
          };
        case 429:
          return {
            success: response.success,
            message: response.message,
            status: response.status,
          };
        default:
          // 서버 에러
          return {
            success: false,
            message: response.message || '숙소 등록에 실패했습니다. 잠시 후 다시 시도해 주세요.',
            status: response.status,
          };
      }
    }

    // 성공 시 응답
    return {
      success: true,
      status: 201,
      data: response.data,
    };
  } catch (error) {
    // 네트워크 에러
    return {
      success: false,
      message:
        '네트워크 문제로 숙소 등록에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
      status: 500,
    };
  }
}
