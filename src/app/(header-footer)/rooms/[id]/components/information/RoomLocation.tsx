import { Room } from '@/types/room';
import GoogleMapView from '@/components/common/Map/GoogleMapView';

interface RoomLocationProps {
  lat: Room['latitude'] | number;
  lng: Room['longitude'] | number;
  location: Room['location'];
}

export default function RoomLocation({ lat, lng, location }: RoomLocationProps) {
  return (
    <section className="border-b border-neutral-04 py-12">
      <h2 className="pb-6 text-2xl">위치</h2>
      <div className="shade-02 pb-6">{location}</div>
      <GoogleMapView
        lat={Number(lat)}
        lng={Number(lng)}
        height="480px"
        zoom={13}
      />
    </section>
  );
}
