import { useMemo, useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import { useWorkStatus } from '@/hooks/useWorkStatus';
import StatusSelector from './StatusSelector';
import type { Status } from './StatusSelector';

const locales = { 'en-US': enUS } as const;
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

export default function WorkStatusCalendar({ userId }: { userId: number }) {
  const [range, setRange] = useState<{ start?: Date; end?: Date }>({});
  const { workStatus, saveStatus } = useWorkStatus(userId, range);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Status>('office');
  const [saving, setSaving] = useState(false);

  const events = useMemo(
    () =>
      workStatus.map((w) => {
        const d = new Date(w.date);
        return {
          id: w.id,
          title: w.status.replace('_', ' '),
          start: d,
          end: d,
        };
      }),
    [workStatus]
  );

  return (
    <div className="border rounded p-4">
      <p className="text-sm text-gray-600 mb-2">Calendar for User #{userId}</p>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={(slot: { start: Date; end: Date; slots: Date[] }) => {
          const date = Array.isArray(slot.slots) ? slot.slots[0] : slot.start;
          setSelectedDate(date);
          // Pre-fill with existing status if present
          const key = format(date, 'yyyy-MM-dd');
          const existing = workStatus.find((w) => format(new Date(w.date), 'yyyy-MM-dd') === key);
          setSelectedStatus((existing?.status as Status) ?? 'office');
        }}
        onRangeChange={(r: Date[] | { start: Date; end: Date }) => {
          if (Array.isArray(r)) {
            setRange({ start: r[0], end: r[r.length - 1] });
          } else if (r?.start && r?.end) {
            setRange({ start: r.start, end: r.end });
          }
        }}
      />
      <div className="mt-3 text-xs text-gray-500">Click/drag to navigate weeks and months.</div>
      {selectedDate && (
        <div className="mt-4 border rounded p-3 flex items-center gap-3">
          <div className="text-sm">Set status for {format(selectedDate, 'yyyy-MM-dd')}:</div>
          <StatusSelector value={selectedStatus} onChange={setSelectedStatus} />
          <button
            className="bg-blue-600 text-white px-3 py-2 rounded disabled:opacity-50"
            disabled={saving}
            onClick={async () => {
              if (!selectedDate) return;
              setSaving(true);
              const key = format(selectedDate, 'yyyy-MM-dd');
              const existing = workStatus.find(
                (w) => format(new Date(w.date), 'yyyy-MM-dd') === key
              );
              try {
                await saveStatus({
                  id: existing?.id,
                  userId,
                  date: key,
                  status: selectedStatus,
                });
                setSelectedDate(null);
              } finally {
                setSaving(false);
              }
            }}
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button className="px-3 py-2" onClick={() => setSelectedDate(null)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
