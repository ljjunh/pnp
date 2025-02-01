'use server';

import { cookies } from 'next/headers';

export async function getServerCookies() {
  const cookieStore = cookies();
  const allCookies = cookieStore.getAll();

  return allCookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');
}

export async function getToken() {
  const cookieStore = cookies();

  return {
    accessToken: cookieStore.get('accessToken')?.value,
    refreshToken: cookieStore.get('refreshToken')?.value,
  };
}
