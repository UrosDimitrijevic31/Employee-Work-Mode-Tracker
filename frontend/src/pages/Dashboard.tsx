import { useAuth } from '@/context/AuthContext';
import WorkStatusCalendar from '@/components/WorkStatusCalendar';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Welcome, {user?.name}</h1>
      <p className="text-sm text-gray-500">Your work status calendar</p>
      {user?.id && <WorkStatusCalendar userId={user.id} />}
    </div>
  );
}
