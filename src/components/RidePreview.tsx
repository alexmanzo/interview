import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { EntityLiveData } from '@/types/parks-api';
import { useMemo } from 'react';
import { Badge } from './ui/badge';
import spacetime from 'spacetime';

export default function RidePreview({ entity }: { entity: EntityLiveData }) {
  const waitTime = entity.queue?.STANDBY?.waitTime ?? '-';

  const updatedTimeAgo = useMemo(() => {
    const lastUpdated = spacetime(entity.lastUpdated);
    const now = spacetime.now();
    const diff = lastUpdated.diff(now);
    if (diff.hours > 0) return `${diff.hours}h ago`;
    if (diff.minutes > 0) return `${diff.minutes}m ago`;
    return 'Just now';
  }, [entity.lastUpdated]);
  ``;
  const defaultWaitClasses = cn(['bg-gray-100', 'text-gray-800']);
  const longWaitClasses = cn(['bg-red-100', 'text-red-800']);
  const mediumWaitClasses = cn(['bg-yellow-100', 'text-yellow-800']);
  const shortWaitClasses = cn(['bg-green-100', 'text-green-800']);
  const waitTimeClasses = useMemo(() => {
    if (waitTime === '-') return defaultWaitClasses;
    return waitTime > 60 ? longWaitClasses : waitTime > 30 ? mediumWaitClasses : shortWaitClasses;
  }, [waitTime]);

  return (
    <Card>
      <CardContent className="flex justify-between gap-3">
        <div className="inline-flex w-20 h-20">
          <span className={cn(waitTimeClasses, 'rounded-full w-full h-full flex flex-col justify-center items-center')}>
            <span className="text-3xl font-medium">{waitTime}</span>
            <span>min</span>
          </span>
        </div>
        <div className="flex flex-col gap-3 justify-center">
          <CardTitle className="self-center text-right">{entity.name}</CardTitle>
          <Badge variant="secondary" className="ml-auto">
            {updatedTimeAgo}
          </Badge>
        </div>
      </CardContent>

    </Card>
  );
}
