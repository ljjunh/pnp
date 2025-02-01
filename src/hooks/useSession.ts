'use client';

import { useCallback, useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { User } from '@/types/user';
import { useAuthStore } from '@/store/useAuthStore';

export function useSession() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>();
  const { setAccessToken, accessToken } = useAuthStore();

  useEffect(() => {
    const cookieToken = getCookie('accessToken');

    if (cookieToken || accessToken) {
      setAuthenticated(true);
      if (cookieToken) {
        setAccessToken(cookieToken);
      }
    } else {
      setAuthenticated(false);
    }
  }, [accessToken, setAccessToken]);

  useEffect(() => {
    if (authenticated) {
      refetch();
    }
  }, [authenticated]);

  const refetch = useCallback(async () => {
    const request = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    const response = await request.json();
    setUser(() => response.data);
  }, []);

  return { authenticated, user, refetch };
}
