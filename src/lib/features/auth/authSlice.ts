import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  accessToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.accessToken = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
