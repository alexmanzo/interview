import { createFileRoute } from '@tanstack/react-router';
import RideWaitTimeList from '@/components/RideWaitTimeList';

export const Route = createFileRoute('/')({
  component: App,
});


function App() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>The app</h1>
      {/* <RideWaitTimeList /> */}
    </div>
  );
}
