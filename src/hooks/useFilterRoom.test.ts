import filter from '@/mocks/fixtures/filter.json';
import filterRoom from '@/mocks/fixtures/filterRoom.json';
import { FilterType } from '@/schemas/rooms';
import { act, renderHook } from '@testing-library/react';
import { getFilterRoom } from '@/apis/filters/queries';
import { useToast } from '@/hooks/use-toast';
import { useFilterRooms } from '@/hooks/useFilterRooms';

// getFilterRoom 모킹
jest.mock('@/apis/filters/queries', () => ({
  getFilterRoom: jest.fn(),
}));

// toast 모킹
jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn(),
}));

describe('useFilterRoom test', () => {
  const mockToast = jest.fn();

  const mockProps = {
    filter: filter as FilterType,
    initialRooms: [],
    hasNext: true,
    roomCount: 10,
  };

  beforeEach(() => {
    (useToast as jest.Mock).mockImplementation(() => ({
      toast: mockToast,
    }));

    jest.clearAllMocks();
  });

  test('초기 상태가 올바르게 설정되어야 한다.', () => {
    const { result } = renderHook(() => useFilterRooms(mockProps));

    expect(result.current.rooms).toEqual(mockProps.initialRooms);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasNextPage).toBe(mockProps.hasNext);
  });

  test('fetchNextPage 함수가 호출되면, 방을 불러와야 한다.', async () => {
    const mockNextData = filterRoom.data;

    (getFilterRoom as jest.Mock).mockResolvedValue({
      data: mockNextData,
      page: { hasNextPage: false },
    });

    const { result } = renderHook(() => useFilterRooms(mockProps));

    await act(async () => {
      await result.current.fetchNextPage();
    });

    expect(result.current.rooms).toEqual([...mockProps.initialRooms, ...mockNextData]);
    expect(result.current.hasNextPage).toBe(false);
  });

  test('에러 발생 시 에러 메시지를 출력해야 한다.', async () => {
    (getFilterRoom as jest.Mock).mockRejectedValueOnce(new Error('API 에러'));

    const { result } = renderHook(() => useFilterRooms(mockProps));

    // fetchNextPage 호출
    await act(async () => {
      await result.current.fetchNextPage();
    });

    // 토스트가 올바른 메시지와 함께 호출되었는지 확인
    expect(mockToast).toHaveBeenCalledWith({
      title: '방 목록을 불러오는 데 실패하였습니다. 잠시 후 다시 시도해주세요.',
      variant: 'destructive',
    });
  });
});
