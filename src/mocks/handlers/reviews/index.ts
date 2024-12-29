import { createReviewHandler } from '@/mocks/handlers/reviews/createReview';
import { getReviewsHandler } from '@/mocks/handlers/reviews/getReviews';

export const reviewsHandlers = [getReviewsHandler, createReviewHandler];
