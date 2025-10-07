import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { EntityLiveData } from '@/types/parks-api';
import { useMemo } from 'react';
import { Badge } from './ui/badge';

interface RidePreviewProps {
  ride: EntityLiveData & { waitTime: number | null; lastUpdatedMinutes: number };
}

export default function RidePreview({ ride }: RidePreviewProps) {
  const lastUpdated = useMemo(() => {
    if (ride.lastUpdatedMinutes === 0) return 'Just now';
    if (ride.lastUpdatedMinutes === 1) return '1 minute ago';
    if (ride.lastUpdatedMinutes < 60) return `${ride.lastUpdatedMinutes} minutes ago`;
    const hours = Math.floor(ride.lastUpdatedMinutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''}  ago`;
  }, [ride.lastUpdatedMinutes]);
  const defaultWaitClasses = cn(['bg-gray-100', 'text-gray-800']);
  const longWaitClasses = cn(['bg-red-100', 'text-red-800']);
  const mediumWaitClasses = cn(['bg-yellow-100', 'text-yellow-800']);
  const shortWaitClasses = cn(['bg-green-100', 'text-green-800']);
  const waitTimeClasses = useMemo(() => {
    if (!ride.waitTime) return defaultWaitClasses;
    return ride.waitTime > 60 ? longWaitClasses : ride.waitTime > 30 ? mediumWaitClasses : shortWaitClasses;
  }, [ride.waitTime]);

  return (
    <Card>
      <CardContent className="flex justify-between gap-3">
        <div className="inline-flex w-20 h-20">
          <span className={cn(waitTimeClasses, 'rounded-full w-full h-full flex flex-col justify-center items-center')}>
            <span className="text-3xl font-medium">{ride.waitTime || '-'}</span>
            <span>min</span>
          </span>
        </div>
        <div className="flex flex-col gap-3 justify-center">
          <CardTitle className="self-center text-right leading-tight">{ride.name}</CardTitle>
          <Badge variant="secondary" className="ml-auto">
            {lastUpdated}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
