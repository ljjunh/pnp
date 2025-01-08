import {
  Host,
  Reservation as PrismaReservation,
  Room,
  RoomImage,
  Rule,
  Tag,
  User,
} from '@prisma/client';

export type ReservationParams = {
  orderNumber: string;
};

export type CreateReservationResponse = {
  reservationId: number;
  orderNumber: string;
};

export type ReservationTrip = Pick<
  PrismaReservation,
  'id' | 'orderNumber' | 'status' | 'checkIn' | 'checkOut'
> & {
  room: Pick<Room, 'id' | 'title' | 'thumbnail' | 'location'> & {
    host: Pick<Host, 'id'> & {
      user: Pick<User, 'name' | 'image'>;
    };
  };
};

export type Reservation = Pick<
  PrismaReservation,
  | 'userId'
  | 'roomId'
  | 'checkIn'
  | 'checkOut'
  | 'guestNumber'
  | 'orderNumber'
  | 'totalPrice'
  | 'days'
> & {
  room: Pick<
    Room,
    | 'title'
    | 'thumbnail'
    | 'reviewsCount'
    | 'latitude'
    | 'longitude'
    | 'reviewsAverage'
    | 'propertyType'
    | 'price'
    | 'checkIn'
    | 'checkOut'
    | 'checkInType'
    | 'capacity'
  > & {
    host: Pick<Host, 'id' | 'isSuperHost' | 'isVerified'> & {
      user: Pick<User, 'id' | 'name' | 'image'>;
    };
    images: RoomImage[];
    rules: Rule[];
    roomTags: Pick<Tag, 'id' | 'content'>[];
  };
};

export type ReservationAvailable = {
  available: boolean;
  roomId: number;
  checkIn: Date;
  checkOut: Date;
};
