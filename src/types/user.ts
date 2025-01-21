import { ProfileSchema, TagSchema, UserSchema } from '@/types/table';

export interface UserParams {
  userId: string;
}

export type Tag = Pick<TagSchema, 'content'>;
export type User = Pick<UserSchema, 'id' | 'email' | 'image' | 'name'>;
export type Host = Pick<
  ProfileSchema,
  'id' | 'isSuperHost' | 'isVerified' | 'hostStartedAt' | 'reviewsAverage' | 'reviewsCount'
> & {
  tags: Tag[];
};

export type HostWithUser = Host & {
  user: User;
};

export type UserWithHost = User & {
  host: Pick<
    ProfileSchema,
    | 'isSuperHost'
    | 'isVerified'
    | 'hostStartedAt'
    | 'about'
    | 'school'
    | 'job'
    | 'address'
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
