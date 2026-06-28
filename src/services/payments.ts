import { api } from './api';

export interface SnapToken {
  token: string;
  redirect_url: string;
}

export interface PaymentStatus {
  transactionId: string;
  paid: boolean;
  status: string;
  paymentMethod?: string;
  paymentReference?: string;
  amount?: number;
  paidAt?: string;
}

export const paymentsService = {
  createSnap: (transactionId: string) =>
    api.post<SnapToken>(`/payments/snap/${transactionId}`),

  getStatus: (transactionId: string) =>
    api.get<PaymentStatus>(`/payments/status/${transactionId}`),

  manualPayment: (transactionId: string, method: string, reference?: string) =>
    api.post(`/payments/manual/${transactionId}`, { method, reference }),
};
