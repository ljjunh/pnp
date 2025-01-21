export interface UserSchema {
  id: string;
  airbnbId?: string;
  name?: string;
  email?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoomSchema {
  id: number;
  airbnbId?: string;
  airbnbLink?: string;
  title: string;
  userId: number;
  description?: string;
  seoTitle: string;
  seoDescription: string;
  thumbnail?: string;
  location: string;
  price: number;
  latitude: number;
  longitude: number;
  capacity: number;
  bed: number;
  bedroom: number;
  bathroom: number;
  checkIn: string;
  checkOut: string;
  checkInType: string;
  propertyType: string;
  roomType: string;
  reviewsCount: number;
  reviewsAverage: number;
  status: RoomStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoomImageSchema {
  id: number;
  roomId: number;
  caption: string;
  orientation: Orientation;
  imageLink: string;
}

export interface RuleSchema {
  id: number;
  category: string;
  title: string;
  icon: string;
}

export interface AmenitySchema {
  id: number;
  category: string;
  title: string;
  subTitle: string | null;
  icon: string;
  available: boolean;
}

export interface ReviewSchema {
  id: number;
  roomId: number;
  orderNumber?: string;
  userId: string;
  airbnbId?: string;
  accuracy: number;
  checkIn: number;
  cleanliness: number;
  communication: number;
  location: number;
  value: number;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
  reservationId?: number;
}

export interface ProfileSchema {
  id: number;
  userId: string;
  isSuperHost: boolean;
  isVerified: boolean;
  hostStartedAt: Date;
  about?: string;
  school?: string;
  job?: string;
  address?: string;
  birth?: string;
  favoriteSong?: string;
  liked?: string;
  interested?: string;
  noTalented?: string;
  bookTitle?: string;
  hobby?: string;
  pet?: string;
  reviewsCount: number;
  reviewsAverage: number;
}

export interface LanguageSchema {
  id: number;
  content: string;
}

export interface TagSchema {
  id: number;
  content: string;
  createdAt: Date;
}

export interface ReservationSchema {
  id: number;
  userId: string;
  roomId: number;
  orderNumber: string;
  checkIn: Date;
  checkOut: Date;
  guestNumber: number;
  days: number;
  totalPrice: number;
  status: ReservationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentSchema {
  id: number;
  orderNumber: string;
  userId: string;
  orderName: string;
  transactionId: string;
  status: PaymentStatus;
  currency: string;
  method: string;
  amount: number;
  vat: number;
  paid: number;
  receiptUrl?: string;
  paidAt: Date;
  statusUpdatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

enum Orientation {
  PORTRAIT,
  LANDSCAPE,
}

enum RoomStatus {
  DRAFT,
  IN_PROGRESS,
  COMPLETED,
}

enum ReservationStatus {
  PENDING,
  PAYMENT,
  CONFIRMED,
  CANCELED,
  COMPLETED,
}

enum PaymentStatus {
  CANCELLED,
  FAILED,
  PAID,
  PARTIAL_CANCELLED,
  PAY_PENDING,
  READY,
  VIRTUAL_ACCOUNT_ISSUED,
}
