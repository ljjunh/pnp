import { createScrapHandler } from '@/mocks/handlers/rooms/createScrap';
import { getRoomHandler } from '@/mocks/handlers/rooms/getRoom';
import { getScrapHandler } from '@/mocks/handlers/rooms/getScrap';

export const roomHandlers = [getRoomHandler, getScrapHandler, createScrapHandler];
