import { createScrapHandler } from '@/mocks/handlers/rooms/createScrap';
import { deleteScrapHandler } from '@/mocks/handlers/rooms/deleteScrap';
import { getFilterRoomHandler } from '@/mocks/handlers/rooms/getFilterRoom';
import { getFilterRoomCountHandler } from '@/mocks/handlers/rooms/getFilterRoomCount';
import { getRoomHandler } from '@/mocks/handlers/rooms/getRoom';
import { getRoomAvailableHandler } from '@/mocks/handlers/rooms/getRoomAvailable';
import { getScrapHandler } from '@/mocks/handlers/rooms/getScrap';
import { getFilterRoomPriceHandler } from './getFilterRoomPriceHandler';

export const roomHandlers = [
  getFilterRoomPriceHandler,
  getFilterRoomCountHandler,
  getRoomHandler,
  getFilterRoomHandler,
  getScrapHandler,
  createScrapHandler,
  deleteScrapHandler,
  getRoomAvailableHandler,
];
