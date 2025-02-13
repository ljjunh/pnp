import { getRecentView } from '@/apis/wishlists/queries';
import { RecentlyViewedClient } from './RecentlyViewedClient';

export default async function RecentlyViewed() {
  const recentViews = await getRecentView();
  
  return <RecentlyViewedClient recentViews={recentViews}/>
}
