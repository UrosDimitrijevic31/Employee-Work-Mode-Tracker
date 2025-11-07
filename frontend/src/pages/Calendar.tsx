import React from 'react';
import WorkStatusCalendar from '@/components/WorkStatusCalendar';
import { useAuth } from '@/context/AuthContext';

export default function CalendarPage() {
  const { user } = useAuth();
  if (user?.role !== 'manager') {
    return <div className="text-sm text-gray-500">Only managers can view the calendar overview.</div>;
  }
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Team Calendar</h1>
      {/* For demo, render manager's calendar. You can extend to multi-user calendar or filters. */}
      <WorkStatusCalendar userId={user.id} />
    </div>
  );
}
