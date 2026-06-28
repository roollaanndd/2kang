import { api } from './api';
import type { Appointment } from '../types';

export interface CreateAppointmentDto {
  serviceId: string;
  doctorId: string;
  date: string;
  time: string;
  branchId?: string;
  selectedTeeth?: number[];
  notes?: string;
  source?: 'app' | 'kiosk' | 'website' | 'admin' | 'walk-in';
}

export const appointmentsService = {
  list: (params?: { date?: string; status?: string; doctorId?: string; branchId?: string }) => {
    const qs = params ? new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v))
    ).toString() : '';
    return api.get<Appointment[]>(`/appointments${qs ? `?${qs}` : ''}`);
  },

  get: (id: string) => api.get<Appointment>(`/appointments/${id}`),

  create: (data: CreateAppointmentDto) => api.post<Appointment>('/appointments', data),

  updateStatus: (id: string, data: { status: string; room?: string; doctorNotes?: string }) =>
    api.patch<Appointment>(`/appointments/${id}/status`, data),

  cancel: (id: string) => api.patch<Appointment>(`/appointments/${id}/cancel`),

  today: (branchId?: string) =>
    api.get<Appointment[]>(`/appointments/today${branchId ? `?branchId=${branchId}` : ''}`),

  mine: () => api.get<Appointment[]>('/appointments/my'),

  checkAvailability: (doctorId: string, date: string) =>
    api.get<string[]>(`/appointments/availability/${doctorId}/${date}`),
};
