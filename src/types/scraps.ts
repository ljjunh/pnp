import { RoomSchema } from '@/types/table';
import { ImageLink } from './room';

export type ScrapListResponse = Pick<
  RoomSchema,
  'id' | 'title' | 'description' | 'location' | 'price' | 'thumbnail'
> & { images: ImageLink[]; scraped: boolean };
