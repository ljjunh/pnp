import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  modalState: boolean;
}

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalState: false,
  },
  reducers: {
    openModal: (state) => {
      state.modalState = true;
    },
    closeModal: (state) => {
      state.modalState = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
