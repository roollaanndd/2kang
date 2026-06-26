# OMDC Dental — API Contract v1.0

> **Version:** 1.0.0
> **Date:** 2026-06-26
> **Base URL:** `https://api.omdcdental.com/v1`
> **Protocol:** HTTPS + REST (JSON)
> **Real-time:** WebSocket / Supabase Realtime for queue & notifications

---

## Table of Contents

1. [Overview](#1-overview)
2. [Authentication & Authorization](#2-authentication--authorization)
3. [Data Models](#3-data-models)
4. [API Endpoints](#4-api-endpoints)
5. [User Flows & Sequence Diagrams](#5-user-flows--sequence-diagrams)
6. [Data Flow Architecture](#6-data-flow-architecture)
7. [Real-time Events](#7-real-time-events)
8. [Error Handling](#8-error-handling)
9. [Rate Limiting & Throttling](#9-rate-limiting--throttling)
10. [Versioning & Deprecation](#10-versioning--deprecation)
11. [Appendix](#11-appendix)

---

## 1. Overview

### 1.1 System Architecture

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  Mobile App │  │   eKiosk    │  │   Website   │  │   Admin     │
│  (PWA)      │  │  (Terminal) │  │  (Public)   │  │  (CMS)      │
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                │                │                │
       └────────────────┼────────────────┼────────────────┘
                        │
                        ▼
              ┌───────────────────┐
              │   API Gateway     │
              │  (Rate Limit,     │
              │   Auth, Routing)  │
              └────────┬──────────┘
                       │
         ┌─────────────┼─────────────┐
         ▼             ▼             ▼
   ┌───────────┐ ┌───────────┐ ┌───────────┐
   │ Auth      │ │ Core      │ │ Real-time │
   │ Service   │ │ Service   │ │ Service   │
   └─────┬─────┘ └─────┬─────┘ └─────┬─────┘
         │             │             │
         └─────────────┼─────────────┘
                       ▼
              ┌───────────────────┐
              │   PostgreSQL      │
              │   (Supabase)      │
              └───────────────────┘
```

### 1.2 Platform Consumers

| Consumer | Auth Model | Primary Use |
|----------|-----------|-------------|
| **Mobile App** | Patient JWT (phone/email + PIN) | Booking, queue, medical records, loyalty |
| **eKiosk** | Device API key | Walk-in registration, check-in, payment |
| **Website** | Public (anonymous) + optional patient JWT | Service browse, online booking |
| **Admin** | Admin JWT (username + password) | Clinic management, CMS, reports |

### 1.3 Envelope Format

Every API response follows a standard envelope:

```typescript
// Success
{
  "success": true,
  "data": T,
  "message": "Optional success message"
}

// Error
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Human-readable error description",
  "details": {}  // optional validation details
}

// Paginated
{
  "success": true,
  "data": T[],
  "total": 150,
  "page": 1,
  "perPage": 20,
  "totalPages": 8
}
```

---

## 2. Authentication & Authorization

### 2.1 Patient Authentication (Mobile App / Website)

#### 2.1.1 Registration

```
POST /api/auth/register
```

**Request:**
```json
{
  "name": "Budi Santoso",
  "phone": "+6281234567890",
  "email": "budi@example.com",
  "dob": "1990-05-15",
  "gender": "M"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "userId": "usr_k8x2m9v4",
    "otpSentTo": "+6281234567890",
    "otpExpiresAt": "2026-06-26T10:05:00Z"
  }
}
```

#### 2.1.2 OTP Verification

```
POST /api/auth/verify-otp
```

**Request:**
```json
{
  "userId": "usr_k8x2m9v4",
  "otp": "483921"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "userId": "usr_k8x2m9v4",
    "verified": true,
    "requiresPin": true
  }
}
```

#### 2.1.3 Create PIN

```
POST /api/auth/create-pin
```

**Request:**
```json
{
  "userId": "usr_k8x2m9v4",
  "pin": "182736"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOi...",
    "refreshToken": "rft_a7b3c9...",
    "expiresAt": "2026-06-27T10:00:00Z",
    "user": {
      "id": "usr_k8x2m9v4",
      "name": "Budi Santoso",
      "phone": "+6281234567890",
      "email": "budi@example.com",
      "medicalRecordNo": "MR-2026-0042",
      "memberCode": "OMDC-M-K8X2",
      "dob": "1990-05-15",
      "gender": "M",
      "photo": null
    }
  }
}
```

#### 2.1.4 Login (PIN)

```
POST /api/auth/login
```

**Request:**
```json
{
  "phone": "+6281234567890",
  "pin": "182736"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOi...",
    "refreshToken": "rft_a7b3c9...",
    "expiresAt": "2026-06-27T10:00:00Z",
    "user": { ... }
  }
}
```

#### 2.1.5 Social Login

```
POST /api/auth/social
```

**Request:**
```json
{
  "provider": "google",
  "idToken": "eyJhbGciOi..."
}
```

#### 2.1.6 Forgot Password / Reset PIN

```
POST /api/auth/forgot-pin
```

**Request:**
```json
{
  "email": "budi@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "resetSentTo": "budi@example.com",
    "expiresAt": "2026-06-26T10:30:00Z"
  }
}
```

#### 2.1.7 Token Refresh

```
POST /api/auth/refresh
```

**Request:**
```json
{
  "refreshToken": "rft_a7b3c9..."
}
```

### 2.2 Admin Authentication

```
POST /api/admin/auth/login
```

**Request:**
```json
{
  "username": "admin",
  "password": "••••••••"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOi...",
    "expiresAt": "2026-06-27T10:00:00Z",
    "user": {
      "id": "adm_001",
      "name": "Super Admin",
      "username": "admin",
      "email": "admin@omdcdental.com",
      "avatar": "...",
      "roleId": "role_owner",
      "roleName": "Owner",
      "permissions": ["*"]
    }
  }
}
```

### 2.3 Kiosk Authentication

```
POST /api/kiosk/auth
```

**Request:**
```json
{
  "deviceId": "KIOSK-JKT-001",
  "apiKey": "ksk_live_xxxxxxxxxxxx",
  "branchId": "branch_jkt_central"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "deviceToken": "dvc_eyJhbGciOi...",
    "branchId": "branch_jkt_central",
    "branchName": "OMDC Jakarta Pusat",
    "settings": {
      "idleTimeoutSeconds": 30,
      "queuePrefix": "A",
      "bookingCodeCheckin": true,
      "kioskPayment": true
    }
  }
}
```

### 2.4 JWT Structure

```json
{
  "sub": "usr_k8x2m9v4",
  "type": "patient | admin | kiosk",
  "role": "owner | master_admin | patient | device",
  "permissions": ["appointments.view", "appointments.create"],
  "branchId": "branch_jkt_central",
  "iat": 1719388800,
  "exp": 1719475200
}
```

### 2.5 Permission Matrix

| Resource | Patient | Kiosk | Admin (varies by role) |
|----------|---------|-------|------------------------|
| Own profile | RW | - | - |
| Own appointments | CRUD | Create | CRUD (all patients) |
| Own medical records | R | - | CRUD |
| Queue | R (own) | RW (branch) | RW |
| Services | R | R | CRUD |
| Doctors | R | R | CRUD |
| Promotions | R | R | CRUD |
| CMS content | R | R | RW |
| Users & roles | - | - | CRUD (admin only) |
| Reports | - | - | R (role-gated) |
| Notifications | R (own) | - | Broadcast |

---

## 3. Data Models

### 3.1 Entity Relationship Diagram

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Patient    │     │   Doctor     │     │   Service    │
├──────────────┤     ├──────────────┤     ├──────────────┤
│ id           │     │ id           │     │ id           │
│ name         │     │ name         │     │ name         │
│ phone        │     │ specialty    │     │ nameEn       │
│ email        │     │ photo        │     │ description  │
│ dob          │     │ available    │     │ descriptionEn│
│ gender       │     │ rating       │     │ duration     │
│ medicalRecNo │     │ reviewCount  │     │ priceMin     │
│ memberCode   │     │ experience   │     │ priceMax     │
│ address      │     │ about        │     │ icon         │
│ photo        │     │ schedule[]   │     │ color        │
│ createdAt    │     │ branchId (FK)│     │ isVisible    │
│ totalVisits  │     └──────┬───────┘     └──────┬───────┘
└──────┬───────┘            │                    │
       │                    │                    │
       │         ┌──────────┴────────────────────┘
       │         │
       ▼         ▼
┌────────────────────────┐        ┌──────────────┐
│     Appointment        │        │   Queue      │
├────────────────────────┤        ├──────────────┤
│ id                     │        │ id           │
│ patientId (FK)         │◄──────►│ appointmentId│
│ patientName            │        │ number       │
│ serviceId (FK)         │        │ patientName  │
│ doctorId (FK)          │        │ service      │
│ branchId (FK)          │        │ doctor       │
│ date                   │        │ room         │
│ time                   │        │ status       │
│ status                 │        │ calledAt     │
│ notes                  │        │ arrivedAt    │
│ queueNumber            │        │ branchId (FK)│
│ paymentMethod          │        └──────────────┘
│ transactionCode        │
│ bookingCode            │        ┌──────────────┐
│ amount                 │        │ MedicalRecord│
│ source (app|kiosk|web) │        ├──────────────┤
│ createdAt              │        │ id           │
└────────────────────────┘        │ patientId(FK)│
                                  │ date         │
┌──────────────┐                  │ service      │
│ ClinicBranch │                  │ doctor       │
├──────────────┤                  │ diagnosis    │
│ id           │                  │ treatment    │
│ name         │                  │ notes        │
│ city         │                  │ selectedTeeth│
│ address      │                  │ nextVisit    │
│ phone        │                  └──────────────┘
│ whatsapp     │
│ hours        │    ┌──────────────────────────────┐
│ image        │    │      OmdcTransaction         │
│ isActive     │    ├──────────────────────────────┤
└──────────────┘    │ key (PK)                     │
                    │ code (OMDC-T-xxxxx)           │
┌──────────────┐    │ bookingCode (6-char)          │
│  AdminUser   │    │ patientName                   │
├──────────────┤    │ memberCode (OMDC-M-xxxx)      │
│ id           │    │ memberKey                     │
│ name         │    │ medicalRecordNo               │
│ username     │    │ phone                         │
│ email        │    │ serviceId / serviceName        │
│ avatar       │    │ doctorName                    │
│ roleId (FK)  │    │ date / time                   │
│ isActive     │    │ queueNumber                   │
│ lastLogin    │    │ status (booked→checked-in→    │
│ createdAt    │    │         paid→done|cancelled)  │
└──────────────┘    │ paid (boolean)                │
                    │ amount (IDR)                  │
┌──────────────┐    │ source (app|kiosk)            │
│    Role      │    │ branchId                      │
├──────────────┤    │ ts (epoch ms)                 │
│ id           │    └──────────────────────────────┘
│ name         │
│ description  │    ┌──────────────┐
│ color        │    │ Notification │
│ isSystem     │    ├──────────────┤
│ permissions[]│    │ id           │
│ createdAt    │    │ userId       │
└──────────────┘    │ type         │
                    │ title        │
┌──────────────┐    │ body         │
│  Promotion   │    │ read         │
├──────────────┤    │ createdAt    │
│ id           │    └──────────────┘
│ title        │
│ description  │    ┌──────────────┐
│ discount     │    │ FamilyMember │
│ validUntil   │    ├──────────────┤
│ serviceId    │    │ id           │
│ image        │    │ patientId(FK)│
│ badge        │    │ name         │
│ color        │    │ relationship │
│ isVisible    │    │ dob          │
│ branchId(FK) │    │ phone        │
└──────────────┘    │ createdAt    │
                    └──────────────┘

┌──────────────┐    ┌──────────────┐
│ LoyaltyAcct  │    │ LoyaltyTxn   │
├──────────────┤    ├──────────────┤
│ id           │    │ id           │
│ patientId(FK)│    │ accountId(FK)│
│ points       │    │ type (earn/  │
│ tier (bronze/│    │  redeem)     │
│  silver/gold/│    │ points       │
│  platinum)   │    │ description  │
│ totalEarned  │    │ appointmentId│
│ createdAt    │    │ createdAt    │
└──────────────┘    └──────────────┘
```

### 3.2 Core Model Definitions

#### Patient
```typescript
interface Patient {
  id: string;                  // "usr_k8x2m9v4"
  name: string;                // "Budi Santoso"
  phone: string;               // "+6281234567890"
  email: string;               // "budi@example.com"
  dob: string;                 // "1990-05-15" (ISO date)
  gender: "M" | "F";
  medicalRecordNo: string;     // "MR-2026-0042" (auto-generated)
  memberCode: string;          // "OMDC-M-K8X2" (checksummed)
  address?: string;
  photo?: string;              // URL or null
  lastVisit?: string;          // ISO datetime
  totalVisits: number;
  notes?: string;
  createdAt: string;           // ISO datetime
}
```

#### Doctor
```typescript
interface Doctor {
  id: string;                  // "doc_001"
  name: string;                // "drg. Sarah Putri, Sp.Ort"
  specialty: string;           // "Spesialis Ortodonti"
  specialtyEn: string;         // "Orthodontics Specialist"
  photo: string;               // URL
  available: boolean;
  rating: number;              // 4.9
  reviewCount: number;         // 328
  experience: number;          // years
  about: string;
  schedule: string[];          // ["Senin", "Rabu", "Jumat"]
  branchId?: string;
}
```

#### Service
```typescript
interface Service {
  id: string;                  // "s1"
  name: string;                // "Pembersihan Karang Gigi"
  nameEn: string;              // "Dental Scaling"
  icon: string;                // icon key for DentalServiceIcon
  description: string;
  descriptionEn: string;
  duration: number;            // minutes
  priceMin: number;            // IDR — e.g., 150000
  priceMax: number;            // IDR — e.g., 350000
  color: string;               // hex color
  isVisible: boolean;
}
```

#### Appointment
```typescript
interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  serviceId: string;
  service: Service;
  doctorId: string;
  doctor: Doctor;
  branchId: string;
  date: string;                // "2026-06-28"
  time: string;                // "10:00"
  status: "booked" | "confirmed" | "checked-in" | "serving" |
          "done" | "cancelled" | "no-show";
  queueNumber?: string;        // "A018"
  paymentMethod?: PaymentMethod;
  transactionCode?: string;    // "OMDC-T-A18Q4Z"
  bookingCode?: string;        // "7H3K9Q"
  amount?: number;             // IDR
  notes?: string;
  source: "app" | "kiosk" | "web" | "admin";
  createdAt: string;
}

type PaymentMethod = "cash" | "card" | "ewallet" | "qris";
```

#### OmdcTransaction
```typescript
interface OmdcTransaction {
  key: string;                 // unique lookup key
  code: string;                // "OMDC-T-A18Q4Z" (checksummed)
  bookingCode: string;         // "7H3K9Q" (6-char, human-friendly)
  patientName: string;
  memberCode: string;          // "OMDC-M-K8X2"
  memberKey: string;
  medicalRecordNo?: string;
  phone?: string;
  serviceId?: string;
  serviceName?: string;
  doctorName?: string;
  date?: string;
  time?: string;
  queueNumber?: string;
  status: "booked" | "checked-in" | "paid" | "done" | "cancelled";
  paid: boolean;
  amount?: number;             // IDR
  source: "app" | "kiosk";
  branchId?: string;
  ts: number;                  // epoch ms
}
```

#### Queue
```typescript
interface QueueItem {
  id: string;
  number: string;              // "A018"
  patientName: string;
  service: string;
  doctor: string;
  room: string;                // "Ruang 1"
  status: "waiting" | "serving" | "done" | "skipped";
  calledAt?: string;           // ISO datetime
  arrivedAt: string;           // ISO datetime
  branchId: string;
}

interface QueueStats {
  waiting: number;
  serving: number;
  done: number;
  currentNumber: string;
  avgWaitMinutes: number;
}
```

#### Notification
```typescript
interface Notification {
  id: string;
  userId: string;
  type: "reminder" | "queue" | "promo" | "system";
  title: string;
  body: string;
  read: boolean;
  createdAt: string;           // ISO datetime
}
```

#### Family Member
```typescript
interface FamilyMember {
  id: string;
  patientId: string;           // owner patient
  name: string;
  relationship: "spouse" | "child" | "parent" | "sibling" | "other";
  dob: string;
  phone?: string;
  medicalRecordNo?: string;
  createdAt: string;
}
```

#### Loyalty
```typescript
interface LoyaltyAccount {
  id: string;
  patientId: string;
  points: number;
  tier: "bronze" | "silver" | "gold" | "platinum";
  totalEarned: number;
  tierProgress: number;        // 0-100 percentage to next tier
  createdAt: string;
}

interface LoyaltyTransaction {
  id: string;
  accountId: string;
  type: "earn" | "redeem";
  points: number;
  description: string;
  appointmentId?: string;
  createdAt: string;
}

interface LoyaltyReward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  category: "discount" | "service" | "merchandise";
  isAvailable: boolean;
  minTier: "bronze" | "silver" | "gold" | "platinum";
}
```

#### CMS Content
```typescript
interface CMSContent {
  _schemaVersion: number;      // current: 5
  hero: CMSHero;
  services: { sectionTitle: string; sectionSubtitle: string; items: CMSService[] };
  doctors: { sectionTitle: string; sectionSubtitle: string; items: CMSDoctor[] };
  clinic: CMSClinic;
  promotions: { sectionTitle: string; items: CMSPromo[] };
  articles: { sectionTitle: string; items: CMSArticle[] };
  about: CMSAbout;
  contact: CMSContact;
  appearance: CMSAppearance;
  trust: { sectionTitle: string; logos: TrustLogo[] };
  testimonials: { sectionTitle: string; items: CMSTestimonial[] };
  faq: { sectionTitle: string; items: CMSFaq[] };
  gallery: { sectionTitle: string; items: CMSBeforeAfter[] };
  kioskSettings: KioskSettings;
  branches: { items: ClinicBranch[] };
  logoUrl: string | null;
}

interface KioskSettings {
  idleTimeoutSeconds: number;  // default: 30
  queuePrefix: string;        // default: "A"
  bookingCodeCheckin: boolean; // default: true
  kioskPayment: boolean;       // default: true
}
```

#### Admin User & Role
```typescript
interface AdminUser {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  roleId: string;
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  color: string;               // hex
  isSystem: boolean;           // system roles cannot be deleted
  permissions: string[];       // e.g., ["appointments.view", "appointments.create"]
  createdAt: string;
}
```

### 3.3 OMDC Code System

Three code types with checksum validation:

| Code Type | Format | Example | Purpose |
|-----------|--------|---------|---------|
| Member | `OMDC-M-{4 chars}` | `OMDC-M-K8X2` | Permanent patient identity |
| Transaction | `OMDC-T-{6 chars}` | `OMDC-T-A18Q4Z` | Unique per booking/payment |
| Booking | `OMDC-B-{6 chars}` / bare `{6 chars}` | `OMDC-B-7H3K9Q` / `7H3K9Q` | Human-friendly code for kiosk check-in |

**Alphabet:** `0123456789ABCDEFGHJKLMNPQRSTUVWXYZ` (no `I` or `O` to prevent OCR/handwriting confusion)

**Validation:** Damm-style check character appended; `parseOmdcCode()` rejects mistyped codes.

---

## 4. API Endpoints

### 4.1 Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | Public | Register new patient |
| POST | `/api/auth/verify-otp` | Public | Verify phone OTP |
| POST | `/api/auth/resend-otp` | Public | Resend OTP (60s cooldown) |
| POST | `/api/auth/create-pin` | Public | Create 6-digit PIN |
| POST | `/api/auth/login` | Public | Login with phone + PIN |
| POST | `/api/auth/social` | Public | Google/Apple social login |
| POST | `/api/auth/forgot-pin` | Public | Request PIN reset email |
| POST | `/api/auth/reset-pin` | Public | Reset PIN via token |
| POST | `/api/auth/refresh` | Bearer | Refresh access token |
| POST | `/api/auth/logout` | Bearer | Invalidate tokens |
| POST | `/api/admin/auth/login` | Public | Admin login |
| POST | `/api/kiosk/auth` | API Key | Kiosk device auth |

### 4.2 Patients

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/patients` | Admin | List patients (search, paginate) |
| GET | `/api/patients/:id` | Admin/Self | Get patient details |
| POST | `/api/patients` | Admin | Create patient (walk-in) |
| PATCH | `/api/patients/:id` | Admin/Self | Update patient |
| GET | `/api/patients/:id/records` | Admin/Self | Get medical records |
| POST | `/api/patients/:id/records` | Admin | Add medical record |
| GET | `/api/patients/me` | Patient | Get own profile |
| PATCH | `/api/patients/me` | Patient | Update own profile |
| PUT | `/api/patients/me/photo` | Patient | Upload profile photo |

**Query Parameters for `GET /api/patients`:**
```
?q=budi              — Full-text search (name, phone, email, MRN)
?page=1&perPage=20   — Pagination
?sortBy=name&order=asc
```

### 4.3 Appointments

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/appointments` | Admin | List all appointments |
| GET | `/api/appointments/today` | Admin | Today's appointments |
| GET | `/api/appointments/:id` | Admin/Self | Get single appointment |
| POST | `/api/appointments` | Patient/Admin/Kiosk | Create appointment |
| PATCH | `/api/appointments/:id` | Admin | Update appointment |
| PATCH | `/api/appointments/:id/cancel` | Admin/Self | Cancel appointment |
| PATCH | `/api/appointments/:id/confirm` | Admin | Confirm appointment |
| PATCH | `/api/appointments/:id/check-in` | Admin/Kiosk | Check in patient |
| GET | `/api/appointments/me` | Patient | Own appointments |
| GET | `/api/appointments/me/upcoming` | Patient | Upcoming bookings |
| GET | `/api/appointments/me/history` | Patient | Past appointments |

**Query Parameters for `GET /api/appointments`:**
```
?date=2026-06-28             — Filter by date
?status=booked,confirmed     — Filter by status (comma-separated)
?doctorId=doc_001            — Filter by doctor
?branchId=branch_jkt_central — Filter by branch
?page=1&perPage=20
```

**Create Appointment — `POST /api/appointments`:**
```json
{
  "patientName": "Budi Santoso",
  "phone": "+6281234567890",
  "serviceId": "s1",
  "doctorId": "doc_001",
  "branchId": "branch_jkt_central",
  "date": "2026-06-28",
  "time": "10:00",
  "notes": "Gigi depan atas agak ngilu",
  "source": "app",
  "selectedTeeth": [11, 12]
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "apt_x9k2m4",
    "transactionCode": "OMDC-T-A18Q4Z",
    "bookingCode": "7H3K9Q",
    "queueNumber": null,
    "status": "booked",
    "...": "..."
  }
}
```

### 4.4 Queue Management

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/queue` | Admin/Kiosk | All queue items today |
| GET | `/api/queue/stats` | Admin/Kiosk | Queue statistics |
| POST | `/api/queue/call-next` | Admin | Call next waiting patient |
| POST | `/api/queue/:number/call` | Admin | Call specific number |
| POST | `/api/queue/:number/skip` | Admin | Skip patient |
| POST | `/api/queue/:number/done` | Admin | Mark as done |
| POST | `/api/queue/reset` | Admin | Reset daily queue |
| POST | `/api/queue/walk-in` | Admin/Kiosk | Register walk-in |
| GET | `/api/queue/display` | Public | Queue display (for TV/monitor) |
| GET | `/api/queue/my-position` | Patient | Own queue position |

**Walk-in — `POST /api/queue/walk-in`:**
```json
{
  "patientName": "Walk-in Patient",
  "service": "Pembersihan Karang Gigi",
  "doctorId": "doc_002",
  "branchId": "branch_jkt_central"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "q_4k8x",
    "number": "A019",
    "status": "waiting",
    "estimatedWaitMinutes": 25,
    "positionInQueue": 3,
    "transactionCode": "OMDC-T-B92M3X",
    "bookingCode": "K4M9X2"
  }
}
```

### 4.5 Doctors

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/doctors` | Public | List all doctors |
| GET | `/api/doctors/:id` | Public | Get doctor detail |
| PUT | `/api/doctors/:id` | Admin | Update doctor |
| GET | `/api/doctors/:id/availability` | Public | Get available slots |
| PUT | `/api/doctors/:id/schedule` | Admin | Set weekly schedule |
| GET | `/api/doctors/:id/reviews` | Public | Get patient reviews |

**Availability — `GET /api/doctors/:id/availability?date=2026-06-28`:**
```json
{
  "success": true,
  "data": {
    "doctorId": "doc_001",
    "date": "2026-06-28",
    "slots": [
      { "time": "08:00", "booked": false },
      { "time": "09:00", "booked": true },
      { "time": "10:00", "booked": false },
      { "time": "11:00", "booked": false },
      { "time": "13:00", "booked": false },
      { "time": "14:00", "booked": true },
      { "time": "15:00", "booked": false },
      { "time": "16:00", "booked": false }
    ]
  }
}
```

### 4.6 Services

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/services` | Public | List all services |
| GET | `/api/services/:id` | Public | Get service detail |
| POST | `/api/services` | Admin | Create service |
| PUT | `/api/services/:id` | Admin | Update service |
| DELETE | `/api/services/:id` | Admin | Delete service |

### 4.7 Branches

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/branches` | Public | List all clinic branches |
| GET | `/api/branches/:id` | Public | Get branch detail |
| POST | `/api/branches` | Admin | Create branch |
| PUT | `/api/branches/:id` | Admin | Update branch |
| DELETE | `/api/branches/:id` | Admin | Deactivate branch |

### 4.8 OMDC Code Lookup

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/omdc/lookup?code=7H3K9Q` | Admin/Kiosk | Lookup any OMDC code |
| POST | `/api/omdc/check-in` | Admin/Kiosk | Check in by code |
| POST | `/api/omdc/mark-paid` | Admin/Kiosk | Mark transaction paid |

**Lookup — `GET /api/omdc/lookup?code=7H3K9Q`:**
```json
{
  "success": true,
  "data": {
    "found": true,
    "kind": "booking",
    "transaction": {
      "key": "a18q4z",
      "code": "OMDC-T-A18Q4Z",
      "bookingCode": "7H3K9Q",
      "patientName": "Budi Santoso",
      "serviceName": "Pembersihan Karang Gigi",
      "doctorName": "drg. Sarah Putri",
      "date": "2026-06-28",
      "time": "10:00",
      "status": "booked",
      "paid": false,
      "amount": 250000
    }
  }
}
```

**Check-in — `POST /api/omdc/check-in`:**
```json
{
  "code": "7H3K9Q",
  "branchId": "branch_jkt_central"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "transactionCode": "OMDC-T-A18Q4Z",
    "queueNumber": "A019",
    "status": "checked-in",
    "estimatedWaitMinutes": 20
  }
}
```

### 4.9 Notifications

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/notifications` | Patient | List own notifications |
| PATCH | `/api/notifications/:id/read` | Patient | Mark as read |
| PATCH | `/api/notifications/read-all` | Patient | Mark all as read |
| DELETE | `/api/notifications/:id` | Patient | Dismiss notification |
| POST | `/api/notifications/push-token` | Patient | Register FCM/APNs token |
| POST | `/api/admin/broadcast` | Admin | Send broadcast notification |

**Broadcast — `POST /api/admin/broadcast`:**
```json
{
  "type": "promo",
  "title": "Diskon 30% Scaling!",
  "body": "Promo khusus member OMDC. Berlaku s/d 30 Juni 2026.",
  "targetAudience": "all",
  "scheduledAt": null
}
```

### 4.10 Family Members

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/patients/me/family` | Patient | List family members |
| POST | `/api/patients/me/family` | Patient | Add family member |
| PUT | `/api/patients/me/family/:id` | Patient | Update family member |
| DELETE | `/api/patients/me/family/:id` | Patient | Remove family member |

### 4.11 Loyalty Program

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/loyalty/me` | Patient | Get loyalty account |
| GET | `/api/loyalty/me/transactions` | Patient | Point history |
| GET | `/api/loyalty/rewards` | Patient | Available rewards |
| POST | `/api/loyalty/redeem` | Patient | Redeem reward |

### 4.12 Promotions

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/promotions` | Public | List active promos |
| GET | `/api/promotions/:id` | Public | Get promo detail |
| POST | `/api/promotions` | Admin | Create promo |
| PUT | `/api/promotions/:id` | Admin | Update promo |
| DELETE | `/api/promotions/:id` | Admin | Delete promo |

### 4.13 CMS Content

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/cms` | Public | Get full CMS content |
| GET | `/api/cms/:section` | Public | Get single section (hero, services, etc.) |
| PATCH | `/api/cms/:section` | Admin | Update CMS section |
| POST | `/api/cms/reset` | Admin (Owner) | Reset to defaults |
| POST | `/api/cms/media/upload` | Admin | Upload media file |

### 4.14 Admin Users & Roles

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/admin/users` | Admin | List admin users |
| POST | `/api/admin/users` | Admin | Create admin user |
| PUT | `/api/admin/users/:id` | Admin | Update admin user |
| DELETE | `/api/admin/users/:id` | Admin | Deactivate admin user |
| GET | `/api/admin/roles` | Admin | List roles |
| POST | `/api/admin/roles` | Admin | Create role |
| PUT | `/api/admin/roles/:id` | Admin | Update role |
| DELETE | `/api/admin/roles/:id` | Admin | Delete role (non-system) |

### 4.15 Reports & Analytics

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/reports/dashboard` | Admin | Dashboard summary stats |
| GET | `/api/reports/revenue` | Admin | Revenue report |
| GET | `/api/reports/appointments` | Admin | Appointment analytics |
| GET | `/api/reports/patients` | Admin | Patient analytics |
| GET | `/api/reports/doctors` | Admin | Doctor performance |
| GET | `/api/reports/export/:type` | Admin | Export CSV/PDF |

**Dashboard — `GET /api/reports/dashboard`:**
```json
{
  "success": true,
  "data": {
    "todayAppointments": 24,
    "currentQueue": 18,
    "avgWaitMinutes": 12,
    "revenueToday": 15750000,
    "revenueMonth": 487500000,
    "newPatients": 8,
    "topServices": [
      { "serviceId": "s1", "name": "Scaling", "count": 45 },
      { "serviceId": "s3", "name": "Tambal Gigi", "count": 32 }
    ],
    "queueStats": { "waiting": 5, "serving": 2, "done": 11 }
  }
}
```

### 4.16 Telemedicine

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/telemedicine/doctors` | Patient | List available tele-doctors |
| POST | `/api/telemedicine/sessions` | Patient | Start tele-session |
| GET | `/api/telemedicine/sessions/:id` | Patient | Get session details |
| POST | `/api/telemedicine/sessions/:id/messages` | Patient | Send chat message |
| GET | `/api/telemedicine/sessions/:id/messages` | Patient | Get chat history |
| POST | `/api/telemedicine/sessions/:id/video` | Patient | Request video call |
| PATCH | `/api/telemedicine/sessions/:id/end` | Patient/Doctor | End session |

### 4.17 Insurance

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/insurance/providers` | Public | List insurance providers |
| GET | `/api/insurance/me` | Patient | Get patient's insurance |
| POST | `/api/insurance/me` | Patient | Add insurance info |
| POST | `/api/insurance/verify` | Admin | Verify insurance claim |

### 4.18 Dental Tracker

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/dental-tracker/me` | Patient | Get dental health status |
| POST | `/api/dental-tracker/me/log` | Patient | Log brushing/flossing |
| GET | `/api/dental-tracker/me/odontogram` | Patient | Get tooth chart data |
| GET | `/api/dental-tracker/me/reminders` | Patient | Get care reminders |

---

## 5. User Flows & Sequence Diagrams

### 5.1 Patient Registration (Mobile App)

```
Patient              Mobile App           API Server           SMS Gateway
  │                     │                     │                     │
  ├──── Open app ──────►│                     │                     │
  │                     │                     │                     │
  │  ┌──────────────────┤                     │                     │
  │  │  Show Onboarding │                     │                     │
  │  │  (5 slides)      │                     │                     │
  │  └──────────────────┤                     │                     │
  │                     │                     │                     │
  ├──── Tap Register ──►│                     │                     │
  │                     │                     │                     │
  ├── Fill form ───────►│                     │                     │
  │  (name, phone,      │                     │                     │
  │   email, dob,       ├── POST /auth/       │                     │
  │   gender, T&C)      │   register ────────►│                     │
  │                     │                     ├── Send OTP ────────►│
  │                     │                     │                     │
  │                     │◄── 201 {userId,     │                     │
  │                     │    otpSentTo} ──────┤                     │
  │                     │                     │     ┌───────────────┤
  │  ┌──────────────────┤                     │     │ SMS: "483921" │
  │  │ Show OTP screen  │                     │     │  to +62812... │
  │  │ (6-box input,    │                     │     └───────────────┤
  │  │  60s countdown)  │                     │                     │
  │  └──────────────────┤                     │                     │
  │                     │                     │                     │
  ├── Enter OTP ───────►│                     │                     │
  │   "483921"          ├── POST /auth/       │                     │
  │                     │   verify-otp ──────►│                     │
  │                     │                     ├── Validate OTP     │
  │                     │◄── 200 {verified,   │                     │
  │                     │    requiresPin} ────┤                     │
  │                     │                     │                     │
  │  ┌──────────────────┤                     │                     │
  │  │ Show Create PIN  │                     │                     │
  │  │ (6-digit numpad) │                     │                     │
  │  └──────────────────┤                     │                     │
  │                     │                     │                     │
  ├── Enter PIN ───────►│                     │                     │
  │   "182736"          │                     │                     │
  ├── Confirm PIN ─────►│                     │                     │
  │   "182736"          ├── POST /auth/       │                     │
  │                     │   create-pin ──────►│                     │
  │                     │                     ├── Hash PIN         │
  │                     │                     ├── Create patient   │
  │                     │                     ├── Generate:        │
  │                     │                     │   - MR number      │
  │                     │                     │   - Member code    │
  │                     │                     │   - JWT token      │
  │                     │◄── 200 {token,      │                     │
  │                     │    user} ───────────┤                     │
  │                     │                     │                     │
  │  ┌──────────────────┤                     │                     │
  │  │ Store token      │                     │                     │
  │  │ Navigate → Home  │                     │                     │
  │  └──────────────────┤                     │                     │
  │                     │                     │                     │
```

### 5.2 Appointment Booking (Mobile App)

```
Patient              Mobile App           API Server           Notification
  │                     │                     │                     │
  ├── Tap service      ►│                     │                     │
  │   on Home grid      │                     │                     │
  │                     │                     │                     │
  │  ┌──────────────────┤                     │                     │
  │  │ Skip to          │                     │                     │
  │  │ Branch Select    │                     │                     │
  │  └──────────────────┤                     │                     │
  │                     │                     │                     │
  ├── Select branch ───►├── GET /branches ───►│                     │
  │                     │◄── 200 [branches] ──┤                     │
  │                     │                     │                     │
  │  ┌──────────────────┤                     │                     │
  │  │ Show Doctor      │                     │                     │
  │  │ Select screen    ├── GET /doctors? ───►│                     │
  │  │ (available/      │   branchId=x ───────┤                     │
  │  │  unavailable)    │◄── 200 [doctors] ───┤                     │
  │  └──────────────────┤                     │                     │
  │                     │                     │                     │
  ├── Select doctor ───►│                     │                     │
  │   "drg. Sarah"      │                     │                     │
  │                     │                     │                     │
  │  ┌──────────────────┤                     │                     │
  │  │ Show Schedule    ├── GET /doctors/     │                     │
  │  │ (calendar +      │   doc_001/          │                     │
  │  │  time slots)     │   availability? ───►│                     │
  │  │                  │   date=2026-06-28   │                     │
  │  │                  │◄── 200 {slots} ─────┤                     │
  │  └──────────────────┤                     │                     │
  │                     │                     │                     │
  ├── Pick date ───────►│                     │                     │
  │   "28 Jun 2026"     │                     │                     │
  ├── Pick time ───────►│                     │                     │
  │   "10:00"           │                     │                     │
  │                     │                     │                     │
  │  ┌──────────────────┤                     │                     │
  │  │ Show Confirm     │                     │                     │
  │  │ (summary +       │                     │                     │
  │  │  booking code    │                     │                     │
  │  │  + barcode)      │                     │                     │
  │  └──────────────────┤                     │                     │
  │                     │                     │                     │
  ├── Confirm ─────────►├── POST /            │                     │
  │                     │   appointments ────►│                     │
  │                     │                     ├── Create appt      │
  │                     │                     ├── Generate codes:  │
  │                     │                     │   OMDC-T-A18Q4Z    │
  │                     │                     │   booking: 7H3K9Q  │
  │                     │                     ├── Register txn     │
  │                     │◄── 201 {appt,       │                     │
  │                     │    bookingCode,     │                     │
  │                     │    transactionCode} ┤                     │
  │                     │                     │                     │
  │                     │                     ├── Push notif ──────►│
  │                     │                     │   "Booking          │
  │  ┌──────────────────┤                     │    confirmed!"      │
  │  │ Show barcode +   │                     │                     │
  │  │ booking code     │                     │                     │
  │  │ "7H3K9Q"         │                     │                     │
  │  │ (scan at kiosk)  │                     │                     │
  │  └──────────────────┤                     │                     │
  │                     │                     │                     │
```

### 5.3 Kiosk Walk-in Registration

```
Patient              eKiosk               API Server           Printer
  │                     │                     │                     │
  ├── Touch screen ────►│                     │                     │
  │                     │                     │                     │
  │  ┌──────────────────┤                     │                     │
  │  │ Welcome screen   │                     │                     │
  │  │ (from idle       │                     │                     │
  │  │  screensaver)    │                     │                     │
  │  └──────────────────┤                     │                     │
  │                     │                     │                     │
  ├── Select language ─►│                     │                     │
  │   "Bahasa Indonesia"│                     │                     │
  │                     │                     │                     │
  │  ┌──────────────────┤                     │                     │
  │  │ Main Menu:       │                     │                     │
  │  │ • Daftar Baru    │                     │                     │
  │  │ • Check-in       │                     │                     │
  │  │ • Info & Promo   │                     │                     │
  │  │ • Antrian        │                     │                     │
  │  └──────────────────┤                     │                     │
  │                     │                     │                     │
  ├── "Daftar Baru" ───►│                     │                     │
  │                     │                     │                     │
  │  ┌──────────────────┤                     │                     │
  │  │ Service Select   ├── GET /services ───►│                     │
  │  │ (grid with       │◄── 200 [services] ──┤                     │
  │  │  icons)          │                     │                     │
  │  └──────────────────┤                     │                     │
  │                     │                     │                     │
  ├── Select service ──►│                     │                     │
  │   "Scaling"         │                     │                     │
  │                     ├── GET /doctors? ───►│                     │
  │  ┌──────────────────┤   serviceId=s1      │                     │
  │  │ Doctor Select    │◄── 200 [doctors] ───┤                     │
  │  └──────────────────┤                     │                     │
  │                     │                     │                     │
  ├── Select doctor ───►│                     │                     │
  │                     ├── GET /doctors/     │                     │
  │  ┌──────────────────┤   availability ────►│                     │
  │  │ Date Select      │◄── 200 {slots} ─────┤                     │
  │  └──────────────────┤                     │                     │
  │                     │                     │                     │
  ├── Select date ─────►│                     │                     │
  ├── Select time ─────►│                     │                     │
  │                     │                     │                     │
  │  ┌──────────────────┤                     │                     │
  │  │ Confirmation     │                     │                     │
  │  │ (summary)        │                     │                     │
  │  └──────────────────┤                     │                     │
  │                     │                     │                     │
  ├── Confirm ─────────►├── POST /queue/      │                     │
  │                     │   walk-in ─────────►│                     │
  │                     │                     ├── Create appt      │
  │                     │                     ├── Assign queue     │
  │                     │                     │   "A019"            │
  │                     │                     ├── Generate codes   │
  │                     │◄── 201 {queue,      │                     │
  │                     │    bookingCode,     │                     │
  │                     │    txnCode} ────────┤                     │
  │                     │                     │                     │
  │  ┌──────────────────┤                     │                     │
  │  │ Payment screen   │                     │                     │
  │  │ (if kioskPayment │                     │                     │
  │  │  enabled)        │                     │                     │
  │  └──────────────────┤                     │                     │
  │                     │                     │                     │
  ├── Pay (QRIS/card) ─►├── POST /omdc/      │                     │
  │                     │   mark-paid ───────►│                     │
  │                     │◄── 200 {paid} ──────┤                     │
  │                     │                     │                     │
  │  ┌──────────────────┤                     │                     │
  │  │ Ticket screen    │                     │                     │
  │  │ Queue: A019      │                     │                     │
  │  │ Code: 7H3K9Q     ├── Print ticket ────►│                     │
  │  │ Barcode: [||||]  │   (optional)        │                     │
  │  └──────────────────┤                     │                     │
  │                     │                     │                     │
```

### 5.4 Kiosk Booking Code Check-in (App Patient → Kiosk)

```
Patient              eKiosk               API Server           Queue Display
  │                     │                     │                     │
  │  (has booking code  │                     │                     │
  │   "7H3K9Q" from    │                     │                     │
  │   mobile app)       │                     │                     │
  │                     │                     │                     │
  ├── Touch screen ────►│                     │                     │
  │                     │                     │                     │
  │  ┌──────────────────┤                     │                     │
  │  │ Welcome:         │                     │                     │
  │  │ "Punya kode      │                     │                     │
  │  │  booking?"       │                     │                     │
  │  │ [Ya] [Daftar     │                     │                     │
  │  │       Baru]      │                     │                     │
  │  └──────────────────┤                     │                     │
  │                     │                     │                     │
  ├── "Ya" ────────────►│                     │                     │
  │                     │                     │                     │
  │  ┌──────────────────┤                     │                     │
  │  │ OMDC Recall      │                     │                     │
  │  │ screen:          │                     │                     │
  │  │ [Scan Barcode]   │                     │                     │
  │  │ [Ketik Kode]     │                     │                     │
  │  └──────────────────┤                     │                     │
  │                     │                     │                     │
  ├── Type "7H3K9Q" ───►│                     │                     │
  │   (or scan barcode) │                     │                     │
  │                     ├── GET /omdc/        │                     │
  │                     │   lookup?code=      │                     │
  │                     │   7H3K9Q ──────────►│                     │
  │                     │                     ├── Parse code       │
  │                     │                     ├── Find transaction │
  │                     │                     ├── Validate status  │
  │                     │◄── 200 {found,      │                     │
  │                     │    transaction} ────┤                     │
  │                     │                     │                     │
  │  ┌──────────────────┤                     │                     │
  │  │ Show booking     │                     │                     │
  │  │ details:         │                     │                     │
  │  │ "Budi Santoso"   │                     │                     │
  │  │ "Scaling"        │                     │                     │
  │  │ "drg. Sarah"     │                     │                     │
  │  │ "10:00"          │                     │                     │
  │  │ [Check-in]       │                     │                     │
  │  └──────────────────┤                     │                     │
  │                     │                     │                     │
  ├── "Check-in" ──────►├── POST /omdc/      │                     │
  │                     │   check-in ────────►│                     │
  │                     │                     ├── Assign queue     │
  │                     │                     │   "A019"            │
  │                     │                     ├── Update status    │
  │                     │                     │   → "checked-in"   │
  │                     │◄── 200 {queue:      │                     │
  │                     │    "A019"} ─────────┤                     │
  │                     │                     │                     │
  │                     │                     ├── WS broadcast ───►│
  │                     │                     │   queue_updated     │
  │                     │                     │                     │
  │  ┌──────────────────┤ (if unpaid)         │                     │
  │  │ Payment or       │                     │                     │
  │  │ Ticket screen    │                     │                     │
  │  └──────────────────┤                     │                     │
  │                     │                     │                     │
```

### 5.5 Queue Management (Admin)

```
Receptionist         Admin Panel          API Server           Queue Display
  │                     │                     │                     │
  │  ┌──────────────────┤                     │                     │
  │  │ Queue Dashboard  ├── GET /queue ──────►│                     │
  │  │ (real-time)      │◄── 200 [items] ─────┤                     │
  │  │                  ├── GET /queue/       │                     │
  │  │ Waiting: 5       │   stats ───────────►│                     │
  │  │ Serving: 2       │◄── 200 {stats} ─────┤                     │
  │  │ Done: 11         │                     │                     │
  │  └──────────────────┤                     │                     │
  │                     │                     │                     │
  ├── "Call Next" ─────►├── POST /queue/      │                     │
  │                     │   call-next ───────►│                     │
  │                     │                     ├── Find oldest     │
  │                     │                     │   "waiting"        │
  │                     │                     ├── Update to       │
  │                     │                     │   "serving"        │
  │                     │◄── 200 {called:     │                     │
  │                     │    "A018"} ─────────┤                     │
  │                     │                     │                     │
  │                     │                     ├── WS broadcast ───►│
  │                     │                     │   "A018 to         │
  │                     │                     │    Ruang 1"         │
  │                     │                     │                     │
  │                     │                     ├── Push notif ──────►
  │                     │                     │   to patient        │ Patient
  │                     │                     │   "Your turn!       │ Mobile
  │                     │                     │    Queue A018"      │
  │                     │                     │                     │
  ├── "Mark Done" ─────►├── POST /queue/      │                     │
  │   (A018)            │   A018/done ───────►│                     │
  │                     │                     ├── Update status    │
  │                     │                     │   → "done"          │
  │                     │◄── 200 ─────────────┤                     │
  │                     │                     ├── WS broadcast ───►│
  │                     │                     │   queue_updated     │
  │                     │                     │                     │
```

### 5.6 Payment Flow

```
Patient/Kiosk        Payment Gateway      API Server           Notification
  │                     │                     │                     │
  ├── Select payment   │                     │                     │
  │   method ──────────►│                     │                     │
  │   (QRIS/card/      │                     │                     │
  │    ewallet/cash)   │                     │                     │
  │                     │                     │                     │
  │  ── QRIS ──────────────────────────────────────────────────────
  │                     │                     │                     │
  ├── Request QR ──────►├── POST /payments/   │                     │
  │                     │   create-qris ─────►│                     │
  │                     │                     ├── Generate QR      │
  │                     │◄── 200 {qrUrl,      │                     │
  │                     │    paymentId} ──────┤                     │
  │  ┌──────────────────┤                     │                     │
  │  │ Display QR code  │                     │                     │
  │  └──────────────────┤                     │                     │
  │                     │                     │                     │
  │   (patient scans    │                     │                     │
  │    with e-wallet)   │                     │                     │
  │                     │                     │                     │
  │                     ├── Webhook: payment  │                     │
  │                     │   confirmed ───────►│                     │
  │                     │                     ├── markPaid()       │
  │                     │                     ├── Update status    │
  │                     │◄── 200 ACK ─────────┤                     │
  │                     │                     │                     │
  │                     │                     ├── Push notif ──────►│
  │                     │                     │   "Payment          │
  │  ┌──────────────────┤                     │    received"        │
  │  │ Payment success  │                     │                     │
  │  │ screen           │                     │                     │
  │  └──────────────────┤                     │                     │
  │                     │                     │                     │
  │  ── Card ──────────────────────────────────────────────────────
  │                     │                     │                     │
  ├── Insert/tap card ─►├── POST /payments/   │                     │
  │                     │   charge-card ─────►│                     │
  │                     │                     ├── Process payment  │
  │                     │◄── 200 {receipt} ───┤                     │
  │                     │                     │                     │
  │  ── Cash ──────────────────────────────────────────────────────
  │                     │                     │                     │
  │  (Staff confirms    ├── POST /omdc/       │                     │
  │   cash received)    │   mark-paid ───────►│                     │
  │                     │                     ├── Update status    │
  │                     │◄── 200 ─────────────┤                     │
  │                     │                     │                     │
```

### 5.7 Telemedicine Session

```
Patient              Mobile App           API Server           Doctor
  │                     │                     │                     │
  ├── Telemedicine ────►│                     │                     │
  │   tab               │                     │                     │
  │                     ├── GET /telemedicine/ │                     │
  │  ┌──────────────────┤   doctors ─────────►│                     │
  │  │ Available doctors│◄── 200 [doctors] ───┤                     │
  │  └──────────────────┤                     │                     │
  │                     │                     │                     │
  ├── Select doctor ───►├── POST /telemedicine│                     │
  │                     │   /sessions ───────►│                     │
  │                     │                     ├── Create session   │
  │                     │                     ├── Notify doctor ──►│
  │                     │◄── 201 {sessionId,  │                     │
  │                     │    status} ─────────┤                     │
  │                     │                     │                     │
  │  ┌──────────────────┤                     │                     │
  │  │ Chat interface   │                     │                     │
  │  └──────────────────┤                     │                     │
  │                     │                     │                     │
  ├── Send message ────►├── POST /sessions/   │                     │
  │   "Gigi saya ngilu" │   :id/messages ────►│                     │
  │                     │                     ├── Store message    │
  │                     │                     ├── WS push ────────►│
  │                     │                     │                     │
  │                     │          ◄── Doctor replies ──────────────┤
  │                     │◄── WS push ─────────┤                     │
  │                     │                     │                     │
  ├── Request video ───►├── POST /sessions/   │                     │
  │                     │   :id/video ───────►│                     │
  │                     │                     ├── Create WebRTC   │
  │                     │                     │   signaling        │
  │                     │◄── 200 {roomUrl} ───┤                     │
  │                     │                     │                     │
  │  ┌──────────────────┤                     │                     │
  │  │ Video call       │◄── WebRTC ─────────►│◄── WebRTC ────────►│
  │  │ (peer-to-peer)   │                     │                     │
  │  └──────────────────┤                     │                     │
  │                     │                     │                     │
```

### 5.8 Admin CMS Update → Website Reflects Changes

```
Admin                Admin Panel          API Server           Website
  │                     │                     │                     │
  ├── Edit hero ───────►│                     │                     │
  │   headline          │                     │                     │
  │                     ├── PATCH /cms/hero ─►│                     │
  │                     │   {headline: "..."}  │                     │
  │                     │                     ├── Save to DB       │
  │                     │                     ├── Invalidate cache │
  │                     │◄── 200 {updated} ───┤                     │
  │                     │                     │                     │
  │                     │                     ├── Realtime push ──►│
  │                     │                     │   "cms_updated"     │
  │                     │                     │                     │
  │                     │                     │  ┌──────────────────┤
  │                     │                     │  │ Re-fetch CMS     │
  │                     │                     │  │ Re-render hero   │
  │                     │                     │  └──────────────────┤
  │                     │                     │                     │
```

### 5.9 Loyalty Points Flow

```
Patient              System               API Server           LoyaltyDB
  │                     │                     │                     │
  │  (Appointment completed)                  │                     │
  │                     │                     │                     │
  │                     ├── markDone(apt) ───►│                     │
  │                     │                     ├── Calculate points │
  │                     │                     │   (service price   │
  │                     │                     │    × multiplier)   │
  │                     │                     ├── Credit points ──►│
  │                     │                     │                     │
  │                     │                     ├── Check tier       │
  │                     │                     │   upgrade          │
  │                     │                     │                     │
  │  ┌──────────────────┤◄── Push notif ──────┤                     │
  │  │ "+50 points!     │   "Points earned"   │                     │
  │  │  Bronze → Silver"│                     │                     │
  │  └──────────────────┤                     │                     │
  │                     │                     │                     │
  │  ── Redeem reward ─────────────────────────────────────────────
  │                     │                     │                     │
  ├── Loyalty tab ─────►├── GET /loyalty/me ─►│                     │
  │                     │◄── 200 {points,     │                     │
  │                     │    tier} ───────────┤                     │
  │                     │                     │                     │
  │                     ├── GET /loyalty/     │                     │
  │                     │   rewards ─────────►│                     │
  │                     │◄── 200 [rewards] ───┤                     │
  │                     │                     │                     │
  ├── Redeem "Free     ├── POST /loyalty/    │                     │
  │   Scaling" ────────►│   redeem ──────────►│                     │
  │                     │                     ├── Deduct points    │
  │                     │                     ├── Create voucher   │
  │                     │◄── 200 {voucher,    │                     │
  │                     │    remaining} ──────┤                     │
  │                     │                     │                     │
```

---

## 6. Data Flow Architecture

### 6.1 Cross-Platform Data Sync

```
┌─────────────────────────────────────────────────────────────────┐
│                        Data Flow Map                            │
│                                                                 │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │  Mobile  │    │  Kiosk   │    │ Website  │    │  Admin   │  │
│  │  App     │    │          │    │          │    │          │  │
│  └────┬─────┘    └────┬─────┘    └────┬─────┘    └────┬─────┘  │
│       │               │               │               │        │
│       │  ┌─────────────────────────────────────────┐   │        │
│       └──┤         API Gateway (REST)              ├───┘        │
│          │  • Rate limiting   • Auth middleware     │            │
│          │  • Request logging • CORS                │            │
│          └──────────────┬──────────────────────────┘            │
│                         │                                       │
│            ┌────────────┼────────────┐                          │
│            ▼            ▼            ▼                          │
│     ┌────────────┐ ┌────────────┐ ┌────────────┐               │
│     │ Auth       │ │ Business   │ │ Realtime   │               │
│     │ Service    │ │ Logic      │ │ Service    │               │
│     │            │ │            │ │ (WS/SSE)   │               │
│     │ • JWT      │ │ • Booking  │ │            │               │
│     │ • OTP      │ │ • Queue    │ │ • Queue    │               │
│     │ • PIN      │ │ • Payment  │ │   updates  │               │
│     │ • RBAC     │ │ • Loyalty  │ │ • Notifs   │               │
│     │ • Social   │ │ • CMS      │ │ • CMS sync │               │
│     └────────────┘ │ • Reports  │ │ • Broadcast│               │
│                    └────────────┘ └────────────┘               │
│                         │                                       │
│                         ▼                                       │
│              ┌──────────────────┐                               │
│              │   PostgreSQL     │                               │
│              │   (Supabase)     │                               │
│              │                  │                               │
│              │  Tables:         │                               │
│              │  • patients      │                               │
│              │  • doctors       │                               │
│              │  • services      │                               │
│              │  • appointments  │                               │
│              │  • queue_items   │                               │
│              │  • transactions  │                               │
│              │  • notifications │                               │
│              │  • cms_content   │                               │
│              │  • admin_users   │                               │
│              │  • roles         │                               │
│              │  • branches      │                               │
│              │  • loyalty_accts │                               │
│              │  • family_members│                               │
│              │  • medical_records│                              │
│              │  • audit_logs    │                               │
│              └──────────────────┘                               │
│                                                                 │
│              ┌──────────────────┐                               │
│              │   File Storage   │                               │
│              │   (Supabase      │                               │
│              │    Storage)      │                               │
│              │                  │                               │
│              │  Buckets:        │                               │
│              │  • avatars       │                               │
│              │  • cms-media     │                               │
│              │  • medical-docs  │                               │
│              └──────────────────┘                               │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 Transaction Lifecycle

```
                        ┌─────────┐
                        │ CREATED │
                        │(booked) │
                        └────┬────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              │              ▼
        ┌───────────┐       │        ┌───────────┐
        │ CONFIRMED │       │        │ CANCELLED │
        └─────┬─────┘       │        └───────────┘
              │              │
              ▼              │
        ┌───────────┐       │
        │ CHECKED-IN│◄──────┘
        │ (queue    │    (walk-in: skip
        │  assigned)│     booked/confirmed)
        └─────┬─────┘
              │
              ▼
        ┌───────────┐
        │  SERVING  │
        │ (called)  │
        └─────┬─────┘
              │
         ┌────┼────┐
         ▼         ▼
   ┌──────────┐ ┌──────────┐
   │   DONE   │ │ NO-SHOW  │
   │ (treated)│ │ (skipped)│
   └────┬─────┘ └──────────┘
        │
        ▼
   ┌──────────┐
   │   PAID   │
   │ (settled)│
   └──────────┘
```

### 6.3 Notification Distribution

```
                    ┌─────────────────┐
                    │  Event Source    │
                    │                 │
                    │ • Queue called  │
                    │ • Booking made  │
                    │ • Payment done  │
                    │ • Admin bcast   │
                    │ • Promo new     │
                    │ • Reminder      │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Notification    │
                    │ Service         │
                    │                 │
                    │ • Persist to DB │
                    │ • Route by type │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
     ┌──────────────┐ ┌───────────┐ ┌────────────┐
     │ Push (FCM/   │ │ WebSocket │ │ Broadcast  │
     │ APNs)        │ │ (live)    │ │ Store (LS) │
     │              │ │           │ │            │
     │ → OS notif   │ │ → In-app  │ │ → Cross-tab│
     │   on phone   │ │   toast   │ │   sync     │
     └──────────────┘ └───────────┘ └────────────┘
```

### 6.4 Booking Code Journey

```
       App creates booking              Kiosk check-in
       ─────────────────               ───────────────
              │                              │
              ▼                              │
    ┌──────────────────┐                     │
    │ registerTransaction()                  │
    │                  │                     │
    │ Generates:       │                     │
    │ • Transaction code                     │
    │   OMDC-T-A18Q4Z  │                     │
    │ • Booking code   │                     │
    │   7H3K9Q         │                     │
    │ • Member code    │                     │
    │   OMDC-M-K8X2    │                     │
    └────────┬─────────┘                     │
             │                               │
             ▼                               │
    ┌──────────────────┐                     │
    │ Patient sees:    │                     │
    │ • Code "7H3K9Q"  │                     │
    │ • Barcode [||||]  │                     │
    │ • "Scan at kiosk" │                     │
    └──────────────────┘                     │
                                             │
                                             ▼
                                   ┌──────────────────┐
                                   │ extractBookingCode│
                                   │ ("7H3K9Q")       │
                                   └────────┬─────────┘
                                            │
                                            ▼
                                   ┌──────────────────┐
                                   │ lookupOmdcCode()  │
                                   │                   │
                                   │ Tries:            │
                                   │ 1. parseOmdcCode  │
                                   │ 2. findByBooking  │
                                   │ 3. findByMember   │
                                   │                   │
                                   │ Returns:          │
                                   │ {found, kind,     │
                                   │  transaction}     │
                                   └────────┬─────────┘
                                            │
                                            ▼
                                   ┌──────────────────┐
                                   │ checkInTransaction│
                                   │                   │
                                   │ • Assigns queue   │
                                   │   number "A019"   │
                                   │ • Status →        │
                                   │   "checked-in"    │
                                   │ • Broadcasts      │
                                   │   update          │
                                   └──────────────────┘
```

---

## 7. Real-time Events

### 7.1 WebSocket Channels

| Channel | Subscribers | Events |
|---------|------------|--------|
| `queue:{branchId}` | Admin, Kiosk, Queue Display | `queue_updated`, `queue_called`, `queue_done` |
| `appointments:{branchId}` | Admin | `appointment_created`, `appointment_updated`, `appointment_cancelled` |
| `notifications:{userId}` | Mobile App | `notification_new`, `notification_read` |
| `cms` | Website, Kiosk | `cms_updated` |
| `broadcast` | All authenticated | `broadcast_new` |

### 7.2 Event Payloads

**queue_called:**
```json
{
  "event": "queue_called",
  "data": {
    "number": "A018",
    "patientName": "Budi Santoso",
    "room": "Ruang 1",
    "doctor": "drg. Sarah Putri"
  }
}
```

**appointment_created:**
```json
{
  "event": "appointment_created",
  "data": {
    "id": "apt_x9k2m4",
    "patientName": "Budi Santoso",
    "service": "Scaling",
    "doctor": "drg. Sarah Putri",
    "date": "2026-06-28",
    "time": "10:00",
    "source": "app"
  }
}
```

**notification_new:**
```json
{
  "event": "notification_new",
  "data": {
    "id": "notif_k2x9",
    "type": "queue",
    "title": "Giliran Anda!",
    "body": "Nomor antrian A018, silakan menuju Ruang 1"
  }
}
```

**cms_updated:**
```json
{
  "event": "cms_updated",
  "data": {
    "section": "hero",
    "updatedAt": "2026-06-26T10:30:00Z"
  }
}
```

---

## 8. Error Handling

### 8.1 Error Codes

| HTTP Status | Error Code | Description |
|-------------|-----------|-------------|
| 400 | `VALIDATION_ERROR` | Invalid request body/params |
| 400 | `INVALID_OTP` | Wrong or expired OTP |
| 400 | `INVALID_PIN` | Wrong PIN |
| 400 | `INVALID_OMDC_CODE` | Code checksum failed |
| 400 | `SLOT_UNAVAILABLE` | Time slot already booked |
| 401 | `UNAUTHORIZED` | Missing/invalid token |
| 401 | `TOKEN_EXPIRED` | JWT expired (use refresh) |
| 403 | `FORBIDDEN` | Insufficient permissions |
| 403 | `ACCOUNT_DISABLED` | Admin account deactivated |
| 404 | `NOT_FOUND` | Resource not found |
| 404 | `CODE_NOT_FOUND` | OMDC code not in registry |
| 409 | `DUPLICATE` | Resource already exists |
| 409 | `ALREADY_CHECKED_IN` | Patient already checked in |
| 422 | `ALREADY_CANCELLED` | Appointment already cancelled |
| 429 | `RATE_LIMITED` | Too many requests |
| 429 | `OTP_COOLDOWN` | OTP resend within 60s |
| 500 | `INTERNAL_ERROR` | Unexpected server error |

### 8.2 Validation Error Format

```json
{
  "success": false,
  "error": "VALIDATION_ERROR",
  "message": "Validation failed",
  "details": {
    "phone": "Phone number must start with +62",
    "dob": "Date of birth must be in YYYY-MM-DD format",
    "serviceId": "Service not found"
  }
}
```

### 8.3 Error Response Examples

**Expired token:**
```json
{
  "success": false,
  "error": "TOKEN_EXPIRED",
  "message": "Access token has expired. Please refresh."
}
```

**Slot conflict:**
```json
{
  "success": false,
  "error": "SLOT_UNAVAILABLE",
  "message": "The 10:00 slot with drg. Sarah on 2026-06-28 is no longer available.",
  "data": {
    "nextAvailable": ["11:00", "13:00", "14:00"]
  }
}
```

---

## 9. Rate Limiting & Throttling

| Endpoint Pattern | Rate Limit | Window | Notes |
|-----------------|------------|--------|-------|
| `POST /api/auth/*` | 10 req | 1 min | Per IP |
| `POST /api/auth/verify-otp` | 5 req | 5 min | Per userId |
| `POST /api/auth/resend-otp` | 1 req | 60 sec | Per phone |
| `GET /api/*` (public) | 100 req | 1 min | Per IP |
| `GET /api/*` (auth) | 300 req | 1 min | Per token |
| `POST /api/*` (auth) | 60 req | 1 min | Per token |
| `POST /api/admin/broadcast` | 5 req | 1 hour | Per admin |
| `POST /api/cms/media/upload` | 20 req | 1 hour | Per admin |
| Kiosk endpoints | 120 req | 1 min | Per device |

**Rate limit headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1719388860
```

---

## 10. Versioning & Deprecation

### 10.1 API Versioning

- **URL path versioning**: `/v1/api/...`, `/v2/api/...`
- Current version: `v1`
- Version is part of the base URL, not individual endpoints
- Old versions supported for 12 months after new version release

### 10.2 Deprecation Policy

1. Announce deprecation via `Deprecation` header + changelog
2. 6-month warning period with `Sunset` header
3. Migration guide published per endpoint change
4. Old version returns `410 Gone` after sunset

**Deprecation headers:**
```
Deprecation: true
Sunset: Sat, 26 Jun 2027 00:00:00 GMT
Link: <https://api.omdcdental.com/docs/migration/v2>; rel="successor-version"
```

### 10.3 CMS Schema Versioning

CMS content includes `_schemaVersion` (currently `5`). Backend runs migrations automatically when loading older schemas:

| Version | Changes |
|---------|---------|
| 1 | Initial (hero, services, doctors, clinic) |
| 2 | Added articles, about, contact, appearance |
| 3 | Added trust, testimonials, faq, gallery |
| 4 | Added branches, logoUrl |
| 5 | Added kioskSettings (queuePrefix, bookingCodeCheckin, kioskPayment) |

---

## 11. Appendix

### 11.1 Permission Modules (Admin RBAC)

```
website.view, website.edit_hero, website.edit_services,
website.edit_about, website.edit_articles, website.edit_appearance,
website.upload_media, website.publish

appointments.view, appointments.create, appointments.edit,
appointments.cancel, appointments.export

queue.view, queue.manage

patients.view, patients.create, patients.edit,
patients.delete, patients.export

doctors.view, doctors.create, doctors.edit, doctors.delete

services.view, services.create, services.edit, services.delete

promotions.view, promotions.create, promotions.edit, promotions.delete

finance.view, finance.edit, finance.approve

reports.view, reports.export

users.view, users.create, users.edit, users.delete

roles.view, roles.create, roles.edit, roles.delete

it.logs, it.errors, it.security

kiosk.view, kiosk.manage

mobile.view, mobile.manage

settings.view, settings.edit
```

### 11.2 Default Admin Roles

| Role | Key Permissions |
|------|----------------|
| **Owner** | `*` (full access) |
| **Master Admin** | All except `finance.edit`, `finance.approve` |
| **Finance Controller** | `finance.*`, `reports.*`, `appointments.view` |
| **Finance Approvals** | `finance.approve`, `finance.view`, `reports.view` |
| **Marketing** | `promotions.*`, `website.edit_articles`, `website.edit_hero` |
| **IT Team** | `it.*`, read-only on most modules |
| **Website Developer** | `website.*`, `services.*`, `doctors.view`, `promotions.*` |
| **Apps Manager** | `mobile.*`, `appointments.*`, `queue.*`, `patients.*` |
| **E-Kiosk Manager** | `kiosk.*`, `queue.*`, `appointments.view` |
| **Receptionist** | `appointments.view`, `patients.view`, `queue.view`, `services.view` |

### 11.3 Service Catalog (Default)

| ID | Name | Duration | Price Range (IDR) |
|----|------|----------|-------------------|
| s1 | Pembersihan Karang Gigi (Scaling) | 30 min | 150K – 350K |
| s2 | Pemutihan Gigi (Whitening) | 60 min | 1.5M – 3.5M |
| s3 | Tambal Gigi (Filling) | 30 min | 200K – 800K |
| s4 | Cabut Gigi (Extraction) | 30 min | 150K – 500K |
| s5 | Pemasangan Kawat Gigi (Braces) | 90 min | 8M – 20M |
| s6 | Veneer Gigi | 60 min | 2M – 5M |
| s7 | Implan Gigi (Dental Implant) | 120 min | 8M – 15M |
| s8 | Perawatan Saluran Akar (Root Canal) | 60 min | 1M – 3M |

### 11.4 Clinic Branches (Default)

| ID | Name | City |
|----|------|------|
| branch_jkt_central | OMDC Jakarta Pusat | Jakarta |
| branch_jkt_south | OMDC Jakarta Selatan | Jakarta |
| branch_tng | OMDC Tangerang | Tangerang |
| branch_bks | OMDC Bekasi | Bekasi |

### 11.5 Queue Number Format

- Format: `{prefix}{3-digit number}` — e.g., `A001`, `A002`, ..., `A999`
- Prefix configurable per branch via CMS `kioskSettings.queuePrefix`
- Counter resets daily
- Sequential, globally unique per branch per day

### 11.6 OMDC Code Checksum Algorithm

Uses Damm-style check character over custom alphabet (34 chars, no I/O):

```
Alphabet: 0123456789ABCDEFGHJKLMNPQRSTUVWXYZ

Generate:
  1. Build body from entropy/seed
  2. Compute check char via quasigroup operation
  3. Append check char to body
  4. Prepend prefix (OMDC-M-, OMDC-T-, OMDC-B-)

Validate:
  1. Normalize input (uppercase, O→0, I→1)
  2. Strip prefix
  3. Run quasigroup over entire string including check char
  4. Result must equal 0 (valid) or non-zero (invalid)
```

### 11.7 Supported Payment Methods

| Method | Code | Available At |
|--------|------|-------------|
| Cash | `cash` | Kiosk (staff-confirmed), Admin |
| Debit/Credit Card | `card` | Kiosk, Mobile |
| E-Wallet (GoPay, OVO, Dana) | `ewallet` | Mobile, Kiosk |
| QRIS | `qris` | Mobile, Kiosk |

### 11.8 Localization

All user-facing strings support dual language:
- **Indonesian (ID)** — primary, default
- **English (EN)** — secondary

Kiosk language is selected per session. Mobile/Website persisted in `localStorage`.

API responses include both language variants for translatable fields (`name`/`nameEn`, `description`/`descriptionEn`).

### 11.9 Time & Date Conventions

| Field | Format | Example | Notes |
|-------|--------|---------|-------|
| Date | ISO 8601 date | `2026-06-28` | WIB timezone |
| Time | HH:mm (24h) | `10:00` | |
| Datetime | ISO 8601 | `2026-06-28T10:00:00+07:00` | With timezone |
| Epoch | Unix ms | `1719561600000` | For ordering/dedupe |

### 11.10 HTTP Headers

**Request (all endpoints):**
```
Content-Type: application/json
Authorization: Bearer <token>          (authenticated endpoints)
Accept-Language: id | en               (optional, for localized errors)
X-Device-Id: KIOSK-JKT-001            (kiosk only)
X-App-Version: 2.9.0                  (mobile only)
X-Platform: ios | android | web       (mobile/web only)
```

**Response:**
```
Content-Type: application/json
X-Request-Id: req_a7b3c9d4            (for support/debugging)
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1719388860
```

---

*End of API Contract v1.0*
