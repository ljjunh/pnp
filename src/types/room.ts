import { Amenity, Room as PrismaRoom, RoomImage, Rule, Tag } from '@prisma/client';
import { Host } from './user';

export type RoomParams = {
  roomId: string;
};

export type Room = Pick<
  PrismaRoom,
  | 'id'
  | 'airbnbLink'
  | 'title'
  | 'hostId'
  | 'description'
  | 'seoTitle'
  | 'seoDescription'
  | 'thumbnail'
  | 'location'
  | 'price'
  | 'latitude'
  | 'longitude'
  | 'checkIn'
  | 'checkOut'
  | 'checkInType'
> & {
  roomTags: Pick<Tag, 'id' | 'content'>[];
  images: Pick<RoomImage, 'id' | 'imageLink' | 'orientation'>[];
  rules: Rule[];
  host: Host;
  amenities: Amenity[];
};

export type RoomWithReview = Room & {
  count: number;
  average: number;
};
