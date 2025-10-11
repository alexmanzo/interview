import { getLiveData } from '@/api/parks';
import RideWaitTimeList from '@/components/RideWaitTimeList';
import { Button } from '@/components/ui/button';
import type { EntityLiveDataResponse } from '@/types/parks-api';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/parks/$parkId')({
  component: ParkLiveData,
});

function ParkLiveData() {
  const entityType = 'ATTRACTION';
  const { parkId } = Route.useParams();
  const { data, error } = useQuery<EntityLiveDataResponse>({
    queryKey: ['liveData', parkId, entityType],
    queryFn: () => getLiveData({ parkId, entityType }),
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      if (error.status === 404) return false;
      if (failureCount >= 3) return false;
      return true;
    }
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {error && (
        <div className="p-8 flex flex-col gap-4 items-center justify-center text-center">
          <h1 className="text-2xl">{error.status} - {error.message}</h1>
          <Button asChild><Link to="/">Return to home</Link></Button>
        </div>
      )}
      {data && (
        <>
          <h1 className="text-3xl font-bold mb-6">{data.name}</h1>
          <RideWaitTimeList liveData={data.liveData} timezone={data.timezone} />
        </>
      )}
    </div>
  );
}
