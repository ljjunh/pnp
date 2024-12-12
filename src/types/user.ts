import { Host as PrismaHost, User as PrismaUser } from '@prisma/client';

export interface UserParams {
  userId: string;
}

interface Tag {
  tag: {
    content: string;
  };
}

interface Host
  extends Pick<
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
  > {
  hostTags: Tag[];
}

export type User = Pick<PrismaUser, 'id' | 'email' | 'image' | 'name'> & {
  host: Host;
};
