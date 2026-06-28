# OMDC Dental — Complete Architecture Design & Flow

> Version 2.9.0 · Last updated: 2026-06-28

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [High-Level Architecture](#2-high-level-architecture)
3. [Project Structure](#3-project-structure)
4. [Routing & Platform Separation](#4-routing--platform-separation)
5. [State Management Architecture](#5-state-management-architecture)
6. [Data Layer & Persistence](#6-data-layer--persistence)
7. [OMDC Code System (Identity Spine)](#7-omdc-code-system-identity-spine)
8. [Transaction Registry & Lifecycle](#8-transaction-registry--lifecycle)
9. [Cross-Tab Communication (Broadcast Bus)](#9-cross-tab-communication-broadcast-bus)
10. [Platform-Specific Flows](#10-platform-specific-flows)
    - [10a. Mobile App Flow](#10a-mobile-app-flow)
    - [10b. eKiosk Flow](#10b-ekiosk-flow)
    - [10c. Website Flow](#10c-website-flow)
    - [10d. Admin Dashboard Flow](#10d-admin-dashboard-flow)
11. [Cross-Platform Patient Journey](#11-cross-platform-patient-journey)
12. [Authentication & RBAC](#12-authentication--rbac)
13. [Notification System](#13-notification-system)
14. [CMS Architecture](#14-cms-architecture)
15. [Service Layer (API Readiness)](#15-service-layer-api-readiness)
16. [Build, Deploy & Infrastructure](#16-build-deploy--infrastructure)
17. [Debugging & Tracing Guide](#17-debugging--tracing-guide)
18. [Known Gaps & Recommended Actions](#18-known-gaps--recommended-actions)
19. [Component Dependency Map](#19-component-dependency-map)

---

## 1. System Overview

OMDC Dental is a **single-repository, multi-surface** dental clinic management system. Four platforms share one React SPA codebase and are separated by URL path:

| Platform | Route | Audience | Navigation Pattern |
|----------|-------|----------|-------------------|
| **Website** | `/` | Public / patients | React Router (nested routes) |
| **Mobile App** | `/mobile`, `/app` | Registered patients | State machine (screen enum) |
| **eKiosk** | `/kiosk` | In-clinic visitors | State machine (step enum) |
| **Admin CMS** | `/admin` | Clinic staff | React Router (sidebar nav) |

All platforms are lazy-loaded and code-split. The mobile and kiosk platforms use internal screen state machines (not URL routing), while the website and admin use React Router v7.

---

## 2. High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────────────┐
│                          Browser (Single Tab or Multiple Tabs)          │
│                                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐  │
│  │   Website   │  │  Mobile PWA │  │   eKiosk    │  │  Admin CMS   │  │
│  │   / (root)  │  │  /mobile    │  │   /kiosk    │  │   /admin     │  │
│  │             │  │  /app       │  │             │  │              │  │
│  │ React       │  │ State       │  │ State       │  │ React Router │  │
│  │ Router      │  │ Machine     │  │ Machine     │  │ + Auth Guard │  │
│  │ (7 pages)   │  │ (27 screens)│  │ (15 steps)  │  │ (14 pages)   │  │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬───────┘  │
│         │                │                │                 │          │
│  ┌──────┴────────────────┴────────────────┴─────────────────┴───────┐  │
│  │                     Shared Context Layer                         │  │
│  │  CMSProvider → LanguageProvider → BrowserRouter → Suspense       │  │
│  │                                                                   │  │
│  │  ┌──────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────┐ │  │
│  │  │   CMS    │  │   Language   │  │ Notification │  │   Auth   │ │  │
│  │  │ Context  │  │   Context    │  │   Context    │  │ Context  │ │  │
│  │  │(all plat)│  │ (all plat)   │  │ (mobile)     │  │ (admin)  │ │  │
│  │  └────┬─────┘  └──────┬───────┘  └──────┬───────┘  └────┬─────┘ │  │
│  └───────┼───────────────┼──────────────────┼───────────────┼───────┘  │
│          │               │                  │               │          │
│  ┌───────┴───────────────┴──────────────────┴───────────────┴───────┐  │
│  │                     Shared Data Layer                             │  │
│  │                                                                   │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────┐  │  │
│  │  │  OMDC Code   │  │  Transaction │  │    Broadcast Bus       │  │  │
│  │  │  Engine      │  │  Registry    │  │  (cross-tab events)    │  │  │
│  │  │ omdcCode.ts  │  │ omdcTxns.ts  │  │  broadcastStore.ts     │  │  │
│  │  └──────────────┘  └──────────────┘  └────────────────────────┘  │  │
│  │                                                                   │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────┐  │  │
│  │  │  Mock Data   │  │  Service     │  │    Utilities           │  │  │
│  │  │ mockData.ts  │  │  Layer (API) │  │  haptics, sound, cn    │  │  │
│  │  └──────────────┘  └──────────────┘  └────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                     Persistence Layer                             │  │
│  │                                                                   │  │
│  │  localStorage                    Supabase                         │  │
│  │  ├── omdc:transactions          ├── cms_content (table)           │  │
│  │  ├── omdc:broadcasts            ├── uploads (storage bucket)      │  │
│  │  ├── omdc:queueCounter          └── Realtime subscriptions        │  │
│  │  ├── omdc_cms_content                                             │  │
│  │  ├── omdc_admin_users                                             │  │
│  │  ├── omdc_current_user                                            │  │
│  │  ├── omdc_admin_token                                             │  │
│  │  └── omdc_lang                                                    │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Project Structure

```
dentalchain/
├── index.html                    # SPA entry, PWA meta tags, JSON-LD, SW registration
├── package.json                  # React 19, Vite 6, Tailwind v4, Supabase, Motion
├── vite.config.ts                # Code splitting, HMR, Tailwind plugin
├── tsconfig.json                 # Strict mode, path alias @/* → ./src/*
├── vercel.json                   # SPA rewrites, security headers, cache policy
├── public/
│   ├── manifest.json             # PWA manifest (standalone, shortcuts)
│   └── sw.js                     # Service worker (offline cache)
│
├── src/
│   ├── main.tsx                  # createRoot + HelmetProvider
│   ├── App.tsx                   # Root: CMSProvider → LanguageProvider → Router
│   ├── version.ts                # APP_VERSION, APP_BUILD_DATE
│   ├── index.css                 # Tailwind v4 imports
│   │
│   ├── types/
│   │   └── index.ts              # All TypeScript interfaces
│   │
│   ├── context/                  # React Context providers
│   │   ├── CMSContext.tsx        # CMS data (Supabase + localStorage sync)
│   │   ├── AuthContext.tsx       # Admin authentication + RBAC
│   │   ├── LanguageContext.tsx   # i18n (id/en), 70+ translation keys
│   │   ├── NotificationContext.tsx # Push notifications + broadcast listener
│   │   └── KioskOrientationContext.tsx # Landscape/portrait detection
│   │
│   ├── lib/                      # Shared business logic
│   │   ├── omdcCode.ts           # OMDC code engine (member/transaction/booking)
│   │   ├── omdcTransactions.ts   # Transaction registry (localStorage bus)
│   │   ├── broadcastStore.ts     # Cross-tab notification bus
│   │   ├── supabase.ts           # Supabase client + image upload helpers
│   │   ├── kioskSound.ts         # Web Audio API tone synthesis
│   │   ├── haptics.ts            # Vibration API patterns
│   │   └── cn.ts                 # Classname utility
│   │
│   ├── data/                     # Static/seed data
│   │   ├── mockData.ts           # Doctors, services, promotions, testimonials
│   │   ├── defaultCMSContent.ts  # CMS schema v5 defaults (15 sections)
│   │   ├── defaultRoles.ts       # 9 system roles with permission arrays
│   │   └── permissions.ts        # 15 permission modules, 52 permissions
│   │
│   ├── services/                 # API abstraction layer
│   │   ├── api.ts                # HTTP client (token auth, mock fallback)
│   │   ├── appointments.ts       # Appointment CRUD
│   │   ├── doctors.ts            # Doctor data service
│   │   ├── patients.ts           # Patient management
│   │   ├── queue.ts              # Queue operations
│   │   └── index.ts              # Barrel export
│   │
│   ├── components/               # Shared/reusable components
│   │   ├── ui/                   # Design system primitives (15 components)
│   │   │   ├── AnimatedDentalBg.tsx
│   │   │   ├── OmdcLogo.tsx
│   │   │   ├── OmdcBarcode.tsx   # Code128-B barcode renderer
│   │   │   ├── OmdcIcons.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   ├── CountUp.tsx
│   │   │   ├── SplashScreen.tsx
│   │   │   ├── SplitFlapDisplay.tsx
│   │   │   ├── HeroGeometric.tsx
│   │   │   ├── HeroIllustration.tsx
│   │   │   ├── SmoothImage.tsx
│   │   │   ├── WaveDivider.tsx
│   │   │   └── SeoHead.tsx
│   │   ├── website/              # Website-specific (Navbar, Footer, PageHero)
│   │   ├── mobile/               # Mobile-specific (BottomNav, Odontogram, etc.)
│   │   └── kiosk/                # Kiosk-specific (KioskHeader)
│   │
│   └── pages/                    # Platform page/screen components
│       ├── website/              # 7 pages + layout
│       ├── mobile/               # MobileLayout + 27 screen files
│       │   ├── MobileLayout.tsx
│       │   └── screens/
│       ├── kiosk/                # KioskLayout + 15 screen files
│       │   ├── KioskLayout.tsx
│       │   └── screens/
│       └── admin/                # AdminLayout + 14 page files
│
├── docs/                         # Documentation
├── design/                       # Figma design references
├── assets/                       # Design assets
└── .github/workflows/            # CI/CD pipelines
```

---

## 4. Routing & Platform Separation

### Entry Point Flow

```
index.html
  └── main.tsx (createRoot)
        └── App.tsx
              └── CMSProvider
                    └── LanguageProvider
                          └── BrowserRouter (basename from env)
                                └── Suspense (LoadingFallback)
                                      └── Routes
                                            ├── /          → WebsiteLayout (Outlet)
                                            │   ├── /           → Home
                                            │   ├── /doctors    → Doctors
                                            │   ├── /services   → Services
                                            │   ├── /booking    → Booking
                                            │   ├── /promotions → Promotions
                                            │   ├── /about      → About
                                            │   └── /contact    → Contact
                                            │
                                            ├── /kiosk/*   → KioskLayout (state machine)
                                            ├── /mobile/*  → MobileLayout (state machine)
                                            ├── /app/*     → MobileLayout (alias)
                                            ├── /admin/*   → AdminLayout (subroutes)
                                            └── *          → Navigate to /
```

### Navigation Patterns by Platform

| Platform | Pattern | Navigation Mechanism | History |
|----------|---------|---------------------|---------|
| Website | React Router | `<Link to="...">`, URL-based | Browser history |
| Mobile | State machine | `setScreen('name')` via props | Manual back stack |
| Kiosk | State machine | `goTo(step)` / `goBack()` via `STEP_HISTORY` map | Predefined back map |
| Admin | React Router | Sidebar `<NavLink>`, URL-based | Browser history |

### Why Two Patterns?

- **Website & Admin** use URL routing because users bookmark/share links and expect browser back/forward.
- **Mobile & Kiosk** use state machines because they behave as contained app experiences — no URL bar visible, transitions are animated, and screen state couples tightly to business data (selected service, doctor, date, etc.).

---

## 5. State Management Architecture

### Provider Stack (outermost → innermost)

```
CMSProvider                    ← All platforms read CMS data
  └── LanguageProvider         ← All platforms use i18n
        └── BrowserRouter      ← URL routing for website/admin
              └── Platform-specific providers:
                    ├── Website: (none additional)
                    ├── Mobile: NotificationProvider (wraps MobileLayout)
                    ├── Kiosk: KioskOrientationProvider (wraps KioskLayout)
                    └── Admin: AuthProvider (wraps AdminLayout)
```

### State Ownership

| State Domain | Owner | Storage | Scope |
|-------------|-------|---------|-------|
| CMS content | `CMSContext` | Supabase + localStorage | Global |
| Language (id/en) | `LanguageContext` | localStorage | Global |
| Admin session | `AuthContext` | localStorage | Admin only |
| Notifications | `NotificationContext` | In-memory | Mobile only |
| Kiosk orientation | `KioskOrientationContext` | Viewport detection | Kiosk only |
| Mobile screen state | `MobileLayout` (useState) | Component state | Mobile only |
| Kiosk step state | `KioskLayout` (useState) | Component state | Kiosk only |
| Transactions | `omdcTransactions.ts` | localStorage + events | Cross-platform |
| Broadcasts | `broadcastStore.ts` | localStorage + events | Cross-platform |
| Queue counter | `omdcTransactions.ts` | localStorage | Cross-platform |

### Data Flow Diagram

```
                    ┌──────────────┐
                    │  Admin CMS   │
                    │  Editor      │
                    └──────┬───────┘
                           │ updateCMS()
                           ▼
                    ┌──────────────┐     ┌─────────────┐
                    │  CMSContext   │────▶│  Supabase   │
                    │  (Provider)   │◀────│  Realtime   │
                    └──────┬───────┘     └─────────────┘
                           │ localStorage sync
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │ Website  │ │  Mobile  │ │  Kiosk   │
        │ (reads   │ │ (reads   │ │ (reads   │
        │  hero,   │ │  app     │ │  kiosk   │
        │  etc.)   │ │  config) │ │  settings)│
        └──────────┘ └──────────┘ └──────────┘


                    ┌──────────────┐
                    │ Admin        │
                    │ Broadcast    │
                    └──────┬───────┘
                           │ pushBroadcast()
                           ▼
                    ┌──────────────┐     ┌─────────────────┐
                    │ broadcastStore│────▶│ localStorage    │
                    │ (bus)        │     │ + storage event  │
                    └──────┬───────┘     └─────────────────┘
                           │ subscribeBroadcasts()
                           ▼
                    ┌──────────────┐
                    │ Notification │
                    │ Context      │
                    │ (toasts)     │
                    └──────────────┘


        ┌──────────┐                    ┌──────────┐
        │ Mobile   │                    │  Kiosk   │
        │ Booking  │                    │  Check-in│
        │ Confirm  │                    │  / Recall│
        └────┬─────┘                    └────┬─────┘
             │ registerTransaction()          │ lookupOmdcCode()
             ▼                               ▼
        ┌─────────────────────────────────────────┐
        │         Transaction Registry             │
        │         localStorage: omdc:transactions  │
        │         (cross-tab via storage event)    │
        └─────────────────────────────────────────┘
```

---

## 6. Data Layer & Persistence

### localStorage Keys

| Key | Module | Purpose | Max Records |
|-----|--------|---------|-------------|
| `omdc:transactions` | omdcTransactions.ts | Booking/queue ticket registry | 100 |
| `omdc:broadcasts` | broadcastStore.ts | Admin → patient notifications | 50 |
| `omdc:queueCounter` | omdcTransactions.ts | Sequential queue number counter | N/A |
| `omdc_cms_content` | CMSContext.tsx | CMS data cache | 1 (object) |
| `omdc_admin_users` | AuthContext.tsx | Admin user accounts | N/A |
| `omdc_current_user` | AuthContext.tsx | Active admin session | 1 |
| `omdc_admin_token` | AuthContext.tsx | Auth token | 1 |
| `omdc_lang` | LanguageContext.tsx | Language preference (id/en) | 1 |
| `omdc:kiosk:a11y` | KioskLayout.tsx | Accessibility mode toggle | 1 |

### Supabase Integration

| Resource | Type | Purpose |
|----------|------|---------|
| `cms_content` | Table | CMS data (synced with localStorage) |
| `uploads` | Storage bucket | CMS images (upload/delete) |
| Realtime channel | Subscription | Live CMS updates across tabs/devices |

### Mock Data (`src/data/mockData.ts`)

| Dataset | Count | Key Fields |
|---------|-------|------------|
| DOCTORS | 4 | id, name, specialty, photo, available, rating, schedule |
| SERVICES | 8 | id, name, icon, description, duration, priceMin/Max |
| PROMOTIONS | 3 | title, discount%, validUntil, code |
| TESTIMONIALS | 4 | name, rating, comment, service |
| TIME_SLOTS | 12 | 08:00–20:00 (some pre-blocked) |
| CURRENT_QUEUE | 1 | A017 + upcoming [A018–A021] |
| SAMPLE_APPOINTMENTS | 1 | Demo appointment record |

---

## 7. OMDC Code System (Identity Spine)

The OMDC code system is the **identity spine** that connects patients across all platforms. Every patient gets a permanent member code, and every booking gets a unique transaction code + human-friendly booking code.

### Code Types

| Code | Format | Example | Purpose | Generation |
|------|--------|---------|---------|------------|
| **Member** | `OMDC-M-XXXXX` | `OMDC-M-7K3F9` | Permanent patient ID | Deterministic (FNV-1a hash of userId) |
| **Transaction** | `OMDC-T-XXXXXX` | `OMDC-T-A18Q4Z` | Unique per booking | Unique (hash of seed + timestamp + random) |
| **Booking** | `XXXXXX` / `OMDC-B-XXXXXXX` | `7H3K9Q` | Human-friendly code for kiosk recall | Random 6 chars |

### Encoding Details

```
Alphabet: 0123456789ABCDEFGHJKLMNPQRSTUVWXYZ (base-34, no I/O to avoid OCR confusion)
Hash:     FNV-1a 32-bit (stable, fast)
Check:    Damm-style — sum of (char_index × position) mod 34 → appended as last char
Normalize: Uppercase, strip non-alphanumeric, O→0, I→1
```

### Code Resolution Flow

```
User input (scan/type)
  │
  ▼
normalize(raw)           ← uppercase, O→0, I→1
  │
  ▼
parseOmdcCode(code)      ← try all prefixes (OMDC-M-, OMDC-T-, OMDC-B-)
  │
  ├── valid + kind=transaction → find by txn key
  ├── valid + kind=member      → find latest txn for member
  ├── valid + kind=booking     → find by booking code body
  └── invalid                  → try bare 6-char match → findByBookingCode()
```

---

## 8. Transaction Registry & Lifecycle

### OmdcTransaction Interface

```typescript
interface OmdcTransaction {
  key: string;              // Transaction code body (lookup key)
  code: string;             // Full OMDC-T-... code
  bookingCode: string;      // 6-char human-friendly code
  patientName: string;
  memberCode: string;       // Full OMDC-M-... code
  memberKey: string;        // Member code body
  medicalRecordNo?: string;
  phone?: string;
  serviceId?: string;
  serviceName?: string;
  doctorName?: string;
  date?: string;
  time?: string;
  queueNumber?: string;     // Assigned at check-in (e.g., "A018")
  status: 'booked' | 'checked-in' | 'paid' | 'done' | 'cancelled';
  paid: boolean;
  amount?: number;
  source: 'app' | 'kiosk';
  ts: number;               // Creation timestamp
}
```

### Status Lifecycle

```
    ┌──────────┐
    │          │
    │  booked  │ ← registerTransaction() (from mobile app or kiosk)
    │          │
    └────┬─────┘
         │ checkInTransaction()
         │ (assigns queue number)
         ▼
    ┌──────────────┐
    │              │
    │  checked-in  │ ← patient arrives at clinic, scans code at kiosk
    │              │
    └────┬─────────┘
         │ markPaid()
         ▼
    ┌──────────┐
    │          │
    │   paid   │ ← payment settled (kiosk, cashier, or pre-paid in app)
    │          │
    └────┬─────┘
         │ (admin marks done)
         ▼
    ┌──────────┐
    │          │
    │   done   │ ← treatment complete
    │          │
    └──────────┘

  At any point:  ──────▶  cancelled
```

### Queue Number Assignment

```
assignQueueNumber(prefix = 'A')
  │
  ├── Read counter from localStorage (omdc:queueCounter)
  ├── Increment by 1 (starts at 18 for demo continuity)
  ├── Write back to localStorage
  └── Return formatted: prefix + zero-padded number → "A018", "A019", ...
```

### Key API Functions

| Function | Trigger Point | What It Does |
|----------|--------------|--------------|
| `registerTransaction(input)` | Mobile booking confirm, Kiosk confirmation | Creates new txn with OMDC codes |
| `lookupOmdcCode(raw)` | Kiosk recall/check-in | Resolves any code format → transaction |
| `checkInTransaction(key, prefix)` | Kiosk check-in | Assigns queue number, sets status |
| `markPaid(key)` | Kiosk payment, Admin queue | Sets paid=true, status='paid' |
| `updateTransaction(key, patch)` | Various admin actions | Patches and broadcasts change |
| `seedDemoTransaction()` | Kiosk mount | Creates demo booking for testing |

---

## 9. Cross-Tab Communication (Broadcast Bus)

### Architecture

The broadcast bus enables **admin → patient** communication across tabs/windows using localStorage events.

```
┌──────────────────┐         ┌───────────────────┐
│  Admin Tab        │         │  Mobile Tab        │
│                   │         │                    │
│  pushBroadcast()  │         │  subscribeBroadcasts()
│       │           │         │       ▲            │
│       ▼           │         │       │            │
│  localStorage.set │──────▶──│  storage event     │
│  + CustomEvent    │  cross  │  (fires in other   │
│                   │   tab   │   tabs only)       │
│                   │         │                    │
│  Same tab:        │         │  NotificationCtx   │
│  CustomEvent      │         │  converts to toast  │
│  'omdc:broadcasts │         │                    │
│  :update'         │         │                    │
└──────────────────┘         └───────────────────┘
```

### Two Event Mechanisms

1. **`storage` event** — fires in **other** tabs when localStorage changes (browser native).
2. **`CustomEvent('omdc:broadcasts:update')` / `CustomEvent('omdc:transactions:update')`** — fires in the **same** tab (because `storage` events don't fire in the tab that wrote).

Both the broadcast bus and transaction registry use this dual-event pattern.

### Broadcast Types

| Type | Origin | Example |
|------|--------|---------|
| `reminder` | Admin broadcast | "Appointment reminder for tomorrow" |
| `queue` | Admin/system | "Now serving A018" |
| `promo` | Admin broadcast | "30% off scaling this week" |
| `system` | System | "Clinic closed for holiday" |

---

## 10. Platform-Specific Flows

### 10a. Mobile App Flow

```
MobileLayout (MobileState, NotificationProvider)
│
├── Auth Flow (no bottom nav):
│   onboarding (5 slides)
│   └── login (phone/email + password)
│       ├── forgot-password (email reset)
│       └── register (full form)
│             └── otp (6-digit verification)
│                   └── create-pin (6-digit numpad, confirm phase)
│                         └── home ← (isLoggedIn = true)
│
├── Main Flow (bottom nav: home, booking, queue, profile, loyalty):
│   home ── hero card, 8 service icons, doctor cards, promos
│   │   └── [tap service] → booking-doctor (skip service picker)
│   │   └── [tap doctor]  → doctor-detail
│   │   └── [tap promo]   → promos
│   │
│   booking ── odontogram (tooth chart) + service checkboxes
│   │   └── booking-branch (select clinic location)
│   │         └── booking-doctor (doctor cards with availability)
│   │               └── booking-schedule (calendar + time grid)
│   │                     └── booking-confirm
│   │                     │     registerTransaction()
│   │                     │     Shows: OMDC codes + barcode
│   │                     └── booking-payment
│   │                           markPaid()
│   │                           → home (success toast)
│   │
│   queue ── real-time tracker (subscribes to broadcast bus)
│   │
│   profile ── user info, settings, language, logout
│   │
│   └── Other screens: medical, notifications, history,
│       family, loyalty, dental-tracker, insurance,
│       education, telemedicine, chat-detail, video-call,
│       doctors, promos, doctor-detail
│
└── Bottom Nav visibility:
    HIDDEN on: onboarding, login, register, otp, create-pin,
               forgot-password, booking-*, doctor-detail,
               chat-detail, video-call
    VISIBLE on: home, queue, profile, loyalty, and other main screens
```

### Mobile Screen Inventory (27 screens)

| Screen | File | Key Actions |
|--------|------|-------------|
| `onboarding` | MobileOnboarding.tsx | 5 intro slides, → login |
| `login` | MobileLogin.tsx | Auth, → register / forgot-password / home |
| `register` | MobileRegister.tsx | Form, → otp |
| `otp` | MobileOTP.tsx | 6-digit verify, 60s countdown, → create-pin |
| `create-pin` | MobileCreatePin.tsx | 6-digit numpad (2-phase), → home |
| `forgot-password` | MobileForgotPassword.tsx | Email reset, → login |
| `home` | MobileHome.tsx | Dashboard, service grid, doctor cards |
| `booking` | MobileBooking.tsx | Odontogram + service list |
| `booking-branch` | MobileSelectBranch.tsx | Clinic location picker |
| `booking-doctor` | MobileDoctorSelect.tsx | Doctor cards with availability |
| `booking-schedule` | MobileSchedule.tsx | Calendar + time slots |
| `booking-confirm` | MobileBookingConfirm.tsx | Summary, `registerTransaction()`, shows codes |
| `booking-payment` | MobilePayment.tsx | QRIS/bank/e-wallet/insurance, `markPaid()` |
| `queue` | MobileQueue.tsx | Live queue tracker |
| `profile` | MobileProfile.tsx | Settings, language, logout |
| `medical` | MobileMedical.tsx | Records, allergies, dental chart |
| `notifications` | MobileNotifications.tsx | Notification center |
| `history` | MobileHistory.tsx | Past appointments |
| `family` | MobileFamily.tsx | Family member management |
| `loyalty` | MobileLoyalty.tsx | Points, tiers, rewards |
| `doctors` | MobileDoctors.tsx | Browse all doctors |
| `doctor-detail` | MobileDoctorDetail.tsx | Doctor profile page |
| `promos` | MobilePromos.tsx | Promotional offers |
| `dental-tracker` | MobileDentalTracker.tsx | Oral health tracking |
| `insurance` | MobileInsurance.tsx | Insurance info |
| `education` | MobileEducation.tsx | Dental education content |
| `telemedicine` | MobileTelemedicine.tsx | Online consultation |
| `chat-detail` | MobileChatDetail.tsx | Chat with doctor |
| `video-call` | MobileVideoCall.tsx | Video call interface |

---

### 10b. eKiosk Flow

```
KioskLayout (KioskState, KioskOrientationProvider)
│
│  Viewport: 1280×800 landscape / 820×1180 portrait (auto-detected)
│  Idle timeout: cms.kioskSettings.idleTimeoutSeconds (default 30s)
│  Feedback: kioskSound() + haptic()
│
├── Main Booking Flow:
│   welcome (attract screen, animated)
│   └── language (ID / EN toggle)
│         └── main-menu (4 options)
│               ├── [Booking Baru] → service-select
│               │     └── doctor-select
│               │           └── date-select (calendar)
│               │                 └── time-select (slot grid)
│               │                       └── confirmation
│               │                       │     registerTransaction()
│               │                       │     assignQueueNumber()
│               │                       │
│               │                       ├── [kioskPayment=true] → payment
│               │                       │     markPaid()
│               │                       │     → ticket
│               │                       │
│               │                       └── [kioskPayment=false] → ticket
│               │                             (shows barcode, queue#, booking code)
│               │
│               ├── [Check-In] → checkin
│               │     scan/type OMDC code → lookupOmdcCode()
│               │     → checkInTransaction() → payment/ticket
│               │
│               ├── [Info & Promo] → info-promo
│               │
│               └── [Antrian] → queue-display
│                     (now serving + waiting list, auto-refresh)
│
├── OMDC Recall Flow (from welcome):
│   welcome → omdc-recall
│   │  Scan barcode OR type 6-char booking code
│   │  extractBookingCode() + lookupOmdcCode()
│   │  → Found: checkInTransaction() → payment/ticket
│   │  → Not found: error feedback
│
├── New Patient Registration:
│   main-menu → new-patient → service-select → (continues booking flow)
│
└── Back Navigation (STEP_HISTORY map):
    ticket → welcome
    payment → confirmation
    confirmation → time-select
    time-select → date-select
    date-select → doctor-select
    doctor-select → service-select
    service-select → main-menu
    main-menu → language
    language → welcome
    (etc.)
```

### Kiosk Screen Inventory (15 steps)

| Step | File | Key Actions |
|------|------|-------------|
| `welcome` | KioskWelcome.tsx | Attract mode, → language or omdc-recall |
| `language` | KioskLanguage.tsx | ID/EN choice, → main-menu |
| `main-menu` | KioskMainMenu.tsx | 4 options: booking, check-in, info, queue |
| `service-select` | KioskServiceSelect.tsx | Service cards grid |
| `doctor-select` | KioskDoctorSelect.tsx | Available doctors |
| `date-select` | KioskDateSelect.tsx | Calendar picker |
| `time-select` | KioskTimeSelect.tsx | Time slot grid |
| `confirmation` | KioskConfirmation.tsx | Summary + `registerTransaction()` |
| `payment` | KioskPayment.tsx | QRIS/cash/card + `markPaid()` |
| `ticket` | KioskTicket.tsx | Queue#, barcode, booking code, "Print" |
| `queue-display` | KioskQueueDisplay.tsx | Now serving + waiting list |
| `checkin` | KioskCheckin.tsx | Scan/type code → `checkInTransaction()` |
| `new-patient` | KioskNewPatient.tsx | Registration form |
| `info-promo` | KioskInfoPromo.tsx | Promotions display |
| `omdc-recall` | KioskOmdcRecall.tsx | Code scanner/entry |

---

### 10c. Website Flow

```
WebsiteLayout (React Router, Outlet pattern)
│
├── Navbar (logo, nav links, language toggle)
├── Reading progress bar (scroll %)
├── AnimatedDentalBg (fixed background)
│
├── /           → Home
│   ├── Hero (CMS-driven headline, CTA)
│   ├── Services section (8 service cards)
│   ├── Doctors section (doctor profiles)
│   ├── Testimonials (motion carousel)
│   ├── Clinic highlights
│   ├── Articles (education)
│   ├── FAQ (accordion)
│   ├── Gallery (before/after comparison)
│   └── CTA section
│
├── /doctors    → Doctors (directory + detail modal)
├── /services   → Services (catalog + pricing)
├── /booking    → Booking (appointment form)
├── /promotions → Promotions (promo cards)
├── /about      → About (mission, vision, team)
├── /contact    → Contact (form + map)
│
├── Footer (CMS-driven, links, contact)
└── WhatsApp floating button (sticky CTA)
```

---

### 10d. Admin Dashboard Flow

```
AdminLayout (AuthProvider, React Router)
│
├── Login Guard: if (!currentUser) → AdminLogin form
│
├── Sidebar Navigation (filtered by hasPermission):
│   ├── Dashboard      → AdminDashboard.tsx   (metrics, overview)
│   ├── Queue          → AdminQueue.tsx       (real-time queue ops)
│   ├── Appointments   → AdminAppointments.tsx (schedule, calendar)
│   ├── Patients       → AdminPatients.tsx    (patient database)
│   ├── Doctors        → AdminDoctors.tsx     (roster, schedules)
│   ├── Services       → AdminServices.tsx    (service CRUD)
│   ├── Branches       → AdminBranches.tsx    (multi-location)
│   ├── Promotions     → AdminPromotions.tsx  (promo campaigns)
│   ├── Broadcast      → AdminBroadcast.tsx   (push to patients)
│   ├── Website        → AdminWebsite.tsx     (CMS content editor)
│   ├── Reports        → AdminReports.tsx     (analytics, exports)
│   ├── Users          → AdminUsers.tsx       (user management)
│   ├── Roles          → AdminRoles.tsx       (permission matrix)
│   └── Settings       → AdminSettings.tsx    (clinic configuration)
│
└── Breadcrumb + main content area
```

---

## 11. Cross-Platform Patient Journey

This is the key value proposition — a patient can book in the mobile app, check in at the kiosk, and be managed by the admin, all linked by the OMDC code.

### Journey A: App Booking → Kiosk Check-in

```
┌──────────────────────────────────────────────────────────────────────┐
│ MOBILE APP                                                           │
│                                                                       │
│ 1. Patient books appointment                                         │
│    home → booking → doctor → schedule → confirm                       │
│                                                                       │
│ 2. registerTransaction() creates:                                     │
│    • Transaction code: OMDC-T-A18Q4Z                                 │
│    • Booking code: 7H3K9Q                                            │
│    • Member code: OMDC-M-7K3F9                                       │
│    • Status: "booked"                                                │
│    • Stored in localStorage (omdc:transactions)                      │
│                                                                       │
│ 3. Patient sees: booking code (7H3K9Q) + barcode on confirmation     │
└──────────────────────────────────────────────────────────┬────────────┘
                                                           │
              Patient arrives at clinic, approaches kiosk  │
                                                           ▼
┌──────────────────────────────────────────────────────────────────────┐
│ EKIOSK                                                               │
│                                                                       │
│ 4. welcome → "Kode Booking / Scan" (omdc-recall)                     │
│    Patient scans barcode OR types "7H3K9Q"                           │
│                                                                       │
│ 5. extractBookingCode("7H3K9Q") → lookupOmdcCode()                  │
│    → Found: transaction with status "booked"                         │
│                                                                       │
│ 6. checkInTransaction(key, "A")                                      │
│    → Assigns queue number: A019                                      │
│    → Status: "booked" → "checked-in"                                 │
│                                                                       │
│ 7. If kioskPayment enabled:                                          │
│    → payment screen → markPaid()                                     │
│    → Status: "checked-in" → "paid"                                   │
│                                                                       │
│ 8. → ticket screen: prints queue# A019 + barcode + booking code      │
└──────────────────────────────────────────────────────────┬────────────┘
                                                           │
                   Broadcast: queue update                 │
                                                           ▼
┌──────────────────────────────────────────────────────────────────────┐
│ ADMIN DASHBOARD                                                      │
│                                                                       │
│ 9. Queue management: sees A019 in waiting list                       │
│    → Call next → mark serving → mark done                            │
│    → Status: "paid" → "done"                                         │
│                                                                       │
│ 10. Broadcast notification: "Now serving A019"                       │
│     → pushBroadcast() → storage event → all open tabs               │
└──────────────────────────────────────────────────────────────────────┘
```

### Journey B: Walk-in at Kiosk

```
welcome → language → main-menu → [Booking Baru]
  → service-select → doctor-select → date-select → time-select
  → confirmation
      registerTransaction() + assignQueueNumber()
      Creates codes + queue number in one step
  → payment (if enabled)
      markPaid()
  → ticket
      Prints: queue#, barcode, booking code
```

### Journey C: New Patient Walk-in

```
welcome → language → main-menu → [Pasien Baru / New Patient]
  → new-patient (registration form: name, phone, DOB)
  → service-select → (continues as Journey B)
```

---

## 12. Authentication & RBAC

### Admin Auth Flow

```
AdminLayout mount
  │
  ├── Check localStorage (omdc_current_user)
  │   ├── Found → set currentUser, load role
  │   └── Not found → show login form
  │
  └── Login form submit
        │
        ├── Search omdc_admin_users for username match
        ├── Verify password
        ├── Store: omdc_current_user + omdc_admin_token
        └── Set currentUser, currentRole
```

### Demo Accounts

| Username | Password (env-overridable) | Role |
|----------|---------------------------|------|
| `admin` | `Omdc#2025!Sa` | Master Admin |
| `owner` | `Omdc#2025!Ow` | Owner |

### Role-Based Access Control (9 Roles)

| Role | Access Level |
|------|-------------|
| **Owner** | All 52 permissions |
| **Master Admin** | All except finance edit/approve |
| **Finance Controller** | Full finance + reports |
| **Finance Approvals** | Finance approval + reports view |
| **Marketing** | Promos, website articles, media |
| **IT Team** | Logs, errors, security (mostly read) |
| **Website Developer** | All website sections + services |
| **Apps Manager** | Mobile apps, bookings, queue, patients |
| **E-Kiosk Manager** | Kiosk management, queue, appointments |

### Permission Modules (15 categories, 52 total permissions)

```
website, appointments, queue, patients, doctors, services,
promotions, finance, reports, users, roles, it, ekiosk, apps, settings
```

Each module has granular permissions like `website.edit_hero`, `appointments.create`, `finance.approve`.

The admin sidebar filters nav items based on `hasPermission(perm)`.

---

## 13. Notification System

### Architecture

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│ Admin sends  │────▶│  broadcastStore   │────▶│  Notification   │
│ broadcast    │     │  (localStorage)   │     │  Context        │
│              │     │                   │     │  (in-memory)    │
│ pushBroadcast│     │  subscribeBroad-  │     │                 │
│ ({type,      │     │  casts(cb)        │     │  addNotification│
│  title,      │     │  fires on:        │     │  markRead(id)   │
│  body})      │     │  • storage event  │     │  markAllRead()  │
└─────────────┘     │  • custom event   │     │  dismiss(id)    │
                     └──────────────────┘     │                 │
                                               │  requestPush-  │
                                               │  Permission()  │
                                               └────────┬────────┘
                                                        │
                                          ┌─────────────┼──────────────┐
                                          ▼             ▼              ▼
                                    ┌──────────┐ ┌──────────┐ ┌────────────┐
                                    │ NotifToast│ │ Notif    │ │ OS Push    │
                                    │ (popup)  │ │ Screen   │ │ (if        │
                                    │          │ │ (list)   │ │ permitted) │
                                    └──────────┘ └──────────┘ └────────────┘
```

### Notification Types

| Type | Icon | Example |
|------|------|---------|
| `reminder` | Bell | "Appointment reminder for tomorrow" |
| `queue` | Activity | "Now serving A018, you're A019" |
| `promo` | Tag | "30% off scaling — book now!" |
| `system` | Info | "Clinic hours updated" |

### Demo Behavior

- 5 seed notifications loaded on mount (3 unread, 2 read)
- Auto-trigger: ~12s after mount, a simulated queue notification appears
- Broadcast subscription: admin pushes arrive as real-time toasts

---

## 14. CMS Architecture

### Schema (version 5, 15 sections)

| Section | Fields | Used By |
|---------|--------|---------|
| `hero` | headline, headlineAccent, subheadline, CTAs, heroImages, stats | Website |
| `services` | sectionTitle, subtitle, items[] | Website |
| `doctors` | sectionTitle, subtitle, items[] | Website |
| `clinic` | sectionTitle, description, photo, stats, address | Website |
| `promotions` | sectionTitle, subtitle, items[] | Website, Mobile |
| `articles` | sectionTitle, subtitle, items[] | Website |
| `about` | sectionTitle, mission, vision, stats | Website |
| `contact` | phone, whatsapp, email, address, mapEmbed | Website |
| `appearance` | primaryColor, accentColor, clinicName, tagline | All |
| `trust` | sectionTitle, logos[] | Website |
| `testimonials` | sectionTitle, subtitle, items[] | Website |
| `faq` | sectionTitle, subtitle, items[] | Website |
| `gallery` | sectionTitle, subtitle, items[] (before/after) | Website |
| `kioskSettings` | idleTimeoutSeconds, queuePrefix, bookingCodeCheckin, kioskPayment | Kiosk |
| `branches` | items[] (ClinicBranch) | All |

### Data Flow

```
Admin CMS Editor (AdminWebsite.tsx)
  │
  │ updateHero() / updateServices() / etc.
  ▼
CMSContext
  │
  ├──▶ localStorage (omdc_cms_content) — immediate
  │
  └──▶ Supabase (cms_content table) — async upsert
         │
         └──▶ Realtime subscription
                │
                └──▶ All other tabs/devices receive update
                       │
                       └──▶ CMSContext merges with defaults
                              (ensures new fields always exist)
```

### Schema Migration

```
On load:
  1. Read from Supabase (or localStorage fallback)
  2. Check CMS_SCHEMA_VERSION
  3. If version mismatch → wipe and reset to defaults
  4. Merge with DEFAULT_CMS_CONTENT (adds missing new fields)
```

---

## 15. Service Layer (API Readiness)

The project has a service layer (`src/services/`) that abstracts API calls. Currently, **no backend is configured** — the API client gracefully degrades to return empty responses, and the app uses mock data + localStorage instead.

### API Client (`src/services/api.ts`)

```typescript
const BASE_URL = import.meta.env.VITE_API_URL || '';

// When BASE_URL is empty, request() returns:
// { data: null, success: false, error: 'No API URL configured — using mock data' }
```

### Service Modules (Ready for Backend)

| Module | Endpoints (planned) |
|--------|-------------------|
| `appointmentsService` | list, get, create, update, cancel, confirm, today |
| `doctorsService` | list, get, update, getAvailability, setSchedule |
| `patientsService` | list, get, create, update, getHistory, addRecord |
| `queueService` | getAll, getStats, callNext, callNumber, skip, markDone, reset, addWalkIn |

### Backend Integration Path

When connecting a real backend:

1. Set `VITE_API_URL` environment variable
2. Service modules already have the right CRUD signatures
3. Replace localStorage transaction registry with API calls
4. Replace localStorage broadcast bus with WebSocket/SSE
5. Replace CMS localStorage with Supabase (already partially done)

---

## 16. Build, Deploy & Infrastructure

### Build Pipeline

```
npm run dev          → Vite dev server (port 3000, host 0.0.0.0)
npm run build        → Vite production build (dist/)
npm run preview      → Preview production build
npx tsc --noEmit     → Type checking only
```

### Vite Configuration

- **Code splitting**: Separate chunks for react-vendor, router, icons, motion
- **Tailwind**: v4 plugin integration
- **Base path**: `/dentalchain/` (GitHub Pages) or `/` (default)
- **HMR**: Configurable, can be disabled for production kiosks

### Deployment Targets

| Target | Config | Trigger |
|--------|--------|---------|
| **GitHub Pages** | `deploy-pages.yml` | Push to `main`, manual dispatch |
| **Vercel** | `vercel.json` | Auto-deploy on push (if connected) |

### GitHub Actions Workflows

```
deploy-pages.yml:
  trigger: push to main / manual / auto-merge completion
  steps: npm ci → npm run build (GITHUB_PAGES=true) → upload to Pages

auto-merge.yml:
  trigger: push to feature branch (claude/website-mobile-apps-dev-lmgp7x)
  steps: verify build → merge to main with -X theirs strategy
```

### PWA Configuration

- **manifest.json**: standalone display, portrait, start URL `./app`
- **sw.js**: Service worker for offline caching
- **Shortcuts**: Quick links to Booking and Queue screens

### Environment Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `VITE_API_URL` | Backend API URL | `''` (mock mode) |
| `VITE_ADMIN_DEFAULT_PASSWORD` | Admin seed password | `Omdc#2025!Sa` |
| `VITE_OWNER_DEFAULT_PASSWORD` | Owner seed password | `Omdc#2025!Ow` |
| `GITHUB_PAGES` | Use Pages base path | `false` |
| `DISABLE_HMR` | Disable Vite HMR | `false` |

---

## 17. Debugging & Tracing Guide

### How to Trace a User Flow

#### Trace: "Patient books and checks in"

1. **Mobile booking confirmation**
   - File: `src/pages/mobile/screens/MobileBookingConfirm.tsx`
   - Action: calls `registerTransaction()` from `src/lib/omdcTransactions.ts`
   - Creates: transaction in localStorage `omdc:transactions`
   - Verify: open DevTools → Application → localStorage → `omdc:transactions`

2. **Kiosk recall**
   - File: `src/pages/kiosk/screens/KioskOmdcRecall.tsx` or `KioskCheckin.tsx`
   - Action: calls `extractBookingCode()` → `lookupOmdcCode()` from `src/lib/omdcTransactions.ts`
   - Verify: check `lookupOmdcCode()` return value for `found: true`

3. **Check-in**
   - Action: calls `checkInTransaction(key, prefix)` from `src/lib/omdcTransactions.ts`
   - Modifies: sets `queueNumber` and `status: 'checked-in'`
   - Verify: re-read localStorage `omdc:transactions`, find updated record

4. **Queue broadcast**
   - File: `src/lib/broadcastStore.ts`
   - Action: admin calls `pushBroadcast({type: 'queue', ...})`
   - Verify: open mobile tab, check `NotificationContext` state

#### Common Debug Points

| Symptom | Check | File |
|---------|-------|------|
| Booking code not found at kiosk | localStorage `omdc:transactions` exists? Same browser? | `omdcTransactions.ts` |
| Queue number not assigned | `omdc:queueCounter` in localStorage, counter incrementing? | `omdcTransactions.ts:196` |
| CMS changes not appearing | Schema version mismatch? localStorage `omdc_cms_content` stale? | `CMSContext.tsx` |
| Admin can't see menu items | Role permissions missing? `hasPermission()` returning false? | `AuthContext.tsx` |
| Notifications not appearing | Broadcast bus subscription active? Same-tab custom event firing? | `broadcastStore.ts` |
| Kiosk idle timeout not working | `cms.kioskSettings.idleTimeoutSeconds` value? Event listeners attached? | `KioskLayout.tsx` |
| OMDC code validation fails | Check `normalize()` — O→0, I→1 applied? Checksum correct? | `omdcCode.ts` |
| Cross-tab sync not working | Both tabs in same origin? localStorage quota hit? | `broadcastStore.ts`, `omdcTransactions.ts` |

#### localStorage Inspection Checklist

Open DevTools → Application → Local Storage → current origin:

```
omdc:transactions     — Array of OmdcTransaction objects
omdc:broadcasts       — Array of BroadcastNotif objects
omdc:queueCounter     — Current queue counter (number)
omdc_cms_content      — Full CMS data object
omdc_admin_users      — Admin user accounts
omdc_current_user     — Active admin session
omdc_admin_token      — Auth token string
omdc_lang             — "id" or "en"
omdc:kiosk:a11y       — Kiosk accessibility mode
```

#### Event Tracing

To trace cross-tab events in DevTools console:

```javascript
// Watch transaction changes
window.addEventListener('omdc:transactions:update', () =>
  console.log('TXN UPDATE:', JSON.parse(localStorage.getItem('omdc:transactions')))
);

// Watch broadcast pushes
window.addEventListener('omdc:broadcasts:update', () =>
  console.log('BROADCAST:', JSON.parse(localStorage.getItem('omdc:broadcasts')))
);

// Watch cross-tab storage events
window.addEventListener('storage', (e) =>
  console.log('STORAGE:', e.key, e.newValue?.substring(0, 100))
);
```

---

## 18. Known Gaps & Recommended Actions

### Critical (Must Fix Before Production)

| # | Gap | Risk | Recommended Action |
|---|-----|------|-------------------|
| 1 | **No real backend** — all data is localStorage + mock | Data loss on clear, no multi-device sync, no security | Build REST API or use Supabase fully: transactions, appointments, patients, queue — all need server-side persistence |
| 2 | **Hardcoded Supabase credentials** in `src/lib/supabase.ts` | Credentials visible in client bundle | Move to environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`). Anon key is safe if RLS is configured, but URL should still be env-based for environment separation |
| 3 | **No real authentication** for mobile app | Anyone can access any patient's data | Implement Supabase Auth or OAuth2 for patient login (currently mock login with no server verification) |
| 4 | **Admin passwords in source/env defaults** | Known default credentials | Force password change on first login; remove defaults from source code |
| 5 | **No input sanitization** on patient forms | XSS potential if data is ever rendered elsewhere | Add validation/sanitization layer to form submissions |

### High Priority (Should Address)

| # | Gap | Impact | Recommended Action |
|---|-----|--------|-------------------|
| 6 | **No error boundaries** | One component crash takes down entire platform | Add React Error Boundaries per platform (`MobileLayout`, `KioskLayout`, `AdminLayout`, `WebsiteLayout`) |
| 7 | **No loading/error states for API layer** | Service modules return silently on failure | Add proper loading spinners, error messages, and retry logic when `VITE_API_URL` is set |
| 8 | **Queue counter never resets** | Numbers grow unbounded (A999, A1000...) | Implement daily reset logic (store last-reset date, reset to 001 at midnight or on first use of the day) |
| 9 | **No transaction cleanup** | localStorage fills up (100 record cap, but stale data persists) | Add TTL-based expiry (auto-remove transactions older than 30 days) |
| 10 | **Missing offline sync for PWA** | Service worker exists but no offline-first data strategy | Implement offline queue: store actions locally, replay when online |
| 11 | **No payment integration** | Payment screens are mock UI only | Integrate real payment gateway (QRIS via Midtrans/Xendit, bank transfer, e-wallet) |
| 12 | **No appointment conflict detection** | Two patients can book same doctor/time/date | Add server-side availability checking and optimistic locking |

### Medium Priority (Should Plan)

| # | Gap | Impact | Recommended Action |
|---|-----|--------|-------------------|
| 13 | **No test suite** | Regressions undetected | Add Vitest unit tests for `omdcCode.ts`, `omdcTransactions.ts`, `broadcastStore.ts`; Playwright E2E for booking flow |
| 14 | **No monitoring/analytics** | No visibility into production usage | Add error tracking (Sentry) and analytics (Mixpanel/PostHog) |
| 15 | **No rate limiting** on API client | Potential for spam if backend connected | Add request throttling/debounce in service layer |
| 16 | **CMS schema migration is destructive** | Version bump wipes all customizations | Build incremental migration (add new fields without losing existing data) |
| 17 | **No multi-branch queue isolation** | All branches share one queue counter | Namespace queue counter by branch ID: `omdc:queueCounter:{branchId}` |
| 18 | **No real barcode scanning** | Kiosk expects camera/scanner hardware integration | Add WebRTC camera access + barcode detection API or integrate with USB scanner HID input |
| 19 | **Telemedicine screens are stubs** | Video call and chat are UI-only | Integrate WebRTC (peer-to-peer) or a service like Twilio/Agora for real teleconsultation |
| 20 | **No data export** | Admin reports have no export functionality | Add CSV/PDF export for appointments, patients, financial reports |

### Architecture Improvements

| # | Improvement | Rationale |
|---|-------------|-----------|
| 21 | **Extract shared types to separate package** | Types are currently in `src/types/index.ts` — if backend is Node/TypeScript, share types via monorepo package |
| 22 | **Replace localStorage bus with WebSocket** | localStorage events are single-browser; WebSocket enables true multi-device real-time |
| 23 | **Add Zustand or Jotai for complex state** | Mobile/kiosk state machines could benefit from a state library vs raw useState |
| 24 | **Implement proper routing for mobile** | Replace state machine with React Router — enables deep linking, browser history, and URL sharing |
| 25 | **Add Storybook for component library** | Shared UI components (AnimatedDentalBg, OmdcBarcode, etc.) would benefit from visual documentation |

---

## 19. Component Dependency Map

### Who depends on what:

```
                        ┌──────────────┐
                        │   App.tsx    │
                        └──────┬───────┘
                               │
               ┌───────────────┼───────────────┐
               │               │               │
        ┌──────┴──────┐ ┌─────┴─────┐ ┌───────┴───────┐
        │ CMSProvider  │ │ Language   │ │ BrowserRouter │
        │             │ │ Provider   │ │               │
        └──────┬──────┘ └─────┬─────┘ └───────┬───────┘
               │              │               │
    ┌──────────┼──────────────┼──────┬─────────┼──────────┐
    │          │              │      │         │          │
┌───┴────┐ ┌──┴──────┐ ┌────┴───┐ ┌┴────────┐│   ┌──────┴───┐
│Website │ │ Mobile  │ │ Kiosk  │ │  Admin  ││   │ Fallback │
│Layout  │ │ Layout  │ │ Layout │ │ Layout  ││   │ (404→/)  │
└───┬────┘ └──┬──────┘ └────┬───┘ └┬────────┘│   └──────────┘
    │         │             │      │         │
    │    ┌────┴────┐   ┌────┴────┐ │    Uses:
    │    │ Notif   │   │ Kiosk   │ │    • AuthContext
    │    │ Provider │   │ Orient. │ │    • useCMS()
    │    └────┬────┘   │ Provider│ │    • useLanguage()
    │         │        └────┬────┘ │
    │         │             │      │
    │    ┌────┴────┐   ┌────┴────┐ ├── AdminDashboard
    │    │ 27      │   │ 15     │ ├── AdminQueue
    │    │ screens │   │ screens│ ├── AdminAppointments
    │    └─────────┘   └────────┘ ├── AdminPatients
    │                              ├── AdminDoctors
    ├── Home                       ├── AdminServices
    ├── Doctors                    ├── AdminBranches
    ├── Services                   ├── AdminPromotions
    ├── Booking                    ├── AdminBroadcast
    ├── Promotions                 ├── AdminWebsite
    ├── About                      ├── AdminReports
    └── Contact                    ├── AdminUsers
                                   ├── AdminRoles
                                   └── AdminSettings
```

### Shared Library Dependencies

```
omdcCode.ts ←── omdcTransactions.ts ←── MobileBookingConfirm
                                    ←── KioskConfirmation
                                    ←── KioskCheckin
                                    ←── KioskOmdcRecall
                                    ←── AdminQueue

broadcastStore.ts ←── NotificationContext ←── MobileLayout
                  ←── AdminBroadcast

kioskSound.ts ←── All kiosk screens (tap/select/success/error)
haptics.ts    ←── All mobile screens (light/medium/heavy/success)

mockData.ts ←── MobileHome (services, doctors)
            ←── MobileBooking (services)
            ←── MobileDoctorSelect (doctors)
            ←── KioskServiceSelect (services)
            ←── KioskDoctorSelect (doctors)
            ←── Website Home/Services/Doctors pages
            ←── AdminDashboard (appointments)
```

---

*This document reflects the architecture as of v2.9.0 (2026-06-28). Update it when major structural changes are made.*
