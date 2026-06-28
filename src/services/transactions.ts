import { api } from './api';

export interface Transaction {
  id: string;
  code: string;
  bookingCode: string;
  patientId: string;
  patientName: string;
  memberCode: string;
  serviceName?: string;
  doctorName?: string;
  date?: string;
  time?: string;
  queueNumber?: string;
  status: 'booked' | 'checked-in' | 'paid' | 'done' | 'cancelled';
  paid: boolean;
  amount?: number;
  paymentMethod?: string;
  source: 'app' | 'kiosk';
  branchId?: string;
  createdAt: string;
}

export interface CreateTransactionDto {
  patientName: string;
  patientId: string;
  serviceId?: string;
  serviceName?: string;
  doctorName?: string;
  date?: string;
  time?: string;
  amount?: number;
  source?: 'app' | 'kiosk';
  branchId?: string;
  appointmentId?: string;
}

export interface LookupResult {
  found: boolean;
  kind: 'transaction' | 'member' | 'booking' | 'unknown';
  transaction?: Transaction;
}

export const transactionsService = {
  create: (data: CreateTransactionDto) =>
    api.post<Transaction>('/transactions', data),

  lookup: (code: string) =>
    api.post<LookupResult>('/transactions/lookup', { code }),

  checkIn: (id: string, branchId: string) =>
    api.patch<Transaction>(`/transactions/${id}/check-in`, { branchId }),

  markPaid: (id: string, paymentMethod?: string, paymentReference?: string) =>
    api.patch<Transaction>(`/transactions/${id}/pay`, { paymentMethod, paymentReference }),

  byPatient: (patientId: string) =>
    api.get<Transaction[]>(`/transactions/patient/${patientId}`),

  byDate: (date: string, branchId?: string) =>
    api.get<Transaction[]>(`/transactions/by-date/${date}${branchId ? `?branchId=${branchId}` : ''}`),
};
