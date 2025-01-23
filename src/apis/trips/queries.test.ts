import { CustomError } from '@/errors';
import httpClient from '@/apis/core/httpClient';
import { getReservationTrip } from './queries';

jest.mock('@/apis/core/httpClient');

describe('getReservationTrip', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockReservations = [
    {
      id: 1,
      orderNumber: 'ORDER1',
      status: 'CONFIRMED',
      checkIn: new Date('2024-01-10'),
      checkOut: new Date('2024-01-15'),
      room: {
        id: 1,
        title: '테스트 룸 1',
        thumbnail: 'test1.jpg',
        location: '서울',
        host: {
          id: 1,
          user: {
            name: '호스트1',
            image: 'host1.jpg',
          },
        },
      },
    },
  ];

  it('예약 정보를 성공적으로 조회한다', async () => {
    (httpClient.get as jest.Mock).mockResolvedValue({
      success: true,
      data: mockReservations,
      status: 200,
    });

    const result = await getReservationTrip();
    expect(httpClient.get).toHaveBeenCalledWith('/reservation');
    expect(result).toEqual(mockReservations);
  });

  it('빈 예약 정보를 조회한다', async () => {
    (httpClient.get as jest.Mock).mockResolvedValue({
      success: true,
      data: [],
      status: 200,
    });

    const result = await getReservationTrip();
    expect(result).toEqual([]);
  });

  it('API 실패 응답 시 에러가 발생한다', async () => {
    (httpClient.get as jest.Mock).mockResolvedValue({
      success: false,
      data: null,
      status: 400,
    });

    await expect(getReservationTrip()).rejects.toThrow(CustomError);
  });

  it('네트워크 오류 발생 시 500 에러가 발생한다', async () => {
    (httpClient.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

    await expect(getReservationTrip()).rejects.toThrow(
      '서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  });
});
