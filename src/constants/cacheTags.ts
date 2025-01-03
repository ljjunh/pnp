export const CACHE_TAGS = {
  ROOMS: {
    SCRAP: (roomId: number) => `rooms:${roomId}:detail`,
  },
  REVIEWS: {
    DETAIL: (roomId: number) => `rooms/${roomId}/review:detail`,
    AVAILABLE: (roomId: number) => `rooms/${roomId}/review/available`,
  },
} as const;
