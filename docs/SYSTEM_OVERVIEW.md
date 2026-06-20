# OMDC Dental — System Overview

> "Senyum Sehat, Percaya Diri Penuh"

## 1. System Architecture

OMDC Dental is a **single-repository, multi-surface** dental clinic management system built as a React SPA. All three modules share one codebase and are differentiated by route prefix.

```
┌─────────────────────────────────────────────────────────┐
│                   React SPA (Vite)                       │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Website    │  │   E-Kiosk    │  │  Mobile App  │  │
│  │  / (root)    │  │   /kiosk     │  │    /app      │  │
│  │              │  │              │  │              │  │
│  │ Public site  │  │ Touchscreen  │  │ PWA / APK    │  │
│  │ + booking    │  │ terminal     │  │ for patients │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │              Admin CMS  /admin                    │   │
│  │   Queue mgmt · Appointments · Patients · Reports  │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │           Service Layer  src/services/            │   │
│  │   api.ts (real) ←→ mock.ts (dev fallback)        │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Module Responsibilities

| Module | Path | Audience | Key Features |
|--------|------|----------|--------------|
| Website | `/` | Public / patients | Marketing, online booking, doctor profiles |
| E-Kiosk | `/kiosk` | In-clinic visitors | Self-service queue & appointment terminal |
| Mobile App | `/app` | Registered patients | PWA dashboard, booking, queue tracking |
| Admin CMS | `/admin` | Clinic staff | Queue ops, appointment CRUD, patient records |

---

## 2. Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| UI Framework | React | 19 |
| Language | TypeScript | 5+ |
| Build Tool | Vite | 6 |
| Styling | Tailwind CSS | v4 |
| Routing | React Router | v6 |
| Animation | Motion (Framer Motion) | latest |
| Icons | Lucide React | latest |
| PWA | vite-plugin-pwa | latest |
| Mobile (APK) | Capacitor | latest |
| Package Manager | npm | — |

### Brand Tokens

| Token | Value |
|-------|-------|
| Primary Pink | `#E91E8C` |
| Pink Light | `#FF6BB5` |
| Blue Accent | `#4FC3F7` |
| Background | `#FFF5F9` |
| Font | Inter |

---

## 3. Directory Structure

```
2kang/
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service worker (generated)
│   ├── icon-72.png
│   ├── icon-192.png
│   └── icon-512.png
│
├── src/
│   ├── main.tsx               # App entry point
│   ├── App.tsx                # Root router
│   ├── vite-env.d.ts
│   │
│   ├── types/
│   │   └── index.ts           # Doctor, Service, Appointment, KioskState, etc.
│   │
│   ├── data/
│   │   └── mockData.ts        # Mock doctors, services, promotions, time slots
│   │
│   ├── services/
│   │   ├── api.ts             # Real API client (uses VITE_API_URL)
│   │   └── mock.ts            # Mock service (fallback when API URL is empty)
│   │
│   ├── components/            # Shared UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── OmdcLogo.tsx
│   │   └── PWAInstallBanner.tsx
│   │
│   ├── website/               # Module: Public website
│   │   ├── WebsiteLayout.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── DoctorsPage.tsx
│   │   │   ├── DoctorDetailPage.tsx
│   │   │   ├── ServicesPage.tsx
│   │   │   ├── BookingPage.tsx
│   │   │   ├── PromotionsPage.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   └── ContactPage.tsx
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── ServicesSection.tsx
│   │       ├── DoctorsSection.tsx
│   │       ├── PromotionsSection.tsx
│   │       └── TestimonialsSection.tsx
│   │
│   ├── kiosk/                 # Module: E-Kiosk
│   │   ├── KioskApp.tsx       # State machine shell
│   │   └── screens/
│   │       ├── WelcomeScreen.tsx
│   │       ├── LanguageScreen.tsx
│   │       ├── MainMenuScreen.tsx
│   │       ├── ServiceSelectScreen.tsx
│   │       ├── DoctorSelectScreen.tsx
│   │       ├── DateSelectScreen.tsx
│   │       ├── TimeSelectScreen.tsx
│   │       ├── ConfirmationScreen.tsx
│   │       ├── PaymentScreen.tsx
│   │       ├── TicketScreen.tsx
│   │       ├── QueueDisplayScreen.tsx
│   │       ├── CheckInScreen.tsx
│   │       ├── NewPatientScreen.tsx
│   │       └── InfoPromoScreen.tsx
│   │
│   ├── mobile/                # Module: Mobile App (PWA)
│   │   ├── MobileApp.tsx      # Mobile router + bottom nav
│   │   └── screens/
│   │       ├── OnboardingScreen.tsx
│   │       ├── LoginScreen.tsx
│   │       ├── RegisterScreen.tsx
│   │       ├── HomeScreen.tsx
│   │       ├── BookingScreen.tsx
│   │       ├── PaymentScreen.tsx
│   │       ├── QueueScreen.tsx
│   │       ├── ProfileScreen.tsx
│   │       ├── RecordsScreen.tsx
│   │       ├── NotificationsScreen.tsx
│   │       └── ChatScreen.tsx
│   │
│   └── admin/                 # Module: Admin CMS
│       ├── AdminApp.tsx       # Admin router + sidebar
│       └── pages/
│           ├── DashboardPage.tsx
│           ├── QueuePage.tsx
│           ├── AppointmentsPage.tsx
│           ├── PatientsPage.tsx
│           ├── ReportsPage.tsx
│           └── SettingsPage.tsx
│
├── docs/
│   ├── SYSTEM_OVERVIEW.md     # This file
│   ├── API_INTEGRATION.md
│   ├── ADMIN_GUIDE.md
│   ├── DEPLOYMENT.md
│   └── UI_AUDIT.md
│
├── .env.example               # Environment variable template
├── .env                       # Local env (git-ignored)
├── vercel.json                # Vercel deployment config
├── capacitor.config.ts        # Capacitor mobile config
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── PHASES.md
└── index.html
```

---

## 4. Route Map

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `HomePage` | Marketing landing page |
| `/doctors` | `DoctorsPage` | Doctor listing with specialty filter |
| `/doctors/:id` | `DoctorDetailPage` | Individual doctor profile |
| `/services` | `ServicesPage` | All 8 dental services |
| `/booking` | `BookingPage` | Online appointment booking (multi-step) |
| `/promotions` | `PromotionsPage` | Active promotions & discounts |
| `/about` | `AboutPage` | Clinic history & team |
| `/contact` | `ContactPage` | Location, hours, contact form |
| `/kiosk` | `KioskApp` | E-Kiosk fullscreen terminal |
| `/app` | `MobileApp` | Mobile PWA home |
| `/app/booking` | `BookingScreen` | Mobile booking flow |
| `/app/queue` | `QueueScreen` | Live queue tracking |
| `/app/profile` | `ProfileScreen` | Patient profile |
| `/app/records` | `RecordsScreen` | Medical records |
| `/app/notifications` | `NotificationsScreen` | Notifications |
| `/app/chat` | `ChatScreen` | Chat support |
| `/admin` | `AdminApp` | Admin CMS dashboard |
| `/admin/queue` | `QueuePage` | Queue management |
| `/admin/appointments` | `AppointmentsPage` | Appointment CRUD |
| `/admin/patients` | `PatientsPage` | Patient records |
| `/admin/reports` | `ReportsPage` | Analytics & reports |
| `/admin/settings` | `SettingsPage` | System settings |

---

## 5. Running Locally

### Prerequisites

- Node.js 18+
- npm 9+

### Install & Start

```bash
# Clone the repo
git clone <repo-url>
cd 2kang

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start dev server
npm run dev
```

The dev server starts at `http://localhost:5173`.

### Module URLs (dev)

| Module | URL |
|--------|-----|
| Website | http://localhost:5173/ |
| E-Kiosk | http://localhost:5173/kiosk |
| Mobile App | http://localhost:5173/app |
| Admin CMS | http://localhost:5173/admin |

### Build for Production

```bash
npm run build
npm run preview   # Preview production build locally
```

---

## 6. Environment Setup

Copy `.env.example` to `.env` and configure as needed.

### Development (Mock Data)

Leave `VITE_API_URL` empty. The service layer automatically falls back to `src/services/mock.ts`, which returns realistic in-memory data — no backend required.

```env
VITE_API_URL=
```

### Development with Real Backend

```env
VITE_API_URL=http://localhost:3000/api
```

### Production

```env
VITE_API_URL=https://api.omdcdental.com/v1
VITE_GA_ID=G-XXXXXXXXXX
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx
VITE_GOOGLE_MAPS_KEY=AIzaXXXXXX
VITE_WA_NUMBER=6221123456789
```

See `docs/API_INTEGRATION.md` for the full API reference and `docs/DEPLOYMENT.md` for deployment instructions.
