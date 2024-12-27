import { act, renderHook } from '@testing-library/react';
import type { ToastProps } from '@/components/ui/toast';
import { useToast } from './use-toast';

// 기본 타입 정의
type TestToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

// update용 타입 정의 (id는 필수)
type TestToastUpdate = Partial<Omit<TestToast, 'id'>> & { id: string };

describe('토스트 기능 테스트', () => {
  beforeEach(() => {
    // 각 테스트 전에 toast 상태 초기화
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.toasts.forEach((toast) => {
        result.current.dismiss(toast.id);
      });
    });
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('toast를 생성할 수 있다', async () => {
    // given
    const { result } = renderHook(() => useToast());

    // when
    act(() => {
      result.current.toast({
        title: 'Test Toast',
        description: 'Test Description',
      });
    });

    // then
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0]).toMatchObject({
      title: 'Test Toast',
      description: 'Test Description',
      open: true,
    });
  });

  test('TOAST_LIMIT(1)을 초과하지 않는다', () => {
    // given
    const { result } = renderHook(() => useToast());

    // when
    act(() => {
      result.current.toast({ title: 'First Toast' });
    });
    act(() => {
      result.current.toast({ title: 'Second Toast' });
    });

    // then
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe('Second Toast');
  });

  test('toast를 dismiss할 수 있다', () => {
    // given
    const { result } = renderHook(() => useToast());
    let toastId: string;

    // when
    act(() => {
      toastId = result.current.toast({ title: 'Test Toast' }).id;
    });

    act(() => {
      result.current.dismiss(toastId);
    });

    // then
    expect(result.current.toasts[0].open).toBe(false);
  });

  test('toast가 dismiss되고 TOAST_REMOVE_DELAY 후에 제거된다', () => {
    // given
    const { result } = renderHook(() => useToast());
    let toastId: string;

    // when
    act(() => {
      toastId = result.current.toast({ title: 'Test Toast' }).id;
    });

    act(() => {
      // 먼저 dismiss 해야함
      result.current.dismiss(toastId);
    });

    act(() => {
      // dismiss 후 TOAST_REMOVE_DELAY 만큼 시간 진행
      jest.advanceTimersByTime(1000000);
    });

    // then
    expect(result.current.toasts).toHaveLength(0);
  });

  test('onOpenChange가 false로 호출되면 toast가 dismiss된다', () => {
    // given
    const { result } = renderHook(() => useToast());

    // when
    act(() => {
      result.current.toast({ title: 'Test Toast' });
    });

    act(() => {
      result.current.toasts[0].onOpenChange?.(false);
    });

    // then
    expect(result.current.toasts[0].open).toBe(false);
  });

  test('toast를 update할 수 있다', () => {
    // given
    const { result } = renderHook(() => useToast());
    let toastId: string;
    let updateToast: (props: TestToastUpdate) => void;

    // when
    act(() => {
      const toast = result.current.toast({ title: 'Original Toast' });
      toastId = toast.id;
      updateToast = toast.update;
    });

    act(() => {
      updateToast({ id: toastId, title: 'Updated Toast' });
    });

    // then
    const updatedToast = result.current.toasts.find((t) => t.id === toastId);
    expect(updatedToast?.title).toBe('Updated Toast');
  });

  test('모든 toast를 한번에 dismiss할 수 있다', () => {
    // given
    const { result } = renderHook(() => useToast());

    // when
    act(() => {
      result.current.toast({ title: 'Toast 1' });
      // TOAST_LIMIT이 1이라 하나만 추가됨
    });

    act(() => {
      result.current.dismiss(); // toastId 없이 호출
    });

    // then
    expect(result.current.toasts[0].open).toBe(false);
  });

  test('여러번 dispatch되어도 listeners가 중복 등록되지 않는다', () => {
    // given
    const { result, rerender } = renderHook(() => useToast());

    // when
    rerender(); // useEffect 재실행

    act(() => {
      result.current.toast({ title: 'Test Toast' });
    });

    // then
    expect(result.current.toasts).toHaveLength(1);
  });

  test('컴포넌트가 unmount되면 listener가 제거된다', () => {
    // given
    const { result, unmount } = renderHook(() => useToast());

    // when
    act(() => {
      result.current.toast({ title: 'Test Toast' });
    });

    unmount();

    // 새로운 훅을 렌더링하여 listener가 정상적으로 제거되었는지 확인
    const { result: newResult } = renderHook(() => useToast());

    // then
    expect(newResult.current.toasts).toHaveLength(1); // 이전 toast가 남아있어야 함
  });

  test('이미 제거 큐에 있는 toast는 다시 추가되지 않는다', () => {
    // given
    const { result } = renderHook(() => useToast());
    let toastId: string;

    // when
    act(() => {
      toastId = result.current.toast({ title: 'Test Toast' }).id;
    });

    // dismiss를 두 번 호출
    act(() => {
      result.current.dismiss(toastId);
      result.current.dismiss(toastId); // 이미 큐에 있는 toast
    });

    // then
    expect(result.current.toasts[0].open).toBe(false);

    // TOAST_REMOVE_DELAY 후에도 정상적으로 제거되는지 확인
    act(() => {
      jest.advanceTimersByTime(1000000);
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  test('모든 toast를 제거할 수 있다', () => {
    // given
    const { result } = renderHook(() => useToast());

    // when
    act(() => {
      result.current.toast({ title: 'Toast 1' });
    });

    act(() => {
      result.current.dismiss();
      jest.advanceTimersByTime(1000000);
    });

    // then
    expect(result.current.toasts).toHaveLength(0);
  });

  test('toast의 생명주기가 올바르게 동작한다', () => {
    // given
    const { result, unmount } = renderHook(() => useToast());

    // when - 첫 번째 toast 생성
    act(() => {
      result.current.toast({ title: 'Test Toast' });
    });

    // unmount로 listener 제거
    unmount();

    // 이 시점에서는 listeners가 비어있음
    const { result: newResult } = renderHook(() => useToast());

    // dispatch 호출 - listeners가 비어있어도 에러가 나지 않아야 함
    act(() => {
      newResult.current.toast({ title: 'New Toast' });
    });

    // then
    expect(newResult.current.toasts).toHaveLength(1);
    expect(newResult.current.toasts[0].title).toBe('New Toast');
  });
});
