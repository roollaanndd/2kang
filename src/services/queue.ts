import { api } from './api';

export interface QueueItem {
  id: string;
  number: string;
  patientName: string;
  service: string;
  doctor: string;
  room: string;
  status: 'waiting' | 'serving' | 'done' | 'skipped';
  calledAt?: string;
  arrivedAt: string;
}

export interface QueueStats {
  waiting: number;
  serving: number;
  done: number;
  currentNumber: string;
  avgWaitMinutes: number;
}

export const queueService = {
  getAll: () => api.get<QueueItem[]>('/api/queue'),
  getStats: () => api.get<QueueStats>('/api/queue/stats'),
  callNext: () => api.post('/api/queue/call-next', {}),
  callNumber: (number: string) => api.post(`/api/queue/${number}/call`, {}),
  skipNumber: (number: string) => api.post(`/api/queue/${number}/skip`, {}),
  markDone: (number: string) => api.post(`/api/queue/${number}/done`, {}),
  reset: () => api.post('/api/queue/reset', {}),
  addWalkIn: (data: { patientName: string; service: string; doctorId: string }) =>
    api.post<QueueItem>('/api/queue/walk-in', data),
};
