import { useState } from 'react';

export function useTimezone() {
  const [timezone, setTimezone] = useState<string | null>('America/New_York');
  return { timezone, setTimezone };
}
