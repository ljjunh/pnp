import { Review as PrismaReview, User } from '@prisma/client';

export type ReviewParams = {
  roomId: string;
  reviewId: string;
};

export type Review = Pick<PrismaReview, 'id' | 'rating' | 'content' | 'createdAt'> & {
  user: Pick<User, 'id' | 'image' | 'name'>;
};
