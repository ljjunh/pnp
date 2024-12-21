import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  modalState: boolean;
  modalId: string | null;
}

const initialState: ModalState = {
  modalState: false,
  modalId: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state.modalState = true;
      state.modalId = action.payload;
    },
    closeModal: (state) => {
      state.modalState = false;
      state.modalId = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
