export const CACHE_TAGS = {
  ROOMS: {
    DETAIL: (roomId: number) => `rooms/${roomId}:detail`,
    SCRAP: (roomId: number) => `rooms/${roomId}:scrap`,
    AVAILABLE: (roomId: number) => `rooms/${roomId}/available`,
  },
  REVIEWS: {
    DETAIL: (roomId: number) => `rooms/${roomId}/review:detail`,
    AVAILABLE: (roomId: number) => `rooms/${roomId}/review/available`,
  },
} as const;
