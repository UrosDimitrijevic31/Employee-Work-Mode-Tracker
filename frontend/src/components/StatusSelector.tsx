import React from 'react';

export type Status = 'remote' | 'office' | 'sick_leave' | 'vacation' | 'holiday';

const statuses: { value: Status; label: string }[] = [
  { value: 'remote', label: 'Remote' },
  { value: 'office', label: 'Office' },
  { value: 'sick_leave', label: 'Sick Leave' },
  { value: 'vacation', label: 'Vacation' },
  { value: 'holiday', label: 'Holiday' },
];

export default function StatusSelector({
  value,
  onChange,
}: {
  value: Status;
  onChange: (v: Status) => void;
}) {
  return (
    <select
      className="border rounded px-3 py-2"
      value={value}
      onChange={(e) => onChange(e.target.value as Status)}
    >
      {statuses.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
  );
}
