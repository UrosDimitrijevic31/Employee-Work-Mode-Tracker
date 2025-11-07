import React from 'react';

type Props = {
  employee: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
};

export default function EmployeeCard({ employee }: Props) {
  return (
    <div className="border rounded p-3 flex justify-between items-center">
      <div>
        <p className="font-medium">{employee.name}</p>
        <p className="text-xs text-gray-500">{employee.email}</p>
      </div>
      <span className="text-xs uppercase bg-gray-100 px-2 py-1 rounded">
        {employee.role}
      </span>
    </div>
  );
}
