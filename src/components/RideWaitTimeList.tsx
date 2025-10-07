import RidePreview from './RidePreview';
import type { EntityLiveData } from '@/types/parks-api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useMemo, useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import { Button } from './ui/button';
import spacetime from 'spacetime';
import { Input } from '@/components/ui/input';
import { useTimezone } from '@/hooks/useTimezone';

type SortCategory = 'waitTime' | 'name' | 'lastUpdatedMinutes';

export default function RideWaitTimeList({ liveData }: { liveData: Array<EntityLiveData> }) {
  const { timezone } = useTimezone();
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState<{ direction: 'asc' | 'desc'; category: SortCategory }>({
    direction: 'asc',
    category: 'lastUpdatedMinutes',
  });

  const rideData = useMemo(() => {
    const mappedData = liveData.map((ride) => {
      const waitTime = ride.queue?.STANDBY?.waitTime || null;
      const lastUpdated = spacetime(ride.lastUpdated);
      const now = spacetime.now(timezone || 'America/New_York');
      const diff = lastUpdated.diff(now);
      let lastUpdatedMinutes = 0;
      if (diff.hours > 0) lastUpdatedMinutes = diff.hours * 60;
      if (diff.minutes > 0) lastUpdatedMinutes += diff.minutes;
      return { ...ride, waitTime, lastUpdatedMinutes };
    });
    const openRides = mappedData.filter((ride) => ride.status === 'OPERATING') || [];

    return openRides;
  }, [liveData]);

  const sortedRides = useMemo(() => {
    return [...rideData].sort((a, b) => {
      let aValue: number | string = 0;
      let bValue: number | string = 0;
      switch (sort.category) {
        case 'waitTime':
          aValue = a.waitTime || 0;
          bValue = b.waitTime || 0;
          break;
        case 'name':
          aValue = a.name.trim().toLocaleLowerCase().replace(`"`, '');
          bValue = b.name.trim().toLocaleLowerCase().replace(`"`, '');
          break;
        case 'lastUpdatedMinutes':
          aValue = a.lastUpdatedMinutes;
          bValue = b.lastUpdatedMinutes;
          break;
        default:
          aValue = a.lastUpdatedMinutes;
          bValue = b.lastUpdatedMinutes;
          break;
      }
      if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [rideData, sort]);

  function onSortCategoryChange(value: SortCategory) {
    setSort({ ...sort, category: value });
  }

  return (
    <>
      <div className="flex gap-1.5 justify-between items-center mb-3">
        <Input
          type="text"
          placeholder="Search for a ride"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-2/3"
        />

        <Select value={sort.category} onValueChange={(onSortCategoryChange)} aria-label="Sort by">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="waitTime">Wait time</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="lastUpdatedMinutes">Last Updated</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="icon"
          aria-label={sort.direction === 'asc' ? 'Sort descending' : 'Sort ascending'}
          onClick={() => setSort({ ...sort, direction: sort.direction === 'asc' ? 'desc' : 'asc' })}
        >
          {sort.direction === 'asc' && <ArrowUpIcon />}
          {sort.direction === 'desc' && <ArrowDownIcon />}
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {sortedRides.length > 0 && sortedRides.map((item) => <RidePreview key={item.id} ride={item} />)}
        {sortedRides.length === 0 && <p className="text-center p-10 text-lg">No ride wait times available.</p>}
      </div>
    </>
  );
}
