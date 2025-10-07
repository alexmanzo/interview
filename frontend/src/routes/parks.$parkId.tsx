import { getLiveData } from '@/api/parks';
import RideWaitTimeList from '@/components/RideWaitTimeList';
import type { EntityLiveDataResponse } from '@/types/parks-api';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/parks/$parkId')({
  loader: ({ context: { queryClient }, params: { parkId } }) => {
    return queryClient.ensureQueryData({
      queryKey: ['liveData', parkId],
      queryFn: () => getLiveData(parkId),
    });
  },
  component: ParkLiveData,
});

function ParkLiveData() {
  const data: EntityLiveDataResponse = Route.useLoaderData();
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{data.name}</h1>
      <RideWaitTimeList liveData={data.liveData} />
    </div>
  );
}
