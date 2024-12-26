import { cookies } from 'next/headers';

export function getServerCookies(): string {
  const cookieStore = cookies();
  const allCookies = cookieStore.getAll();

  return allCookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');
}
