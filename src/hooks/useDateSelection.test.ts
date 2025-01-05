import { act, renderHook } from '@testing-library/react';
import { addDays } from 'date-fns';
import { useDateSelection } from '@/hooks/useDateSelection';

describe('useDateSelection', () => {
  // 테스트에 사용할 기본 props
  const mockOnDateChange = jest.fn();
  const baseDate = new Date('2025-01-01');
  const availableDates = ['2025-01-01', '2025-01-02', '2025-01-03', '2025-01-04', '2025-01-05'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('초기 selectMode가 checkIn이어야 한다', () => {
    const { result } = renderHook(() =>
      useDateSelection({
        availableDates,
        onDateChange: mockOnDateChange,
        startDate: null,
        endDate: null,
      }),
    );

    expect(result.current.selectMode).toBe('checkIn');
  });

  test('setSelectMode로 모드를 변경할 수 있어야 한다', () => {
    const { result } = renderHook(() =>
      useDateSelection({
        availableDates,
        onDateChange: mockOnDateChange,
        startDate: null,
        endDate: null,
      }),
    );

    act(() => {
      result.current.setSelectMode('checkOut');
    });

    expect(result.current.selectMode).toBe('checkOut');
  });

  describe('handleDateSelect - 체크인 모드', () => {
    it('selectedDay가 없으면 함수가 일찍 종료되어야 한다', () => {
      const { result } = renderHook(() =>
        useDateSelection({
          availableDates,
          onDateChange: mockOnDateChange,
          startDate: null,
          endDate: null,
        }),
      );

      act(() => {
        result.current.handleDateSelect(undefined, undefined as unknown as Date);
      });

      expect(mockOnDateChange).not.toHaveBeenCalled();
    });

    test('endDate가 있고 선택한 날짜가 endDate보다 이전일 때, 기존 endDate 유지', () => {
      const { result } = renderHook(() =>
        useDateSelection({
          availableDates,
          onDateChange: mockOnDateChange,
          startDate: null,
          endDate: new Date('2025-01-03'),
        }),
      );

      act(() => {
        result.current.handleDateSelect(undefined, new Date('2025-01-01'));
      });

      expect(mockOnDateChange).toHaveBeenCalledWith(new Date('2025-01-01'), new Date('2025-01-03'));
    });

    test('체크인 날짜 선택 시 다음날을 체크아웃으로 설정해야 한다', () => {
      const { result } = renderHook(() =>
        useDateSelection({
          availableDates,
          onDateChange: mockOnDateChange,
          startDate: null,
          endDate: null,
        }),
      );

      act(() => {
        result.current.handleDateSelect(undefined, baseDate);
      });

      expect(mockOnDateChange).toHaveBeenCalledWith(baseDate, addDays(baseDate, 1));
    });

    test('선택한 날짜가 현재 체크아웃보다 이후면 체크아웃 모드로 전환되어야 한다', () => {
      const { result } = renderHook(() =>
        useDateSelection({
          availableDates,
          onDateChange: mockOnDateChange,
          startDate: null,
          endDate: addDays(baseDate, 2),
        }),
      );

      act(() => {
        result.current.handleDateSelect(undefined, addDays(baseDate, 3));
      });
      expect(result.current.selectMode).toBe('checkOut');
    });

    test('예약 불가능한 날짜 범위는 선택되지 않아야 한다', () => {
      const { result } = renderHook(() =>
        useDateSelection({
          availableDates: ['2025-01-03', '2025-01-04'],
          onDateChange: mockOnDateChange,
          startDate: null,
          endDate: null,
        }),
      );

      act(() => {
        result.current.handleDateSelect(undefined, baseDate);
      });

      expect(mockOnDateChange).not.toHaveBeenCalled();
    });
  });

  describe('handleDateSelect - 체크아웃 모드', () => {
    it('체크아웃 모드에서 startDate가 null일 때의 동작 테스트', () => {
      const { result } = renderHook(() =>
        useDateSelection({
          availableDates,
          onDateChange: mockOnDateChange,
          startDate: null,
          endDate: null,
        }),
      );

      act(() => {
        result.current.setSelectMode('checkOut');
      });

      act(() => {
        result.current.handleDateSelect(undefined, new Date('2025-01-01'));
      });

      // isBeforeCurrentStartDate가 true가 되어 이 배열이 만들어져야 함
      expect(mockOnDateChange).toHaveBeenCalledWith(new Date('2025-01-01'), new Date('2025-01-02'));
    });

    test('체크아웃 날짜가 체크인 이전이면 새로운 범위가 설정되어야 한다', () => {
      const startDate = addDays(baseDate, 2);
      const { result } = renderHook(() =>
        useDateSelection({
          availableDates,
          onDateChange: mockOnDateChange,
          startDate,
          endDate: null,
        }),
      );

      act(() => {
        result.current.setSelectMode('checkOut');
        result.current.handleDateSelect(undefined, baseDate);
      });

      expect(mockOnDateChange).toHaveBeenCalledWith(baseDate, addDays(baseDate, 1));
    });

    test('체크아웃 날짜가 체크인 이후면 체크아웃만 업데이트 되어야 한다', () => {
      const startDate = baseDate;
      const { result } = renderHook(() =>
        useDateSelection({
          availableDates,
          onDateChange: mockOnDateChange,
          startDate: startDate,
          endDate: addDays(startDate, 1),
        }),
      );
      const newEndDate = addDays(startDate, 3);

      act(() => {
        result.current.setSelectMode('checkOut');
      });

      act(() => {
        result.current.handleDateSelect(undefined, newEndDate);
      });

      expect(mockOnDateChange).toHaveBeenCalledWith(startDate, newEndDate);
    });

    test('선택한 날짜가 예약 불가능한 범위일 때, onDateChange가 호출되지 않아야 한다', () => {
      const { result } = renderHook(() =>
        useDateSelection({
          availableDates: ['2025-01-01', '2025-01-02'],
          onDateChange: mockOnDateChange,
          startDate: new Date('2025-01-01'),
          endDate: new Date('2025-01-02'),
        }),
      );

      act(() => {
        result.current.setSelectMode('checkOut');
      });

      act(() => {
        result.current.handleDateSelect(undefined, new Date('2025-01-03'));
      });

      expect(mockOnDateChange).not.toHaveBeenCalled();
    });
  });
});
