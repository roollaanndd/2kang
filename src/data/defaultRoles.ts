/* eslint-disable */
import { ALL_PERMISSIONS } from './permissions';

export interface Role {
  id: string;
  name: string;
  description: string;
  color: string;
  isSystem: boolean;
  permissions: string[];
  createdAt: string;
}

const ALL = ALL_PERMISSIONS;
const no = (...excluded: string[]) => ALL.filter(p => !excluded.includes(p));

export const DEFAULT_ROLES: Role[] = [
  {
    id: 'owner',
    name: 'Owner',
    description: 'Akses penuh ke seluruh sistem tanpa batasan apapun',
    color: '#7C3AED',
    isSystem: true,
    permissions: ALL,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'master_admin',
    name: 'Master Admin',
    description: 'Akses ke semua fungsi kecuali edit & approve keuangan (read-only finance)',
    color: '#1D4ED8',
    isSystem: true,
    permissions: no('finance.edit', 'finance.approve'),
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'finance_controller',
    name: 'Finance Controller',
    description: 'Kontrol penuh atas data dan transaksi keuangan',
    color: '#059669',
    isSystem: true,
    permissions: ['finance.view', 'finance.edit', 'finance.approve', 'reports.view', 'reports.export', 'settings.view'],
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'finance_approval',
    name: 'Finance Approvals',
    description: 'Hanya dapat melakukan approve atau reject transaksi keuangan',
    color: '#D97706',
    isSystem: true,
    permissions: ['finance.view', 'finance.approve', 'reports.view'],
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Kelola konten promosi, artikel, kampanye bisnis dan website',
    color: '#E91E8C',
    isSystem: true,
    permissions: [
      'promotions.view', 'promotions.create', 'promotions.edit', 'promotions.delete',
      'website.view', 'website.edit_hero', 'website.edit_articles', 'website.upload_media', 'website.publish',
      'reports.view', 'appointments.view', 'services.view',
    ],
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'it_team',
    name: 'IT Team',
    description: 'Akses ke log sistem, error tracking, dan pengaturan keamanan (sebagian besar read-only)',
    color: '#0F766E',
    isSystem: true,
    permissions: ['it.logs', 'it.errors', 'it.security', 'settings.view', 'reports.view', 'website.view', 'users.view', 'roles.view'],
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'website_developer',
    name: 'Website Developer',
    description: 'Akses penuh ke semua fungsi website dan manajemen konten',
    color: '#4F46E5',
    isSystem: true,
    permissions: [
      'website.view', 'website.edit_hero', 'website.edit_services', 'website.edit_about',
      'website.edit_articles', 'website.edit_appearance', 'website.upload_media', 'website.publish',
      'services.view', 'doctors.view', 'promotions.view', 'reports.view',
    ],
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'apps_manager',
    name: 'Apps Manager',
    description: 'Kelola mobile apps, booking, dan antrian pasien',
    color: '#0891B2',
    isSystem: true,
    permissions: [
      'apps.view', 'apps.manage',
      'appointments.view', 'appointments.create', 'appointments.edit', 'appointments.cancel',
      'queue.view', 'queue.manage',
      'patients.view', 'doctors.view', 'services.view',
    ],
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'ekiosk_manager',
    name: 'E-Kiosk Manager',
    description: 'Kelola e-kiosk terminal dan antrian klinik',
    color: '#9333EA',
    isSystem: true,
    permissions: [
      'ekiosk.view', 'ekiosk.manage',
      'queue.view', 'queue.manage',
      'appointments.view',
      'doctors.view', 'services.view',
    ],
    createdAt: '2024-01-01T00:00:00Z',
  },
];

export function loadRoles(): Role[] {
  try {
    const stored = localStorage.getItem('omdc_roles');
    if (stored) return JSON.parse(stored);
  } catch {}
  localStorage.setItem('omdc_roles', JSON.stringify(DEFAULT_ROLES));
  return DEFAULT_ROLES;
}

export function saveRoles(roles: Role[]): void {
  localStorage.setItem('omdc_roles', JSON.stringify(roles));
}
