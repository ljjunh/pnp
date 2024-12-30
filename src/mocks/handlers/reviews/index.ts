import { createReviewHandler } from '@/mocks/handlers/reviews/createReview';
import { deleteReviewHandler } from '@/mocks/handlers/reviews/deleteReview';
import { getReviewsHandler } from '@/mocks/handlers/reviews/getReviews';
import { updateReviewHandler } from '@/mocks/handlers/reviews/updateReview';

export const reviewsHandlers = [
  getReviewsHandler,
  createReviewHandler,
  updateReviewHandler,
  deleteReviewHandler,
];
