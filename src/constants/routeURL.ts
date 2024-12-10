export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  USER: {
    MESSAGES: '/messages',
    TRIPS: '/trips',
  },
  ROOMS: {
    DETAIL: (id: number) => `/rooms/${id}`,
  } as const,
};
