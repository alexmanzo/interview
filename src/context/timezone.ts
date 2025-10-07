import { createContext } from 'react';

export const TimezoneContext = createContext(Intl.DateTimeFormat().resolvedOptions().timeZone);
