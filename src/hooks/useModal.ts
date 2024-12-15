import { closeModal, openModal } from '@/lib/features/modal/modalSlice';
import { RootState } from '@/lib/store';
import { useDispatch, useSelector } from 'react-redux';

export const useModal = () => {
  const dispatch = useDispatch();

  const modalState = useSelector((state: RootState) => state.modal.modalState);

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return {
    modalState,
    handleOpenModal,
    handleCloseModal,
  };
};
