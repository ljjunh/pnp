import { act, renderHook } from '@testing-library/react';
import { getRoomAvailableClient } from '@/apis/rooms/queries';
import { useRoomAvailableDates } from '@/hooks/useRoomAvailableDates';

jest.mock('@/apis/rooms/queries', () => ({
  getRoomAvailableClient: jest.fn(),
}));

describe('useRoomAvailableDates', () => {
  const mockRoomId = 1;
  const mockInitialDates = ['2025-01-01', '2025-01-02'];
  const mockNewDates = ['2025-02-01', '2025-02-02'];

  beforeEach(() => {
    jest.useFakeTimers();
    //현재 시간을 2025년 1월 1일로 고정
    jest.setSystemTime(new Date('2025-01'));
    // API 모킹 함수 초기화
    jest.clearAllMocks();
    (getRoomAvailableClient as jest.Mock).mockResolvedValue(mockNewDates);
  });

  test('초기 렌더링 시 availableDates가 initialDates로 설정된다', () => {
    const { result } = renderHook(() =>
      useRoomAvailableDates({ roomId: mockRoomId, initialDates: mockInitialDates }),
    );

    // 초기 availableDates가 initialDates와 같은지 확인
    expect(result.current.availableDates).toStrictEqual(mockInitialDates);
    // 초기엔 로딩상태가 false여야 함
    expect(result.current.isLoading).toBe(false);
  });

  test('현재 월(1월) 선택시 initialDates를 사용해야 함', async () => {
    const { result } = renderHook(() =>
      useRoomAvailableDates({ roomId: mockRoomId, initialDates: mockInitialDates }),
    );

    //현재 월(1월) 선택
    await act(async () => {
      await result.current.onMonthChange(new Date('2025-01-01'));
    });

    // API가 호출되지 않아야 함
    expect(getRoomAvailableClient).not.toHaveBeenCalled();
    // initialDates가 그대로 사용되어야 함
    expect(result.current.availableDates).toStrictEqual(mockInitialDates);
  });

  test('다른 월(2월) 선택시 API를 호출하고 새로운 데이터로 업데이트해야 함', async () => {
    const { result } = renderHook(() =>
      useRoomAvailableDates({ roomId: mockRoomId, initialDates: mockInitialDates }),
    );

    // 2월 선택
    await act(async () => {
      await result.current.onMonthChange(new Date('2025-02-01'));
    });

    // API가 올바른 인자와 함께 호출되었는지 확인
    expect(getRoomAvailableClient).toHaveBeenCalledWith(mockRoomId, 2025, 2);
    // 새로운 데이터로 업데이트 되었는지 확인
    expect(result.current.availableDates).toStrictEqual(mockNewDates);
  });

  test('캐시된 월 선택시 API를 재호출하지 않아야 함', async () => {
    const { result } = renderHook(() =>
      useRoomAvailableDates({
        roomId: mockRoomId,
        initialDates: mockInitialDates,
      }),
    );

    // 첫번째 2월 선택(API 호출 발생)
    await act(async () => {
      await result.current.onMonthChange(new Date('2025-02-01'));
    });

    // API 호출 카운터 초기화
    jest.clearAllMocks();

    // 두번째 2월 선택(캐시 사용)
    await act(async () => {
      await result.current.onMonthChange(new Date('2025-02-01'));
    });

    // API가 재호출되지 않아야 함
    expect(getRoomAvailableClient).not.toHaveBeenCalled();
    // 캐시된 데이터가 사용되어야 함
    expect(result.current.availableDates).toStrictEqual(mockNewDates);
  });

  test('API 에러 발생시 빈 배열로 설정되어야 함', async () => {
    (getRoomAvailableClient as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    const { result } = renderHook(() =>
      useRoomAvailableDates({ roomId: mockRoomId, initialDates: mockInitialDates }),
    );

    await act(async () => {
      await result.current.onMonthChange(new Date('2025-02-01'));
    });

    expect(result.current.availableDates).toStrictEqual([]);
  });
});
