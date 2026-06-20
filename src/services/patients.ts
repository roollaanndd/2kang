import { api } from './api';

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  dob: string;
  gender: 'M' | 'F';
  medicalRecordNo: string;
  address?: string;
  lastVisit?: string;
  totalVisits: number;
  notes?: string;
  createdAt: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  date: string;
  service: string;
  doctor: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  nextVisit?: string;
}

export const patientsService = {
  list: (search?: string) =>
    api.get<Patient[]>(`/api/patients${search ? `?q=${encodeURIComponent(search)}` : ''}`),
  get: (id: string) => api.get<Patient>(`/api/patients/${id}`),
  create: (data: Omit<Patient, 'id' | 'medicalRecordNo' | 'totalVisits' | 'createdAt'>) =>
    api.post<Patient>('/api/patients', data),
  update: (id: string, data: Partial<Patient>) => api.patch<Patient>(`/api/patients/${id}`, data),
  getHistory: (id: string) => api.get<MedicalRecord[]>(`/api/patients/${id}/records`),
  addRecord: (id: string, record: Omit<MedicalRecord, 'id' | 'patientId'>) =>
    api.post<MedicalRecord>(`/api/patients/${id}/records`, record),
};
