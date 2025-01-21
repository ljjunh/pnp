import { User } from "@/types/user";
import { useCallback, useEffect, useState } from "react";
import {
  getCookie,
  hasCookie,
} from 'cookies-next';

export function useSession() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    setAuthenticated(() => hasCookie('access_token'))
  }, [])

  useEffect(() => {
    if (authenticated) {
      refetch();
    }
  }, [authenticated])

  // TODO: 1. 인증이 끝난 사용자들 refresh 요청 보내기
  // TODO: 2. 만약, 인증 실패 시 signIn 으로 redirect
  // TODO: 3. 전역 상태 관리 정한 이후에 거기에 현재 상태 저장.
  const refetch = useCallback(async () => {
    const request = await fetch("http://localhost:8080/api/users/me", {
      headers: {
        Authorization: `Bearer ${getCookie('access_token')}`
      }
    })
    const response = await request.json();
    setUser(() => response.data)
  }, [user])

  return {authenticated, user, refetch}
}