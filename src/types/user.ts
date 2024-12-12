import { Host, User as PrismaUser } from '@prisma/client';

export interface UserParams {
  userId: string;
}

export type User = Pick<PrismaUser, 'id' | 'email' | 'image' | 'name'> & {
  host: Pick<Host, 'isSuperHost' | 'isVerified' | 'hostStartedAt' | 'about' | 'school' | 'job' | 'address' | 'language' | 'birth' | 'favoriteSong' | 'liked' | 'interested' | 'noTalented' | 'bookTitle' | 'hobby' | 'pet'> & {
    hostTags: {
      tag: {
        content: string;
      }
    }[];
  };
};

