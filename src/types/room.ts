import { Amenity, Room as PrismaRoom, RoomImage, Rule, Tag } from '@prisma/client';
import { HostWithUser } from './user';

export type RoomParams = {
  roomId: string;
};

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
  | 'latitude'
  | 'longitude'
  | 'checkIn'
  | 'checkOut'
  | 'checkInType'
> & {
  roomTags: Pick<Tag, 'id' | 'content'>[];
  images: Pick<RoomImage, 'id' | 'imageLink' | 'orientation'>[];
  rules: Rule[];
  host: HostWithUser;
  amenities: Amenity[];
};
