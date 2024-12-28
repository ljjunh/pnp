import { act, renderHook } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalIdType, useModal } from '@/hooks/useModal';

// useDispatch, useSelector 모킹
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

//

describe('useModal test', () => {
  const mockDispatch = jest.fn();

  const modalId = 'room-filter-modal';
  const anotherModalId = 'room-amenities-modal';

  // beforeEach에서 모킹된 함수들을 초기화
  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  test('초기 렌더링 시 modalState가 false인지 확인', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue(false);

    // useModal 훅을 렌더링
    const { result } = renderHook(() => useModal(modalId));

    // 초기값이 false인지 확인
    expect(result.current.modalState).toBe(false);
  });

  test('handleOpenModal 함수를 호출하면 dispatch가 openModal을 호출하고, modalState가 true인지 확인', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue(false);

    // useModal 훅을 렌더링
    const { result } = renderHook(() => useModal(modalId));

    // handleOpenModal 함수 호출, act를 사용해 비동기 처리
    act(() => {
      result.current.handleOpenModal();
    });

    // openModal이 dispatch 되었는지 확인
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'modal/openModal',
      payload: modalId,
    });

    // modalState가 true인지 확인
    expect(result.current.modalState).toBe(true);
  });

  test('handleCloseModal 함수를 호출하면 dispatch가 closeModal을 호출하고, modalState가 false인지 확인', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue(false);

    // useModal 훅을 렌더링
    const { result } = renderHook(() => useModal(modalId));

    // handleCloseModal 함수 호출, act를 사용해 비동기 처리
    act(() => {
      result.current.handleCloseModal();
    });

    // closeModal이 dispatch 되었는지 확인
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'modal/closeModal',
    });

    // modalState가 false인지 확인
    expect(result.current.modalState).toBe(false);
  });

  test('현재 모달이 열려있을 때, 다른 모달은 닫혀있어야한다.', () => {
    // 모달이 열려있는 상태로 설정
    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        modal: {
          modalState: true,
          modalId: modalId,
        },
      }),
    );

    // useModal 훅을 렌더링
    const { result } = renderHook(() => useModal(anotherModalId));

    // 현재 모달이 열려있을 때, 다른 모달이 닫혀있는지 확인
    expect(result.current.modalState).toBe(false);
  });

  test('잘못된 modalId를 사용했을 때, 모달 상태는 false여야 한다.', () => {
    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        modal: {
          modalState: false,
          modalId: null,
        },
      }),
    );

    // 잘못된 modalId로 useModal 훅을 렌더링
    const { result } = renderHook(() => useModal('wrong-modal-id' as ModalIdType));

    // 모달이 닫혀있는지 확인
    expect(result.current.modalState).toBe(false);
  });
});
