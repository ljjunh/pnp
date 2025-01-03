import { cookies } from 'next/headers';

// 쿠키에 저장된 redirectURL
export function getRedirectUrl(): string {
  const cookieStore = cookies();

  return cookieStore.get('prevPath')?.value || '/';
}