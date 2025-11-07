import React, { useState } from 'react';
import { useEmployees } from '@/hooks/useEmployees';
import EmployeeCard from '@/components/EmployeeCard';

export default function Employees() {
  const { employees, createEmployee } = useEmployees();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'employee' | 'manager'>('employee');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createEmployee({ name, email, password, role });
    setName('');
    setEmail('');
    setPassword('');
    setRole('employee');
  };

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_350px]">
      <div className="grid gap-3">
        {employees?.map((e) => (
          <EmployeeCard key={e.id} employee={e} />)
        )}
      </div>
      <form onSubmit={onSubmit} className="border rounded p-4 space-y-3">
        <h2 className="font-semibold">Add Employee</h2>
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full border px-3 py-2 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          className="w-full border px-3 py-2 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value as any)}
        >
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select>
        <button className="w-full bg-green-600 text-white py-2 rounded">Create</button>
      </form>
    </div>
  );
}
