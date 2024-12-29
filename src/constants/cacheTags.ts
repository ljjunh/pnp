export const CACHE_TAGS = {
  REVIEWS: {
    DETAIL: (roomId: number) => `review:detail:${roomId}`,
  },
} as const;
