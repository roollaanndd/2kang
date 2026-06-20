# OMDC Dental — API Integration Guide

## Overview

The service layer lives in `src/services/`. It exports identical function signatures regardless of whether mock or real data is used. Switching between modes requires only setting `VITE_API_URL` in `.env`.

```
VITE_API_URL set  →  src/services/api.ts   (real HTTP calls)
VITE_API_URL empty →  src/services/mock.ts  (in-memory mock)
```

---

## Base URL Configuration

```typescript
// src/services/api.ts
const BASE_URL = import.meta.env.VITE_API_URL; // e.g. https://api.omdcdental.com/v1
```

All requests are relative to `BASE_URL`. If `BASE_URL` is falsy, the mock service is loaded instead.

---

## Authentication

The API uses **Bearer token** authentication. Store the token in `localStorage` after login and attach it to every request:

```typescript
const token = localStorage.getItem('omdc_token');

fetch(`${BASE_URL}/api/appointments`, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
```

### Token Lifecycle

| Action | Description |
|--------|-------------|
| Login | `POST /api/auth/login` → returns `{ token, user }` |
| Logout | Remove token from `localStorage` |
| Refresh | `POST /api/auth/refresh` with current token |
| Expiry | 24 hours (configurable server-side) |

---

## API Endpoints

### Doctors

#### `GET /api/doctors`

List all doctors.

**Response**

```json
[
  {
    "id": "dr-001",
    "name": "drg. Siti Rahayu, Sp.KG",
    "specialty": "Konservasi Gigi",
    "photo": "https://cdn.omdcdental.com/photos/dr-001.jpg",
    "education": ["Universitas Indonesia", "Spesialis KG - UI"],
    "experience": 12,
    "rating": 4.9,
    "reviewCount": 238,
    "availableDays": ["Monday", "Tuesday", "Wednesday", "Friday"],
    "schedule": "08:00 - 17:00",
    "bio": "Spesialis konservasi gigi berpengalaman...",
    "services": ["Tambal Gigi", "Perawatan Saluran Akar"]
  }
]
```

---

#### `GET /api/doctors/:id/availability`

Get available time slots for a specific doctor on a given date.

**Query Parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date` | `YYYY-MM-DD` | Yes | Target date |

**Example**

```
GET /api/doctors/dr-001/availability?date=2025-07-15
```

**Response**

```json
{
  "doctorId": "dr-001",
  "date": "2025-07-15",
  "slots": [
    { "time": "08:00", "available": true },
    { "time": "08:30", "available": true },
    { "time": "09:00", "available": false },
    { "time": "09:30", "available": true }
  ]
}
```

---

### Appointments

#### `GET /api/appointments`

List appointments with optional filters.

**Query Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `date` | `YYYY-MM-DD` | Filter by appointment date |
| `status` | `scheduled \| confirmed \| in-progress \| done \| cancelled` | Filter by status |
| `doctorId` | `string` | Filter by doctor |
| `patientId` | `string` | Filter by patient |
| `page` | `number` | Page number (default: 1) |
| `limit` | `number` | Items per page (default: 20) |

**Response**

```json
{
  "data": [
    {
      "id": "apt-001",
      "patientId": "p-001",
      "patientName": "Budi Santoso",
      "doctorId": "dr-001",
      "doctorName": "drg. Siti Rahayu, Sp.KG",
      "service": "Tambal Gigi",
      "date": "2025-07-15",
      "time": "09:00",
      "status": "confirmed",
      "queueNumber": "A018",
      "notes": "",
      "createdAt": "2025-07-10T08:23:00Z"
    }
  ],
  "meta": {
    "total": 45,
    "page": 1,
    "limit": 20,
    "totalPages": 3
  }
}
```

---

#### `POST /api/appointments`

Create a new appointment.

**Request Body**

```json
{
  "patientId": "p-001",
  "doctorId": "dr-001",
  "service": "Tambal Gigi",
  "date": "2025-07-15",
  "time": "09:00",
  "paymentMethod": "bpjs",
  "notes": "Gigi geraham kiri sakit"
}
```

**Response** `201 Created`

```json
{
  "id": "apt-001",
  "queueNumber": "A018",
  "patientId": "p-001",
  "doctorId": "dr-001",
  "service": "Tambal Gigi",
  "date": "2025-07-15",
  "time": "09:00",
  "status": "scheduled",
  "paymentMethod": "bpjs",
  "notes": "Gigi geraham kiri sakit",
  "createdAt": "2025-07-10T08:23:00Z"
}
```

---

#### `PATCH /api/appointments/:id`

Update an appointment (status change, reschedule, cancel).

**Request Body** (all fields optional)

```json
{
  "status": "confirmed",
  "date": "2025-07-16",
  "time": "10:00",
  "notes": "Pasien minta reschedule"
}
```

**Response** `200 OK` — updated appointment object (same shape as POST response).

---

### Queue

#### `GET /api/queue`

Get live queue status for the current day.

**Response**

```json
{
  "currentNumber": "A017",
  "currentPatient": "Andi Wijaya",
  "currentDoctor": "drg. Siti Rahayu, Sp.KG",
  "currentRoom": "Ruang 1",
  "upcoming": [
    { "number": "A018", "patientName": "Budi Santoso", "service": "Tambal Gigi" },
    { "number": "A019", "patientName": "Citra Dewi", "service": "Scaling" }
  ],
  "waitingCount": 5,
  "avgWaitMinutes": 15,
  "updatedAt": "2025-07-15T09:32:00Z"
}
```

---

#### `GET /api/queue/stats`

Get queue statistics for the current day.

**Response**

```json
{
  "date": "2025-07-15",
  "totalIssued": 23,
  "totalDone": 6,
  "totalWaiting": 17,
  "avgServiceMinutes": 18,
  "peakHour": "09:00",
  "byDoctor": [
    { "doctorId": "dr-001", "doctorName": "drg. Siti Rahayu", "count": 8, "done": 3 }
  ]
}
```

---

#### `POST /api/queue/call-next`

Call the next queue number (admin action).

**Request Body**

```json
{
  "doctorId": "dr-001",
  "room": "Ruang 1"
}
```

**Response** `200 OK`

```json
{
  "calledNumber": "A018",
  "patientName": "Budi Santoso",
  "doctorId": "dr-001",
  "room": "Ruang 1",
  "calledAt": "2025-07-15T09:35:00Z"
}
```

---

#### `POST /api/queue/:number/done`

Mark a queue number as done (patient served).

**Example**

```
POST /api/queue/A018/done
```

**Response** `200 OK`

```json
{
  "number": "A018",
  "status": "done",
  "serviceStartedAt": "2025-07-15T09:35:00Z",
  "serviceDoneAt": "2025-07-15T09:52:00Z",
  "durationMinutes": 17
}
```

---

### Patients

#### `GET /api/patients`

List patients with optional search.

**Query Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `q` | `string` | Search by name, phone, or medical record number |
| `page` | `number` | Page number (default: 1) |
| `limit` | `number` | Items per page (default: 20) |

**Response**

```json
{
  "data": [
    {
      "id": "p-001",
      "medicalRecordNumber": "RM-2025-001",
      "name": "Budi Santoso",
      "phone": "08123456789",
      "email": "budi@example.com",
      "dateOfBirth": "1985-04-12",
      "gender": "male",
      "address": "Jl. Sudirman No. 10, Jakarta",
      "bloodType": "O",
      "allergies": ["Penisilin"],
      "registeredAt": "2025-01-15T10:00:00Z",
      "lastVisit": "2025-06-20"
    }
  ],
  "meta": { "total": 312, "page": 1, "limit": 20, "totalPages": 16 }
}
```

---

#### `GET /api/patients/:id`

Get a single patient's full details.

**Response** — single patient object (same shape as list item above).

---

#### `POST /api/patients`

Register a new patient.

**Request Body**

```json
{
  "name": "Citra Dewi",
  "phone": "08198765432",
  "email": "citra@example.com",
  "dateOfBirth": "1992-08-30",
  "gender": "female",
  "address": "Jl. Kebon Jeruk No. 5, Jakarta Barat",
  "bloodType": "A",
  "allergies": [],
  "ktpNumber": "3171234567890001"
}
```

**Response** `201 Created` — created patient object with generated `id` and `medicalRecordNumber`.

---

#### `GET /api/patients/:id/records`

Get a patient's medical record history.

**Response**

```json
{
  "patientId": "p-001",
  "records": [
    {
      "id": "rec-001",
      "date": "2025-06-20",
      "doctorId": "dr-001",
      "doctorName": "drg. Siti Rahayu, Sp.KG",
      "service": "Tambal Gigi",
      "diagnosis": "Karies pada gigi 36",
      "treatment": "Penambalan komposit",
      "prescription": "Amoxicillin 500mg 3x1, Paracetamol 500mg 3x1",
      "notes": "Kontrol 1 minggu",
      "nextVisit": "2025-06-27",
      "attachments": ["xray-36.jpg"]
    }
  ]
}
```

---

## Error Handling

All errors follow a consistent shape:

```json
{
  "error": {
    "code": "SLOT_NOT_AVAILABLE",
    "message": "The selected time slot is no longer available.",
    "details": {}
  }
}
```

### HTTP Status Codes

| Status | Meaning |
|--------|---------|
| `200` | Success |
| `201` | Created |
| `400` | Bad request (validation error) |
| `401` | Unauthorized (missing or expired token) |
| `403` | Forbidden (insufficient role) |
| `404` | Resource not found |
| `409` | Conflict (e.g. slot already booked) |
| `422` | Unprocessable entity |
| `500` | Internal server error |

### Frontend Error Handling Pattern

```typescript
async function createAppointment(data: AppointmentInput) {
  try {
    const res = await fetch(`${BASE_URL}/api/appointments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message ?? 'Request failed');
    }

    return await res.json();
  } catch (e) {
    // Show toast / error UI
    console.error('createAppointment error:', e);
    throw e;
  }
}
```

---

## Mock Data Mode

When `VITE_API_URL` is empty, `src/services/mock.ts` is loaded. All functions return `Promise`-wrapped data with a small artificial delay (200–400ms) to simulate network latency.

```typescript
// src/services/index.ts  (conceptual)
const services = import.meta.env.VITE_API_URL
  ? await import('./api')
  : await import('./mock');

export const { getDoctors, getAvailability, createAppointment, ... } = services;
```

Mock data is defined in `src/data/mockData.ts` and covers:
- 6 sample doctors with schedules
- 8 dental services
- 3 active promotions
- Time slots (08:00–17:00, 30-min intervals)
- 10 sample patients
- 5 sample appointments

---

## WebSocket — Real-Time Queue

For live queue display on the Kiosk (`/kiosk`) and Admin queue page (`/admin/queue`), the server may push updates via WebSocket.

### Connection

```typescript
const ws = new WebSocket(`${BASE_URL.replace('http', 'ws')}/ws/queue`);

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  // msg.type: 'QUEUE_UPDATE' | 'NUMBER_CALLED' | 'NUMBER_DONE'
  handleQueueEvent(msg);
};
```

### Event Types

| Event | Payload | Description |
|-------|---------|-------------|
| `QUEUE_UPDATE` | Full queue object | Broadcast on any change |
| `NUMBER_CALLED` | `{ number, patientName, room }` | A number was called |
| `NUMBER_DONE` | `{ number }` | A number was marked done |
| `PING` | `{}` | Keepalive from server |

### Fallback Polling

If WebSocket is unavailable, poll `GET /api/queue` every 5 seconds:

```typescript
const pollInterval = setInterval(async () => {
  const queue = await getQueue();
  setQueueState(queue);
}, 5000);
```
