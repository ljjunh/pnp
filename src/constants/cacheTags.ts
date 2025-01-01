export const CACHE_TAGS = {
  ROOMS: {
    SCRAP: (roomId: number) => `rooms:${roomId}:detail`,
  },
  REVIEWS: {
    DETAIL: (roomId: number) => `rooms/${roomId}/review:detail`,
  },
} as const;
