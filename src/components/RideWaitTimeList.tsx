import { useQuery } from '@tanstack/react-query';
import { getLiveData } from '@/api/parks';
import RidePreview from './RidePreview';
import type { EntityLiveData } from '@/types/parks-api';

export default function RideWaitTimeList({ liveData }: { liveData: Array<EntityLiveData> }) {
  const openRides = liveData.filter((ride) => ride.status === 'OPERATING' && !!ride.queue?.STANDBY?.waitTime) || [];

  return (
    <div className="flex flex-col gap-4">
      {openRides.length > 0 && openRides.map((item) => <RidePreview key={item.id} entity={item} />)}
    </div>
  );
}
