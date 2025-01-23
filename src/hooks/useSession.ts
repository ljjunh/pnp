import { useCallback, useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { User } from '@/types/user';
import { useAuthStore } from '@/store/useAuthStore';

export function useSession() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>();
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (accessToken) {
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      refetch();
    }
  }, [authenticated]);

  const refetch = useCallback(async () => {
    const request = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${getCookie('access_token')}`,
      },
    });
    const response = await request.json();
    setUser(() => response.data);
  }, [user]);

  return { authenticated, user, refetch };
}
