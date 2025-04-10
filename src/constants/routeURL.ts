export const ROUTES = {
  HOME: '/',
  LOGIN: '/signin',
  USER: {
    MESSAGES: '/messages',
    TRIPS: '/trips',
    TRIPS_DETAIL: (id: string) => `/trips/${id}`,
    WISHLISTS: '/wishlists',
    WISHLIST_DETAIL: (id: number) => `/wishlists/${id}`,
    RECENTLY_VIEWED: 'recently-viewed',
  } as const,
  ROOMS: {
    DETAIL: (id: number) => `/rooms/${id}`,
    HOUSE_RULES: (id: number) => `/rooms/${id}/houserules`,
    CANCELLATION: (id: number) => `/rooms/${id}/cancellation`,
    SAFETY: (id: number) => `/rooms/${id}/safety`,
    REVIEWS: (id: number) => `/rooms/${id}/reviews`,
  } as const,
  RESERVATION: (orderNumber: string) => `/reservation/${orderNumber}`,
  HOST: '/host',
  REGISTER_STEP: (roomId: string) => ({
    START: `/host/${roomId}`,
    FIRST_STEP: `/host/${roomId}/first-step`,
    STRUCTURE: `/host/${roomId}/structure`,
    PRIVACY: `/host/${roomId}/privacy`,
    LOCATION: `/host/${roomId}/location`,
    INFO: `/host/${roomId}/info`, // db 갈아 엎고 그 뒤에
    SECOND_STEP: `/host/${roomId}/second-step`,
    AMENITIES: `/host/${roomId}/amenities`, // 내일
    PHOTOS: `/host/${roomId}/photos`, // 나중에
    TITLE: `/host/${roomId}/title`,
    DESCRIPTION: `/host/${roomId}/description`,
    THIRD_STEP: `/host/${roomId}/third-step`,
    PRICE: `/host/${roomId}/price`,
    SAFETY: `/host/${roomId}/safety`, // 내일
    FINISH: `/host/${roomId}/finish`,
  }),
};
