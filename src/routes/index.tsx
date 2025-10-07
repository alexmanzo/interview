import { createFileRoute } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RideWaitTimeList from '@/components/RideWaitTimeList'

export const Route = createFileRoute('/')({
  component: App,
});

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto px-4 py-8">
        <h1>The app</h1>
        <RideWaitTimeList />
      </div>
    </QueryClientProvider>
  );
}
