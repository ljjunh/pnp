export const ROUTES = {
  HOME: '/',
  USER: {
    MESSAGES: '/messages',
    TRIPS: '/trips',
  },
  ROOMS: {
    DETAIL: (id: number) => `/rooms/${id}`,
  } as const,
};
