import { revalidateTag } from 'next/cache';
import { auth } from '@/auth';
import { createReservation } from '@/apis/reservation/actions';
import { CACHE_TAGS } from '@/constants/cacheTags';

// @/auth의 auth를 모킹
jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));

// revalidateTag 모킹
jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

describe('Reservation Action Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('createReservation', () => {
    // 모든 테스트에서 사용할 유효한 예약 입력값
    const validInput = {
      roomId: 1,
      guestNumber: 2,
      checkIn: new Date('2024-12-27'),
      checkOut: new Date('2024-12-29'),
    };

    test('성공적으로 예약을 생성한다', async () => {
      // 로그인 된 상태로 가정
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      const result = await createReservation(validInput);

      expect(result.success).toBe(true);
      expect(result.status).toBe(201);
      expect(revalidateTag).toHaveBeenCalledTimes(1);
      expect(revalidateTag).toHaveBeenCalledWith(CACHE_TAGS.ROOMS.AVAILABLE(validInput.roomId));
      // 응답에 data 객체가 존재하는지 확인
      expect(result.data).toBeDefined();
      // data 객체 안에 orderNumber가 있는지 확인
      expect(result.data?.orderNumber).toBeDefined();
    });

    test('로그인 하지 않은 경우 401 응답 객체를 반환한다', async () => {
      // 로그인 하지 않은 상태로 가정
      (auth as jest.Mock).mockResolvedValue(null);

      const result = await createReservation(validInput);

      expect(result.success).toBe(false);
      expect(result.status).toBe(401);
      expect(result.message).toBe('로그인이 필요합니다.');
    });

    test('서버에서 에러 응답이 온 경우 서버에서 온 응답 객체(success, status, message)를 반환한다', async () => {
      //로그인 된 상태로 가정
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      const errorInput = {
        ...validInput,
        roomId: 500,
      };

      const result = await createReservation(errorInput);

      expect(result.success).toBe(false);
      expect(result.status).toBe(500);
      expect(result.message).toBe('서버 에러가 발생했습니다.');
    });

    test('서버 에러 응답에 message가 없는 경우 기본 메시지를 반환한다', async () => {
      //로그인 된 상태로 가정
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      const errorInput = {
        ...validInput,
        roomId: 502,
      };

      const result = await createReservation(errorInput);

      expect(result.success).toBe(false);
      expect(result.status).toBe(500);
      expect(result.message).toBe('예약에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    });

    test('네트워크 에러 발생 시 500 응답 객체를 반환한다', async () => {
      // 로그인 된 상태로 가정
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      const errorInput = {
        ...validInput,
        roomId: 501,
      };
      const result = await createReservation(errorInput);

      expect(result.success).toBe(false);
      expect(result.status).toBe(500);
      expect(result.message).toBe(
        '네트워크 문제로 예약에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
      );
    });
  });
});
