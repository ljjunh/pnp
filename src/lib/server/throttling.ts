import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const createRoomLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, '5m'),
});
