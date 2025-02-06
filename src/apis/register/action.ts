'use server';

import { cookies } from 'next/headers';
import { ActionResponse } from '@/types/action';
import { RegisterResponse } from '@/types/room';
import httpClient from '@/apis/core/httpClient';

/**
 * 숙소 데이터를 업데이트 하는 함수
 *
 * @param {number} roomId 숙소 ID
 * @param {Record<string, string | number>} updateData 업데이트 데이터
 */
export async function updateRoomRegister(
  roomId: number,
  updateData?: Record<string, string | string[] | number | number[]>,
): Promise<ActionResponse<RegisterResponse>> {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
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

    const response = await httpClient.patch<RegisterResponse>(`/rooms/${roomId}`, updateData);

    if (!response.success) {
      switch (response.status) {
        case 400 | 401 | 403 | 404:
          // 400: '유효하지 않은 ID 형식입니다.' '예약이 존재하는 숙소는 수정할 수 없습니다.'
          // 401: '인증되지 않은 요청입니다.'
          // 403: '본인의 숙소만 수정할 수 있습니다.'
          // 404: '존재하지 않는 리소스입니다'
          return {
            success: response.success,
            message: response.message,
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
      data: response.data,
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
export async function createRoomId(): Promise<ActionResponse<number>> {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return {
        success: false,
        message: '로그인이 필요합니다.',
        status: 401,
      };
    }

    const response = await httpClient.post<number>('/rooms');

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

/**
 * 이미지 업로드 url을 생성하고 받아오는 함수
 */
export async function createImageUrl(
  roomId: number,
  imageUrl: string[],
): Promise<ActionResponse<string[]>> {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return {
        success: false,
        message: '로그인이 필요합니다.',
        status: 401,
      };
    }

    const response = await httpClient.post<string[]>(`/rooms/${roomId}/images`, {
      images: imageUrl,
    });

    if (!response.success) {
      // 403, 404, 500
      return {
        success: false,
        message: response.message || '이미지 업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.',
        status: response.status,
      };
    }

    // 성공 시 응답
    return {
      success: true,
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    // 네트워크 에러
    return {
      success: false,
      message:
        '네트워크 문제로 이미지 업로드에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
      status: 500,
    };
  }
}

/**
 * s3 url을 백엔드로 보내주는 함수
 */
export const sendS3Url = async (
  roomId: number,
  imageUrl: string[],
): Promise<ActionResponse<RegisterResponse>> => {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return {
        success: false,
        message: '로그인이 필요합니다.',
        status: 401,
      };
    }

    const response = await httpClient.put<RegisterResponse>(`/rooms/${roomId}/images`, {
      images: imageUrl,
    });

    if (!response.success) {
      // 403, 404, 500
      return {
        success: false,
        message: response.message || '이미지 업데이트에 실패했습니다. 잠시 후 다시 시도해 주세요.',
        status: response.status,
      };
    }

    // 데이터가 없을 경우 500 에러로 간주
    if (!response.data) {
      return {
        success: false,
        message: '이미지 업데이트에 실패했습니다. 잠시 후 다시 시도해 주세요.',
        status: 500,
      };
    }

    return {
      success: true,
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    // 네트워크 에러
    return {
      success: false,
      message:
        '네트워크 문제로 이미지 업데이트에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
      status: 500,
    };
  }
};
