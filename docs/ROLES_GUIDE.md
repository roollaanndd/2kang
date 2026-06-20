# OMDC Dental — Roles & Permissions Guide

Multi-role access control for the Admin CMS. All roles and permissions are stored in `localStorage` and managed via the Admin panel at `/admin/roles`.

---

## Default System Roles

| Role | ID | Description |
|---|---|---|
| Owner | `owner` | Akses penuh ke semua fungsi |
| Master Admin | `master_admin` | Semua fungsi kecuali edit/approve keuangan |
| Finance Controller | `finance_controller` | Manajemen keuangan penuh |
| Finance Approvals | `finance_approval` | Hanya approve/reject keuangan |
| Marketing | `marketing` | Promo, artikel, konten website |
| IT Team | `it_team` | Log keamanan & error (read-only) |
| Website Developer | `website_developer` | Semua fungsi website |
| Apps Manager | `apps_manager` | Manajemen aplikasi mobile |
| E-Kiosk Manager | `ekiosk_manager` | Manajemen sistem kiosk |

System roles (`isSystem: true`) cannot be deleted. Name is locked but permissions, description, and color can be edited.

---

## Permission Modules

### 🌐 Website & Konten (`website.*`)
| Permission | Deskripsi |
|---|---|
| `website.view` | Lihat website |
| `website.edit_hero` | Edit hero & landing page |
| `website.edit_services` | Edit layanan klinik |
| `website.edit_about` | Edit halaman tentang |
| `website.edit_articles` | Kelola artikel & edukasi |
| `website.edit_appearance` | Edit tampilan & tema |
| `website.upload_media` | Upload foto & media |
| `website.publish` | Publish perubahan ke live |

### 📅 Janji Temu (`appointments.*`)
| Permission | Deskripsi |
|---|---|
| `appointments.view` | Lihat jadwal janji |
| `appointments.create` | Buat janji baru |
| `appointments.edit` | Edit & reschedule |
| `appointments.cancel` | Batalkan janji |
| `appointments.confirm` | Konfirmasi janji |

### 🔢 Antrian (`queue.*`)
| Permission | Deskripsi |
|---|---|
| `queue.view` | Lihat antrian |
| `queue.manage` | Kelola antrian aktif |
| `queue.call` | Panggil pasien |

### 👥 Pasien (`patients.*`)
| Permission | Deskripsi |
|---|---|
| `patients.view` | Lihat daftar pasien |
| `patients.create` | Tambah pasien baru |
| `patients.edit` | Edit data pasien |
| `patients.delete` | Hapus data pasien |
| `patients.view_records` | Lihat rekam medis |

### 👨‍⚕️ Dokter (`doctors.*`)
| Permission | Deskripsi |
|---|---|
| `doctors.view` | Lihat daftar dokter |
| `doctors.create` | Tambah dokter baru |
| `doctors.edit` | Edit data dokter |
| `doctors.delete` | Hapus dokter |
| `doctors.manage_schedule` | Kelola jadwal dokter |

### ✂️ Layanan (`services.*`)
| Permission | Deskripsi |
|---|---|
| `services.view` | Lihat daftar layanan |
| `services.create` | Tambah layanan baru |
| `services.edit` | Edit layanan |
| `services.delete` | Hapus layanan |
| `services.set_price` | Ubah harga layanan |

### 🏷️ Promosi (`promotions.*`)
| Permission | Deskripsi |
|---|---|
| `promotions.view` | Lihat promosi |
| `promotions.create` | Buat promo baru |
| `promotions.edit` | Edit promosi |
| `promotions.delete` | Hapus promosi |
| `promotions.publish` | Publish promosi |

### 💰 Keuangan (`finance.*`)
| Permission | Deskripsi |
|---|---|
| `finance.view` | Lihat laporan keuangan |
| `finance.edit` | Edit & input transaksi |
| `finance.approve` | Approve/reject transaksi |
| `finance.export` | Export laporan keuangan |

### 📊 Laporan (`reports.*`)
| Permission | Deskripsi |
|---|---|
| `reports.view` | Lihat laporan & analitik |
| `reports.export` | Export laporan |

### 👤 Pengguna (`users.*`)
| Permission | Deskripsi |
|---|---|
| `users.view` | Lihat daftar pengguna |
| `users.create` | Tambah pengguna baru |
| `users.edit` | Edit data pengguna |
| `users.delete` | Hapus pengguna |
| `users.toggle_active` | Aktifkan/nonaktifkan pengguna |

### 🛡️ Peran & Akses (`roles.*`)
| Permission | Deskripsi |
|---|---|
| `roles.view` | Lihat peran & izin |
| `roles.create` | Buat peran baru |
| `roles.edit` | Edit peran & izin |
| `roles.delete` | Hapus peran kustom |

### 🔧 IT & Keamanan (`it.*`)
| Permission | Deskripsi |
|---|---|
| `it.view_logs` | Lihat log sistem & keamanan |
| `it.view_errors` | Lihat log error |
| `it.manage_integrations` | Kelola integrasi API |

### 📟 E-Kiosk (`ekiosk.*`)
| Permission | Deskripsi |
|---|---|
| `ekiosk.view` | Lihat status kiosk |
| `ekiosk.manage` | Kelola konten & pengaturan kiosk |
| `ekiosk.restart` | Restart / reset kiosk |

### 📱 Aplikasi Mobile (`apps.*`)
| Permission | Deskripsi |
|---|---|
| `apps.view` | Lihat status aplikasi mobile |
| `apps.manage` | Kelola konten & push notification |
| `apps.publish` | Deploy update aplikasi |

### ⚙️ Pengaturan (`settings.*`)
| Permission | Deskripsi |
|---|---|
| `settings.view` | Lihat pengaturan klinik |
| `settings.edit` | Edit pengaturan |
| `settings.security` | Kelola keamanan & password |

---

## Creating Custom Roles

1. Go to `/admin/roles`
2. Click **"Buat Peran Baru"**
3. Fill in:
   - **Nama Peran** — free text, any name
   - **Deskripsi** — optional description
   - **Warna** — color picker for UI identification
4. Go to the **Izin Akses** tab and select permissions per module
5. Save — the role is immediately available when creating/editing users

Custom roles (`isSystem: false`) can be fully edited and deleted.

---

## Permission Check Flow

```
User logs in
  → AuthContext.login() loads user from localStorage
  → currentRole is derived from user.roleId + roles list
  → hasPermission(perm) checks currentRole.permissions.includes(perm)
  → Admin sidebar items are filtered by hasPermission()
  → Individual admin page actions are gated per permission
```

---

## Default Role Permissions Matrix

| Permission Group | Owner | Master Admin | Finance Ctrl | Finance Approvals | Marketing | IT Team | Web Dev | Apps Mgr | Kiosk Mgr |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| website.* | ✅ | ✅ | — | — | Partial | — | ✅ | — | — |
| appointments.* | ✅ | ✅ | — | — | — | — | — | — | — |
| patients.* | ✅ | ✅ | — | — | — | — | — | — | — |
| doctors.* | ✅ | ✅ | — | — | — | — | — | — | — |
| services.* | ✅ | ✅ | — | — | — | — | — | — | — |
| promotions.* | ✅ | ✅ | — | — | ✅ | — | — | — | — |
| finance.view | ✅ | ✅ | ✅ | ✅ | — | — | — | — | — |
| finance.edit | ✅ | — | ✅ | — | — | — | — | — | — |
| finance.approve | ✅ | — | ✅ | ✅ | — | — | — | — | — |
| reports.* | ✅ | ✅ | ✅ | — | Partial | — | — | — | — |
| users.* | ✅ | ✅ | — | — | — | — | — | — | — |
| roles.* | ✅ | ✅ | — | — | — | — | — | — | — |
| it.* | ✅ | Partial | — | — | — | ✅ | — | — | — |
| ekiosk.* | ✅ | ✅ | — | — | — | — | — | — | ✅ |
| apps.* | ✅ | ✅ | — | — | — | — | — | ✅ | — |
| settings.* | ✅ | ✅ | — | — | — | — | Partial | — | — |

---

## Data Persistence

- Roles stored in `localStorage` key: `omdc_roles`
- Users stored in `localStorage` key: `omdc_admin_users`
- Current session: `omdc_current_user` + `omdc_admin_token`
- CMS content: `omdc_cms_content`

> **Production note:** Replace localStorage persistence with API calls in `src/data/defaultRoles.ts` (`loadRoles`/`saveRoles`) and `src/context/AuthContext.tsx` (`login`, `handleSaveUsers`).
