import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export type WorkStatus = {
  id: number;
  userId: number;
  date: string; // ISO date (YYYY-MM-DD)
  status: 'remote' | 'office' | 'sick_leave' | 'vacation' | 'holiday';
};

export function useWorkStatus(userId?: number, range?: { start?: Date; end?: Date }) {
  const qc = useQueryClient();
  const { data } = useQuery<WorkStatus[]>({
    queryKey: ['work-status', userId, range?.start?.toISOString(), range?.end?.toISOString()],
    queryFn: async () => {
      const params: any = {};
      if (userId) params.userId = userId;
      if (range?.start) params.start = range.start.toISOString();
      if (range?.end) params.end = range.end.toISOString();
      const res = await api.get('/work-status', { params });
      return res.data;
    }
  });

  const createOrUpdate = useMutation({
    mutationFn: async (input: { id?: number; userId: number; date: string; status: WorkStatus['status'] }) => {
      if (input.id) {
        const res = await api.put(`/work-status/${input.id}`, input);
        return res.data as WorkStatus;
      }
      const res = await api.post('/work-status', input);
      return res.data as WorkStatus;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['work-status'] })
  });

  return { workStatus: data ?? [], saveStatus: createOrUpdate.mutateAsync };
}
