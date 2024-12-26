export const ROUTES = {
  HOME: '/',
  LOGIN: '/signin',
  USER: {
    MESSAGES: '/messages',
    TRIPS: '/trips',
    TRIPS_DETAIL: (id: number) => `/trips/${id}`,
    WISHLISTS: '/wishlists',
    WISHLIST_DETAIL: (id: number) => `/trips/${id}`,
    RECENTLY_VIEWED: 'recently-viewed',
  } as const,
  ROOMS: {
    DETAIL: (id: number) => `/rooms/${id}`,
    HOUSE_RULES: (id: number) => `/rooms/${id}/houserules`,
    CANCELLATION: (id: number) => `/rooms/${id}/cancellation`,
    SAFETY: (id: number) => `/rooms/${id}/safety`,
    REVIEWS: (id: number) => `/rooms/${id}/reviews`,
  } as const,
};
