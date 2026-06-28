import { api } from './api';

export interface QueueStatus {
  currentNumber: string | null;
  waiting: { queueNumber: string; patientName: string; serviceName: string }[];
  totalWaiting: number;
  totalServed: number;
  totalToday: number;
  prefix: string;
}

export const queueService = {
  getStatus: (branchId: string) =>
    api.get<QueueStatus>(`/queue/${branchId}/status`),

  callNext: (branchId: string) =>
    api.post(`/queue/${branchId}/call-next`),

  markDone: (transactionId: string) =>
    api.post(`/queue/done/${transactionId}`),
};
