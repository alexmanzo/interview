import { getLiveData } from '@/api/parks';
import RideWaitTimeList from '@/components/RideWaitTimeList';
import type { EntityLiveDataResponse } from '@/types/parks-api';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/parks/$parkId')({
  component: ParkLiveData,
});

function ParkLiveData() {
  const { parkId } = Route.useParams();
  const { data } = useQuery<EntityLiveDataResponse>({
    queryKey: ['liveData', parkId],
    queryFn: () => getLiveData(parkId),
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {data && (
        <>
          <h1 className="text-3xl font-bold mb-6">{data.name}</h1>
          <RideWaitTimeList liveData={data.liveData} timezone={data.timezone} />
        </>
      )}
    </div>
  );
}
