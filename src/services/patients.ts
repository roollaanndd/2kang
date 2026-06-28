import { api } from './api';

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  dob?: string;
  gender?: 'M' | 'F';
  photo?: string;
  medicalRecordNo: string;
  memberCode: string;
  isActive: boolean;
  createdAt: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  phone?: string;
  dob?: string;
  gender?: 'M' | 'F';
  relationship: string;
  medicalRecordNo?: string;
  memberCode?: string;
}

export const patientsService = {
  list: (search?: string) =>
    api.get<Patient[]>(`/users${search ? `?search=${encodeURIComponent(search)}` : ''}`),

  get: (id: string) => api.get<Patient>(`/users/${id}`),

  me: () => api.get<Patient>('/users/me'),

  updateMe: (data: Partial<Patient>) => api.patch<Patient>('/users/me', data),

  getFamily: () => api.get<FamilyMember[]>('/users/me/family'),

  addFamily: (data: Omit<FamilyMember, 'id' | 'memberCode'>) =>
    api.post<FamilyMember>('/users/me/family', data),

  removeFamily: (memberId: string) =>
    api.delete(`/users/me/family/${memberId}`),
};
