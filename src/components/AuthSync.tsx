'use client';

import { useEffect } from 'react';
import { login, logout } from '@/lib/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { getAccessToken } from '@/utils/cookies';

export function AuthSync() {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = getAccessToken();

    if (accessToken) {
      dispatch(login(accessToken));
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  useEffect(() => {
    const handleFocus = () => {
      const accessToken = getAccessToken();
      if (accessToken) {
        dispatch(login(accessToken));
      } else {
        dispatch(logout());
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [dispatch]);

  return null;
}
