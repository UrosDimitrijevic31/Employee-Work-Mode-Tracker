import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

type Employee = {
  id: number;
  name: string;
  email: string;
  role: 'employee' | 'manager';
};

type CreateEmployeeInput = {
  name: string;
  email: string;
  password: string;
  role: 'employee' | 'manager';
};

export function useEmployees() {
  const qc = useQueryClient();
  const { data: employees } = useQuery<Employee[]>({
    queryKey: ['employees'],
    queryFn: async () => {
      const res = await api.get('/employees');
      return res.data;
    }
  });

  const createMutation = useMutation({
    mutationFn: async (input: CreateEmployeeInput) => {
      const res = await api.post('/employees', input);
      return res.data as Employee;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['employees'] });
    }
  });

  return {
    employees,
    createEmployee: createMutation.mutateAsync
  };
}
