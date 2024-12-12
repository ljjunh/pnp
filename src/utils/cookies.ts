export const getAccessToken = () => {
  if (typeof window === 'undefined') return null;

  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find((cookie) => cookie.trim().startsWith('accessToken='));
  if (!tokenCookie) return null;

  return tokenCookie.split('=')[1];
};
