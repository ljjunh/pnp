import { Amenity, Room as PrismaRoom, RoomImage, Rule, Tag } from '@prisma/client';
import { HostWithUser } from './user';

export type RoomParams = {
  roomId: string;
};

export type RoomLocationParams = {
  location: string;
};

export type ImageLink = Pick<RoomImage, 'id' | 'imageLink' | 'orientation'>;

export type Room = Pick<
  PrismaRoom,
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
  roomTags: Pick<Tag, 'id' | 'content'>[];
  images: ImageLink[];
  rules: Rule[];
  host: HostWithUser;
  amenities: Amenity[];
};

export type FilterRoom = Pick<
  PrismaRoom,
  'id' | 'location' | 'price' | 'latitude' | 'longitude' | 'reviewsAverage'
> & {
  images: ImageLink[];
  scrapped: boolean;
};

export type PriceFilterRange = {
  minPrice: number;
  maxPrice: number;
  distribution: {
    distance: string;
    count: number;
  }[];
};

export type CreateRoomResponse = {
  roomId: number;
};

export type FilterRoomResponse = {
  config: any;
  data: FilterRoom[];
  page: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};

export type StoryFilterRoom = Omit<FilterRoom, 'latitude' | 'longitude'> & {
  latitude: number;
  longitude: number;
};

export type SortRoom = 'recent' | 'expensive' | 'cheap';
