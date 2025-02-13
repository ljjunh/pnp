import { redirect } from 'next/navigation';
import { CustomError } from '@/errors';
import { RecentViewResponse } from '@/types/recent';
import { ScrapResponse } from '@/types/scrap';
import httpClient from '@/apis/core/httpClient';
import { ROUTES } from '@/constants/routeURL';

export async function getRecentView(): Promise<RecentViewResponse[]> {
  try {
    const response = await httpClient.get<RecentViewResponse[]>('/users/recent');
    if (!response.success) {
      throw new CustomError(response.message, response.status);
    }
    return response.data;
  } catch (error) {
    if (error instanceof CustomError) {
      // 로그인 페이지로 리다이렉트
      if (error.statusCode === 401) {
        redirect(ROUTES.LOGIN);
      }
      throw error;
    }
    throw new CustomError(
      '서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      500,
    );
  }
}

export async function getScrapList(): Promise<ScrapResponse[]> {
  try {
    const response = await httpClient.get<ScrapResponse[]>('/users/scraps');
    if (!response.success) {
      throw new CustomError(response.message, response.status);
    }
    return response.data;
  } catch (error) {
    if (error instanceof CustomError) {
      // 로그인 페이지로 리다이렉트
      if (error.statusCode === 401) {
        redirect(ROUTES.LOGIN);
      }
      throw error;
    }
    throw new CustomError(
      '서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      500,
    );
  }
}
