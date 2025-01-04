import { createScrapHandler } from '@/mocks/handlers/rooms/createScrap';
import { deleteScrapHandler } from '@/mocks/handlers/rooms/deleteScrap';
import { getRoomHandler } from '@/mocks/handlers/rooms/getRoom';
import { getRoomAvailableHandler } from '@/mocks/handlers/rooms/getRoomAvailable';
import { getScrapHandler } from '@/mocks/handlers/rooms/getScrap';

export const roomHandlers = [
  getRoomHandler,
  getScrapHandler,
  createScrapHandler,
  deleteScrapHandler,
  getRoomAvailableHandler,
];
