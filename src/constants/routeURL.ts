export const ROUTES = {
  HOME: '/',
  LOGIN: '/signin',
  USER: {
    MESSAGES: '/messages',
    TRIPS: '/trips',
  },
  ROOMS: {
    DETAIL: (id: string) => `/rooms/${id}`,
    HOUSE_RULES: (id: string) => `/rooms/${id}/houserules`,
    CANCELLATION: (id: string) => `/rooms/${id}/cancellation`,
    SAFETY: (id: string) => `/rooms/${id}/safety`,
  } as const,
};
