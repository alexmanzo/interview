import { useQuery } from '@tanstack/react-query';
import { getLiveData } from '@/api/parks';
import RidePreview from './RidePreview';

export default function RideWaitTimeList() {
  const { data, isPending, error } = useQuery({
    queryKey: ['liveData'],
    queryFn: getLiveData,
  });

  const openRides = data?.liveData.filter(ride => ride.status === 'OPERATING' && !!ride.queue?.STANDBY?.waitTime) || [];

  return (
    <div className="max-w-lg mx-auto flex flex-col gap-4">
      {isPending && <div>Loading...</div>}
      {openRides.length > 0 && openRides.map((item) => (
        <RidePreview key={item.id} entity={item} />
      ))}
    </div>
  );
}
