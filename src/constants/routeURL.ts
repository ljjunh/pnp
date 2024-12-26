export const ROUTES = {
  HOME: '/',
  LOGIN: '/signin',
  USER: {
    MESSAGES: '/messages',
    TRIPS: '/trips',
  },
  ROOMS: {
    DETAIL: (id: number) => `/rooms/${id}`,
    HOUSE_RULES: (id: number) => `/rooms/${id}/houserules`,
    CANCELLATION: (id: number) => `/rooms/${id}/cancellation`,
    SAFETY: (id: number) => `/rooms/${id}/safety`,
    REVIEWS: (id: number) => `/rooms/${id}/reviews`,
  } as const,
  RESERVATION: (orderNumber: string) => `/reservation/${orderNumber}`,
};
