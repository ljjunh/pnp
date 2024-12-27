'use server';

import { cookies } from 'next/headers';

export async function getServerCookies() {
  const cookieStore = cookies();
  const allCookies = cookieStore.getAll();

  return allCookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');
}
