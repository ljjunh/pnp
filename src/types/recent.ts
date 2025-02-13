import { RoomSchema } from '@/types/table';
import { ImageLink } from './room';

export type RecentViewResponse = Pick<
  RoomSchema,
  'id' | 'title' | 'description' | 'location' | 'price' | 'thumbnail'
> & { images: ImageLink[]; scraped: boolean };
