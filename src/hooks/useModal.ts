import { closeModal, openModal } from '@/lib/features/modal/modalSlice';
import { RootState } from '@/lib/store';
import { useDispatch, useSelector } from 'react-redux';
import { MODAL_ID } from '@/constants/modal';

export type ModalIdType = (typeof MODAL_ID)[keyof typeof MODAL_ID];

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
