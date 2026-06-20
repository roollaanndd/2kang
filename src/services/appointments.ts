import { api } from './api';
import type { Appointment } from '../types';

export interface CreateAppointmentDto {
  patientName: string;
  phone: string;
  serviceId: string;
  doctorId: string;
  date: string;
  time: string;
  notes?: string;
}

export const appointmentsService = {
  list: (params?: { date?: string; status?: string; doctorId?: string }) => {
    const qs = new URLSearchParams(params as Record<string, string>).toString();
    return api.get<Appointment[]>(`/api/appointments${qs ? `?${qs}` : ''}`);
  },
  get: (id: string) => api.get<Appointment>(`/api/appointments/${id}`),
  create: (data: CreateAppointmentDto) => api.post<Appointment>('/api/appointments', data),
  update: (id: string, data: Partial<Appointment>) =>
    api.patch<Appointment>(`/api/appointments/${id}`, data),
  cancel: (id: string) => api.patch(`/api/appointments/${id}`, { status: 'cancelled' }),
  confirm: (id: string) => api.patch(`/api/appointments/${id}`, { status: 'confirmed' }),
  today: () => api.get<Appointment[]>('/api/appointments/today'),
};
