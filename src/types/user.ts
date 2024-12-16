import { Host as PrismaHost, Tag as PrismaTag, User as PrismaUser } from '@prisma/client';

export interface UserParams {
  userId: string;
}

export type Tag = Pick<PrismaTag, 'content'>;
export type User = Pick<PrismaUser, 'id' | 'email' | 'image' | 'name'>;
export type Host = Pick<
  PrismaHost,
  'id' | 'isSuperHost' | 'isVerified' | 'hostStartedAt' | 'reviewsAverage' | 'reviewsCount'
> & {
  hostTags: Tag[];
};

export type HostWithUser = Host & {
  user: User;
};

export type UserWithHost = User & {
  host: Pick<
    PrismaHost,
    | 'isSuperHost'
    | 'isVerified'
    | 'hostStartedAt'
    | 'about'
    | 'school'
    | 'job'
    | 'address'
    | 'language'
    | 'birth'
    | 'favoriteSong'
    | 'liked'
    | 'interested'
    | 'noTalented'
    | 'bookTitle'
    | 'hobby'
    | 'pet'
  > & {
    hostTags: Tag[];
  };
};
