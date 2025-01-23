import { notFound } from 'next/navigation';
import { CustomError } from '@/errors';
import { Room } from '@/types/room';
import httpClient from '@/apis/core/httpClient';
import { CACHE_TAGS } from '@/constants/cacheTags';

/**
 * 특정 숙소의 상세정보를 조회합니다.
 * @param roomId - 조회할 숙소의 ID
 * @returns {Promise<Room>} 숙소의 상세 정보
 * @remarks 숙소를 찾을 수 없는 경우 Next.js not-found 페이지를 렌더링
 */
export async function getRoom(roomId: number): Promise<Room> {
  try {
    const response = await httpClient.get<Room>(`/rooms/${roomId}`, {
      next: {
        tags: [CACHE_TAGS.ROOMS.DETAIL(roomId)],
      },
    });

    if (!response.success) {
      switch (response.status) {
        case 404:
          notFound();
        default:
          throw new CustomError(response.message, response.status);
      }
    }

    return response.data;
  } catch (error) {
    console.log(error);
    // 위에서 던진 CustomError는 그대로 다시 throw
    if (error instanceof CustomError) {
      throw error;
    }

    // fetch 실패로 인한 일반 Error는 CustomError로 변환
    throw new CustomError(
      '서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      500,
    );
  }
}

/**
 * 특정 숙소의 스크랩정보를 조회합니다.
 * @param roomId - 조회할 숙소의 ID
 * @returns {Promise<boolean>} 숙소의 스크랩 여부
 * @remarks
 * 이 함수는 실패 시 false를 반환하도록 설계되었습니다.
 * 스크랩은 부가 기능이므로 오류가 발생해도 전체 페이지에 영향을 주지 않아야 하며,
 * 사용자에게 별도의 에러 메시지를 표시할 필요가 없다고 판단했습니다.
 */
export async function getScrap(roomId: number): Promise<boolean> {
  try {
    const response = await httpClient.get<boolean>(`/rooms/${roomId}/scrap`, {
      next: {
        tags: [CACHE_TAGS.ROOMS.SCRAP(roomId)],
      },
    });

    // API 응답이 성공이면 스크랩 상태 반환, 실패면 false 반환
    return response.success ? response.data : false;
  } catch {
    // 네트워크 오류 등이 발생해도 false 반환하여 스크랩되지 않은 것으로 처리
    return false;
  }
}

/**
 * 특정 숙소의 현재 달의 예약 가능한 날짜를 조회합니다. (서버 사이드)
 * 캐시 태그를 포함하여 Next.js의 캐시 무효화 기능을 사용할 수 있습니다.
 * @param {number} roomId - 조회할 숙소의 ID
 * @returns {Promise<string[]>} 예약 가능한 날짜들의 배열 [YYYY.MM.DD] 형식)
 * @remarks
 * 이 함수는 페이지 초기 로드 시 사용되는 SSR 전용 함수입니다.
 * 현재 날짜를 기준으로 해당 월의 데이터만 자동으로 조회하며,
 * 사용자가 다른 월을 조회할 때는 getRoomAvailableClient를 사용해야 합니다.
 */
export async function getRoomAvailable(roomId: number): Promise<string[]> {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  try {
    const response = await httpClient.get<string[]>(
      `/rooms/${roomId}/available?year=${currentYear}&month=${currentMonth}`,
      {
        next: {
          tags: [CACHE_TAGS.ROOMS.AVAILABLE(roomId)],
        },
      },
    );

    if (!response.success) {
      // throw new CustomError(response.message, response.status);
      return ['2025.01.01', '2025.01.02', '2025.01.03'];
    }
    // return response.data;
    return ['2025.01.01', '2025.01.02', '2025.01.03'];
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(
      '서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      500,
    );
  }
}

/**
 * 특정 숙소의 지정된 년월의 예약 가능한 날짜를 조회합니다. (클라이언트 사이드)
 * @param {number} roomId - 조회할 숙소의 ID
 * @param {number} year - 조회할 연도 (예: 2025)
 * @param {number} month - 조회할 월 (1-12)
 * @returns {Promise<string[]>} 예약 가능한 날짜들의 배열 [YYYY.MM.DD] 형식)
 */
export async function getRoomAvailableClient(
  roomId: number,
  year: number,
  month: number,
): Promise<string[]> {
  try {
    const response = await httpClient.get<string[]>(
      `/rooms/${roomId}/available?year=${year}&month=${month}`,
    );

    if (!response.success) {
      return ['2025.01.01', '2025.01.02', '2025.01.03'];
      // throw new CustomError(response.message, response.status);
    }
    // return response.data;
    return ['2025.01.01', '2025.01.02', '2025.01.03'];
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(
      '서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      500,
    );
  }
}
