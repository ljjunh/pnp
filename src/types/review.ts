import { Host, Review as PrismaReview, User } from '@prisma/client';

export type ReviewParams = {
  roomId: string;
  reviewId: string;
};

export type Review = Pick<
  PrismaReview,
  | 'id'
  | 'accuracy'
  | 'checkIn'
  | 'cleanliness'
  | 'communication'
  | 'location'
  | 'value'
  | 'content'
  | 'createdAt'
> & {
  user: Pick<User, 'id' | 'image' | 'name'> & {
    host: Pick<Host, 'hostStartedAt' | 'isSuperHost'>;
  };
};
