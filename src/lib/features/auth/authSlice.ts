import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  isLogin: boolean;
  accessToken: string | null;
}

const initialState: AuthState = {
  isLogin: false,
  accessToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLogin = true;
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.isLogin = false;
      state.accessToken = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
