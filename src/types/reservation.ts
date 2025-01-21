import {
  ProfileSchema,
  ReservationSchema,
  RoomImageSchema,
  RoomSchema,
  RuleSchema,
  TagSchema,
  UserSchema,
} from '@/types/table';

export type ReservationParams = {
  orderNumber: string;
};

export type CreateReservationResponse = {
  reservationId: number;
  orderNumber: string;
};

export type ReservationTrip = Pick<
  ReservationSchema,
  'id' | 'orderNumber' | 'status' | 'checkIn' | 'checkOut'
> & {
  room: Pick<RoomSchema, 'id' | 'title' | 'thumbnail' | 'location'> & {
    host: Pick<ProfileSchema, 'id'> & {
      user: Pick<UserSchema, 'name' | 'image'>;
    };
  };
};

export type Reservation = Pick<
  ReservationSchema,
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
    RoomSchema,
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
    host: Pick<ProfileSchema, 'id' | 'isSuperHost' | 'isVerified'> & {
      user: Pick<UserSchema, 'id' | 'name' | 'image'>;
    };
    images: RoomImageSchema[];
    rules: RuleSchema[];
    roomTags: Pick<TagSchema, 'id' | 'content'>[];
  };
};

export type ReservationAvailable = {
  available: boolean;
  roomId: number;
  checkIn: Date;
  checkOut: Date;
};
