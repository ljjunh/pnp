import { login, logout } from '@/lib/features/auth/authSlice';
import { RootState } from '@/lib/store';
import { useDispatch, useSelector } from 'react-redux';

export const useAuth = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const handleLogin = (token: string) => {
    dispatch(login(token));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    isLoggedIn,
    accessToken,
    isAuthenticated: !!accessToken,
    login: handleLogin,
    logout: handleLogout,
  };
};
