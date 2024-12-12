import { Amenity, Room as PrismaRoom, RoomImage, Rule, Tag } from '@prisma/client';

export interface RoomParams {
  roomId: number;
}

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
  amenities: Amenity[];
};
