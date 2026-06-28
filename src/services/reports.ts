import { api } from './api';

export interface DashboardData {
  totalPatients: number;
  todayAppointments: number;
  revenue: { total: number; transactionCount: number };
  queueStats: { total: number; waiting: number; serving: number; done: number };
  period: { from: string; to: string };
}

export interface AppointmentReportRow {
  date: string;
  status: string;
  count: string;
}

export interface RevenueReportRow {
  date: string;
  total: string;
  count: string;
  paymentMethod: string;
}

export interface ServicePopularityRow {
  serviceName: string;
  count: string;
  revenue: string;
}

export interface PatientGrowthRow {
  month: string;
  newPatients: string;
}

export const reportsService = {
  dashboard: (branchId?: string, from?: string, to?: string) => {
    const params = new URLSearchParams();
    if (branchId) params.set('branchId', branchId);
    if (from) params.set('from', from);
    if (to) params.set('to', to);
    const qs = params.toString();
    return api.get<DashboardData>(`/reports/dashboard${qs ? `?${qs}` : ''}`);
  },

  appointments: (from: string, to: string, branchId?: string) => {
    const params = new URLSearchParams({ from, to });
    if (branchId) params.set('branchId', branchId);
    return api.get<AppointmentReportRow[]>(`/reports/appointments?${params}`);
  },

  revenue: (from: string, to: string, branchId?: string) => {
    const params = new URLSearchParams({ from, to });
    if (branchId) params.set('branchId', branchId);
    return api.get<RevenueReportRow[]>(`/reports/revenue?${params}`);
  },

  servicePopularity: (from: string, to: string, branchId?: string) => {
    const params = new URLSearchParams({ from, to });
    if (branchId) params.set('branchId', branchId);
    return api.get<ServicePopularityRow[]>(`/reports/services?${params}`);
  },

  patientGrowth: (from: string, to: string) =>
    api.get<PatientGrowthRow[]>(`/reports/patients?from=${from}&to=${to}`),
};
