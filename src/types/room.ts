import { AmenitySchema, RoomImageSchema, RoomSchema, RuleSchema, TagSchema } from '@/types/table';
import { HostWithUser } from './user';

export type RoomParams = {
  roomId: string;
};

export type RoomLocationParams = {
  location: string;
};

export type ImageLink = Pick<RoomImageSchema, 'id' | 'imageLink' | 'orientation'>;

export type Room = Pick<
  RoomSchema,
  | 'id'
  | 'airbnbLink'
  | 'title'
  | 'description'
  | 'seoTitle'
  | 'seoDescription'
  | 'thumbnail'
  | 'reviewsCount'
  | 'reviewsAverage'
  | 'location'
  | 'price'
  | 'capacity'
  | 'latitude'
  | 'longitude'
  | 'checkIn'
  | 'checkOut'
  | 'checkInType'
> & {
  tags: Pick<TagSchema, 'id' | 'content'>[];
  images: ImageLink[];
  rules: RuleSchema[];
  profile: HostWithUser;
  amenities: AmenitySchema[];
};

export type FilterRoom = Pick<
  RoomSchema,
  'id' | 'location' | 'price' | 'latitude' | 'longitude' | 'reviewsAverage'
> & {
  images: ImageLink[];
  scrapped: boolean;
};

export type PriceFilterRange = {
  min: number;
  max: number;
  distributions: {
    distance: string;
    count: number;
  }[];
};

export type CreateRoomResponse = {
  roomId: number;
};

export type FilterRoomResponse = {
  content: FilterRoom[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};

export type StoryFilterRoom = Omit<FilterRoom, 'latitude' | 'longitude'> & {
  latitude: number;
  longitude: number;
};

export type SortRoom = 'recent' | 'expensive' | 'cheap';
