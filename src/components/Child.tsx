import { useQuery } from '@tanstack/react-query';
import { getLiveData } from '@/api/parks';

export default function Child() {
  const { data, isPending, error } = useQuery({
    queryKey: ['liveData'],
    queryFn: getLiveData,
  });

  return (
    <div>
      {isPending && <div>Loading...</div>}
      {data && data.liveData.map((item) => (
        <div key={item.id}>{item.name} {item.queue?.STANDBY?.waitTime}</div>
      ))}
    </div>
  );
}
