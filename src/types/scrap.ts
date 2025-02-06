import { RoomSchema } from '@/types/table';
import { ImageLink } from './room';

export type ScrapResponse = Pick<
  RoomSchema,
  'id' | 'title' | 'description' | 'location' | 'price' | 'thumbnail'
> & { images: ImageLink[]; scraped: boolean };
