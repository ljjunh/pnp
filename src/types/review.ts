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

export type ReviewSummarize = {
  reviews: Review[];
  count: number;
  accuracy: number;
  communication: number;
  cleanliness: number;
  location: number;
  checkIn: number;
  value: number;
};

export interface RatingValues {
  accuracy: number;
  cleanliness: number;
  checkIn: number;
  communication: number;
  location: number;
  value: number;
}

export type ReviewSortType = 'recent' | 'high' | 'low';
