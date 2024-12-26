import { Host, Reservation as PrismaReservation, Room, User } from '@prisma/client';

export type ReservationParams = {
  orderNumber: string;
};

export type CreateReservationResponse = {
  reservationId: number;
  orderNumber: string;
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
  };
};

export type ReservationAvailable = {
  available: boolean;
  roomId: number;
  checkIn: Date;
  checkOut: Date;
};
