import { Review as PrismaReview, User } from '@prisma/client';

export interface ReviewParams {
  roomId: string;
}

type ReviewPick = Pick<PrismaReview, 'id' | 'rating' | 'content'> & {
  user: Pick<User, 'id' | 'username'>;
};

export type Review = Pick<PrismaReview, 'id' | 'rating' | 'content' | 'createdAt'> & {
  user: Pick<User, 'id' | 'image' | 'name'>;
};
