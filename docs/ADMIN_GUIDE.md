# OMDC Dental — Admin CMS Guide

## Overview

The Admin CMS is a full clinic management panel accessible at `/admin`. It is intended for clinic staff (receptionists, doctors, managers) to manage daily operations.

---

## Accessing the Admin Panel

### URL

```
http://localhost:5173/admin          (development)
https://omdcdental.com/admin         (production)
```

### Default Credentials

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `admin123` |

> **Important:** Change the default password immediately after first login in production. Go to Settings > Security > Change Password.

---

## Dashboard Overview

The dashboard (`/admin`) shows a real-time snapshot of today's clinic activity:

| Widget | Description |
|--------|-------------|
| Active Queue | Current number being served, waiting count |
| Today's Appointments | Count by status (scheduled, confirmed, done) |
| Patients Registered | New patients today vs. total |
| Revenue Estimate | Based on completed appointments |
| Queue Chart | Hourly patient volume bar chart |
| Doctor Status | Per-doctor appointment count |

---

## Queue Management

**Path:** `/admin/queue`

The Queue page is the primary operational screen for front-desk staff.

### Workflow

1. **Morning Setup** — The queue resets automatically at midnight. Staff can also manually reset via the "Reset Queue" button.
2. **Patient Arrives** — Patient checks in via kiosk (QR code / phone number / medical record number) or is checked in manually by staff.
3. **Call Next** — Click "Panggil Berikutnya" (or the Call Next button) to summon the next patient. Select the target doctor and room number.
4. **Mark Done** — After the patient is served, click "Selesai" next to their queue number to free up the slot and advance the queue.
5. **Skip / Move** — If a patient does not respond, use "Skip" to move them to the end of the queue.

### Queue Actions

| Action | Button | Description |
|--------|--------|-------------|
| Call Next | "Panggil Berikutnya" | Calls next waiting number |
| Mark Done | "Selesai" | Marks current number as complete |
| Skip | "Lewati" | Moves patient to end of queue |
| Manual Add | "Tambah Manual" | Add patient without kiosk check-in |
| Reset Queue | "Reset Antrian" | Resets queue (admin only) |

### Display Modes

- **Staff View** — Detailed list with patient names, services, wait times
- **Public Display** — Large-format view for wall-mounted screens (click "Mode Layar Besar")

---

## Appointment Management

**Path:** `/admin/appointments`

### Viewing Appointments

Use the filters at the top to narrow the list:

| Filter | Options |
|--------|---------|
| Date | Date picker (default: today) |
| Status | All / Scheduled / Confirmed / In Progress / Done / Cancelled |
| Doctor | Dropdown of all active doctors |

### Creating an Appointment

1. Click "Buat Janji Baru" (New Appointment).
2. Fill in the form:
   - Patient — search by name or medical record number
   - Doctor — select from active roster
   - Service — dropdown of 8 services
   - Date & Time — calendar + available slot picker
   - Payment Method — BPJS / Asuransi / Tunai / Kartu
   - Notes — optional clinical notes
3. Click "Simpan". The patient receives a confirmation (if phone/email is on record).

### Editing an Appointment

Click the pencil icon on any appointment row. Editable fields:

- Status (change through workflow: Scheduled → Confirmed → Done)
- Date / Time (reschedule)
- Notes

### Cancelling an Appointment

Click "Batalkan" on the appointment row. Provide a cancellation reason (optional). The slot is released for rebooking.

---

## Patient Records

**Path:** `/admin/patients`

### Search Patients

Use the search bar to find patients by:
- Full name (partial match)
- Phone number
- Medical record number (RM-YYYY-NNN)

### Patient Detail

Click any patient row to open the detail panel:

| Tab | Contents |
|-----|----------|
| Info | Personal data, contact, blood type, allergies |
| Riwayat Kunjungan | Full visit history with diagnosis & treatment |
| Janji Mendatang | Upcoming appointments |
| Resep | Prescription history |

### Registering a New Patient

1. Click "Pasien Baru".
2. Fill in the registration form (name, phone, DOB, address, KTP, blood type, allergies).
3. Click "Daftarkan". The system generates a medical record number automatically.

### Editing Patient Data

Click "Edit" within the patient detail panel. All personal fields are editable except the auto-generated medical record number.

---

## Reports & Analytics

**Path:** `/admin/reports`

### Available Reports

| Report | Description | Period Options |
|--------|-------------|----------------|
| Kunjungan Harian | Daily patient visit counts | Day / Week / Month |
| Antrian | Queue efficiency (avg wait, peak hours) | Day / Week |
| Pendapatan | Revenue by service and payment method | Day / Week / Month |
| Dokter | Appointment count and completion rate per doctor | Week / Month |
| Layanan | Service popularity ranking | Month / Quarter |
| Pasien Baru | New patient registration trend | Week / Month |

### Exporting Reports

Click "Export" on any report to download as:
- **CSV** — for spreadsheet analysis
- **PDF** — for printing or sharing

---

## Settings & API Connection

**Path:** `/admin/settings`

### General Settings

| Setting | Description |
|---------|-------------|
| Clinic Name | Display name (OMDC Dental) |
| Operating Hours | Configurable per day of week |
| Queue Prefix | Letter prefix for queue numbers (default: A) |
| Slot Duration | Appointment slot length in minutes (default: 30) |
| WhatsApp Number | Business WA number for notifications |

### API Connection

| Setting | Description |
|---------|-------------|
| API URL | Backend API base URL (`VITE_API_URL`) |
| Connection Status | Live indicator (green = connected, red = offline) |
| Test Connection | Button to test API reachability |

> **Note:** In development without a backend, the system uses mock data. The settings page will show "Mock Mode Active" when `VITE_API_URL` is empty.

### Security

| Setting | Description |
|---------|-------------|
| Change Password | Update admin password |
| Session Timeout | Auto-logout after inactivity (default: 30 min) |
| Activity Log | Audit trail of admin actions |

### Notification Templates

Configure the content of SMS/WhatsApp notifications sent to patients:
- Appointment confirmation
- Appointment reminder (24h before)
- Queue call notification
- Appointment cancellation

---

## Role Reference

| Role | Access |
|------|--------|
| Admin | Full access including settings and user management |
| Receptionist | Queue, Appointments, Patients (no Settings, no Reports) |
| Doctor | Own schedule and patient records only |

Role management is handled server-side. Contact your system administrator to change user roles.
