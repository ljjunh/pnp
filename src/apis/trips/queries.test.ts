import { getReservationTrip } from './queries';
import { httpClient } from '@/apis/core/httpClient';
import { CustomError } from '@/errors';

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
            image: 'host1.jpg'
          }
        }
      }
    }
  ];

  it('예약 정보를 성공적으로 조회해야 합니다', async () => {
    (httpClient.get as jest.Mock).mockResolvedValue({
      success: true,
      data: mockReservations,
      status: 200
    });

    const result = await getReservationTrip();

    expect(httpClient.get).toHaveBeenCalledWith('/reservation');
    expect(result).toEqual(mockReservations);
  });

  it('네트워크 오류 발생 시 500 에러를 던져야 합니다', async () => {
    (httpClient.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

    try {
      await getReservationTrip();
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect((error as CustomError).message).toBe(
        '서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.'
      );
    }
  });
});