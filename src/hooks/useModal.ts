import { closeModal, openModal } from '@/lib/features/modal/modalSlice';
import { RootState } from '@/lib/store';
import { useDispatch, useSelector } from 'react-redux';
import { MODAL_ID } from '@/constants/modal';

/**
 * 모달 ID 타입 - MODAL_ID 상수의 모든 키 값
 */
export type ModalIdType = (typeof MODAL_ID)[keyof typeof MODAL_ID];

/**
 * 모달 상태 관리를 위한 커스텀 훅
 *
 * @description
 * Redux store를 사용하여 모달의 열림/닫힘 상태를 관리하고
 * 모달 상태를 제어하는 함수들을 제공하는 훅
 *
 *
 * @param modalId - 관리할 모달의 고유 식별자
 *
 * @returns {object} 모달 상태와 제어 함수들을 포함한 객체
 * @returns {boolean} modalState - 현재 모달의 열림/닫힘 상태
 * @returns {() => void} handleOpenModal - 모달을 여는 함수
 * @returns {() => void} handleCloseModal - 모달을 닫는 함수
 *
 * * @example
 * ```tsx
 * const MyComponent = () => {
 *   const { modalState, handleOpenModal, handleCloseModal } = useModal(MODAL_ID(example-modal));
 *
 *   return (
 *     <button onClick={handleOpenModal}>모달 열기</button>
 *   );
 * }
 * ```
 */
export const useModal = (modalId: ModalIdType) => {
  const dispatch = useDispatch();

  const isOpen = useSelector(
    (state: RootState) => state.modal.modalState && state.modal.modalId === modalId,
  );

  const handleOpenModal = () => {
    dispatch(openModal(modalId));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return {
    modalState: isOpen,
    handleOpenModal,
    handleCloseModal,
  };
};
