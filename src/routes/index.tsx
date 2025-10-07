import { createFileRoute } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ParkSearch from '@/components/ParkSearch';

export const Route = createFileRoute('/')({
  component: App,
});

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>The app</h1>
    </QueryClientProvider>
  );
}
