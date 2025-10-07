import { getLiveParkData } from '@/api/parks';
import ParkPreview from '@/components/ParkPreview';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ANIMAL_KINGDOM_ENTITY_ID,
  EPCOT_ENTITY_ID,
  HOLLYWOOD_STUDIOS_ENTITY_ID,
  MAGIC_KINGDOM_ENTITY_ID,
} from '@/constants';
import type { EntityLiveDataResponse } from '@/types/parks-api';
import { createFileRoute, Link } from '@tanstack/react-router';

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
  const data: EntityLiveDataResponse = Route.useLoaderData();
  console.log(data);
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Wait times at Walt Disney World Resort &reg; </h1>
      <p className="mt-4 mb-6">Select a park below for live updates on ride wait times!</p>
      <div className="grid md:grid-cols-2 gap-4 justify-stretch">
        {data.liveData.map((park) => (
          <ParkPreview key={park.id} park={park} />
        ))}
      </div>
    </div>
  );
}
