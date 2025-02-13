import { redirect } from 'next/navigation';
import { CustomError } from '@/errors';
import httpClient from '@/apis/core/httpClient';
import { ROUTES } from '@/constants/routeURL';
import { getRecentView, getScrapList } from './queries';

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

jest.mock('@/apis/core/httpClient', () => ({
  get: jest.fn(),
}));

describe('위시리스트 페이지 API 요청', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getRecentView', () => {
    const mockRecentViewData = [
      { id: 1, title: 'Recent 1' },
      { id: 2, title: 'Recent 2' },
    ];

    it('성공적으로 최근 본 컨텐츠를 가져온다', async () => {
      (httpClient.get as jest.Mock).mockResolvedValue({
        success: true,
        data: mockRecentViewData,
      });

      const result = await getRecentView();

      expect(result).toEqual(mockRecentViewData);
      expect(httpClient.get).toHaveBeenCalledWith('/users/recent');
    });

    it('401 에러시 로그인 페이지로 리다이렉트된다', async () => {
      (httpClient.get as jest.Mock).mockRejectedValue(new CustomError('Unauthorized', 401));

      await getRecentView();

      expect(redirect).toHaveBeenCalledWith(ROUTES.LOGIN);
    });

    it('API 호출 실패시 CustomError를 던진다', async () => {
      (httpClient.get as jest.Mock).mockResolvedValue({
        success: false,
        message: 'Failed',
        status: 400,
      });

      await expect(getRecentView()).rejects.toThrow(CustomError);
    });

    it('일반 에러 발생시 500 CustomError를 던진다', async () => {
      (httpClient.get as jest.Mock).mockRejectedValue(new Error('Network error'));

      const expectedError = new CustomError(
        '서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
        500,
      );

      await expect(getRecentView()).rejects.toThrow(expectedError.message);
      await expect(getRecentView()).rejects.toHaveProperty('statusCode', 500);
    });
  });

  describe('getScrapList', () => {
    const mockScrapData = [
      { id: 1, title: 'Scrap 1' },
      { id: 2, title: 'Scrap 2' },
    ];

    it('성공적으로 스크랩 목록을 가져온다', async () => {
      (httpClient.get as jest.Mock).mockResolvedValue({
        success: true,
        data: mockScrapData,
      });

      const result = await getScrapList();

      expect(result).toEqual(mockScrapData);
      expect(httpClient.get).toHaveBeenCalledWith('/users/scraps');
    });

    it('401 에러시 로그인 페이지로 리다이렉트된다', async () => {
      (httpClient.get as jest.Mock).mockRejectedValue(new CustomError('Unauthorized', 401));

      await getScrapList();

      expect(redirect).toHaveBeenCalledWith(ROUTES.LOGIN);
    });

    it('API 호출 실패시 CustomError를 던진다', async () => {
      (httpClient.get as jest.Mock).mockResolvedValue({
        success: false,
        message: 'Failed',
        status: 400,
      });

      await expect(getScrapList()).rejects.toThrow(CustomError);
    });

    it('일반 에러 발생시 500 CustomError를 던진다', async () => {
      (httpClient.get as jest.Mock).mockRejectedValue(new Error('Network error'));

      const expectedError = new CustomError(
        '서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
        500,
      );

      await expect(getScrapList()).rejects.toThrow(expectedError.message);
      await expect(getScrapList()).rejects.toHaveProperty('statusCode', 500);
    });
  });
});
