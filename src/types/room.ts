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
  | 'description'
  | 'seoTitle'
  | 'seoDescription'
  | 'thumbnail'
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
  images: Pick<RoomImage, 'id' | 'imageLink' | 'orientation'>[];
  rules: Rule[];
  host: Host;
  amenities: Amenity[];
};

export type RoomWithReview = Room & {
  count: number;
  average: number;
};

export function isRoomWithReview(room: unknown): room is RoomWithReview {
  const r = room as Partial<RoomWithReview>;

  return typeof r.count === 'number' && typeof r.average === 'number' && typeof r.id === 'number';
}
