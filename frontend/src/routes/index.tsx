import { getLiveParkData } from '@/api/parks';
import ParkPreview from '@/components/ParkPreview';
import { useTimezone } from '@/hooks/useTimezone';
import type { EntityLiveDataResponse } from '@/types/parks-api';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/')({
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: ['liveData'],
      queryFn: () => getLiveParkData(),
    });
  },
  // errorComponent: PostErrorComponent,
  component: App,
});

function App() {
  const { liveData, timezone }: EntityLiveDataResponse = Route.useLoaderData();
  const { setTimezone } = useTimezone();

  useEffect(() => {
    setTimezone(timezone);
  }, [setTimezone, timezone]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Wait times at Walt Disney World Resort &reg;</h1>
      <p className="mt-4 mb-6">Select a park below for live updates on ride wait times!</p>
      <div className="grid md:grid-cols-2 gap-4 justify-stretch">
        {liveData.length > 0 && liveData.map((park) => <ParkPreview key={park.id} park={park} />)}
        {liveData.length === 0 && <p className="text-center p-10 text-lg">No park data available.</p>}
      </div>
    </div>
  );
}
