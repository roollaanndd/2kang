/* eslint-disable */
export interface PermissionModule {
  label: string;
  icon: string;
  permissions: Record<string, string>;
}

export const PERMISSION_MODULES: Record<string, PermissionModule> = {
  website: {
    label: 'Website & Konten',
    icon: '🌐',
    permissions: {
      'website.view': 'Lihat website',
      'website.edit_hero': 'Edit hero & landing page',
      'website.edit_services': 'Edit layanan klinik',
      'website.edit_about': 'Edit halaman tentang',
      'website.edit_articles': 'Kelola artikel & edukasi',
      'website.edit_appearance': 'Edit tampilan & tema',
      'website.upload_media': 'Upload foto & media',
      'website.publish': 'Publish perubahan ke live',
    },
  },
  appointments: {
    label: 'Janji Temu',
    icon: '📅',
    permissions: {
      'appointments.view': 'Lihat semua janji temu',
      'appointments.create': 'Buat janji temu baru',
      'appointments.edit': 'Edit janji temu',
      'appointments.cancel': 'Batalkan janji temu',
      'appointments.export': 'Export data janji temu',
    },
  },
  queue: {
    label: 'Antrian',
    icon: '🔢',
    permissions: {
      'queue.view': 'Lihat antrian',
      'queue.manage': 'Kelola antrian (panggil, skip, selesai)',
    },
  },
  patients: {
    label: 'Data Pasien',
    icon: '👥',
    permissions: {
      'patients.view': 'Lihat data pasien',
      'patients.create': 'Tambah pasien baru',
      'patients.edit': 'Edit data pasien',
      'patients.delete': 'Hapus data pasien',
      'patients.export': 'Export data pasien',
    },
  },
  doctors: {
    label: 'Dokter',
    icon: '🩺',
    permissions: {
      'doctors.view': 'Lihat data dokter',
      'doctors.create': 'Tambah dokter',
      'doctors.edit': 'Edit jadwal & info dokter',
      'doctors.delete': 'Hapus dokter',
    },
  },
  services: {
    label: 'Layanan',
    icon: '✨',
    permissions: {
      'services.view': 'Lihat daftar layanan',
      'services.create': 'Tambah layanan baru',
      'services.edit': 'Edit harga & info layanan',
      'services.delete': 'Hapus layanan',
    },
  },
  promotions: {
    label: 'Promo & Diskon',
    icon: '🏷️',
    permissions: {
      'promotions.view': 'Lihat promo',
      'promotions.create': 'Buat promo baru',
      'promotions.edit': 'Edit promo',
      'promotions.delete': 'Hapus promo',
    },
  },
  finance: {
    label: 'Keuangan',
    icon: '💰',
    permissions: {
      'finance.view': 'Lihat data keuangan (read-only)',
      'finance.edit': 'Edit transaksi & data keuangan',
      'finance.approve': 'Approve/reject transaksi',
    },
  },
  reports: {
    label: 'Laporan & Analitik',
    icon: '📊',
    permissions: {
      'reports.view': 'Lihat laporan & analitik',
      'reports.export': 'Export laporan (PDF/Excel)',
    },
  },
  users: {
    label: 'Manajemen User',
    icon: '👤',
    permissions: {
      'users.view': 'Lihat daftar pengguna',
      'users.create': 'Tambah pengguna baru',
      'users.edit': 'Edit profil & password user',
      'users.delete': 'Nonaktifkan / hapus user',
    },
  },
  roles: {
    label: 'Manajemen Roles',
    icon: '🔑',
    permissions: {
      'roles.view': 'Lihat daftar roles',
      'roles.create': 'Buat role baru',
      'roles.edit': 'Edit permission role',
      'roles.delete': 'Hapus role',
    },
  },
  it: {
    label: 'IT & Keamanan',
    icon: '🔒',
    permissions: {
      'it.logs': 'Lihat activity logs',
      'it.errors': 'Lihat error & debug logs',
      'it.security': 'Pengaturan keamanan sistem',
    },
  },
  ekiosk: {
    label: 'E-Kiosk',
    icon: '🖥️',
    permissions: {
      'ekiosk.view': 'Lihat status e-kiosk',
      'ekiosk.manage': 'Kelola konten e-kiosk',
    },
  },
  apps: {
    label: 'Mobile Apps',
    icon: '📱',
    permissions: {
      'apps.view': 'Lihat status mobile apps',
      'apps.manage': 'Kelola konten & notifikasi apps',
    },
  },
  settings: {
    label: 'Pengaturan Klinik',
    icon: '⚙️',
    permissions: {
      'settings.view': 'Lihat pengaturan',
      'settings.edit': 'Edit pengaturan klinik',
    },
  },
};

export const ALL_PERMISSIONS: string[] = Object.values(PERMISSION_MODULES).flatMap(m =>
  Object.keys(m.permissions)
);
