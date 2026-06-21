# OMDC Dental App — Codebase Guide

## Project Overview

**OMDC Dental** is a multi-platform dental clinic management suite built with React 19 + TypeScript + Vite 6 + Tailwind CSS v4. It comprises three distinct frontends sharing a single codebase:

| Platform | Route | Description |
|---|---|---|
| **Mobile App** | `/mobile` or `/app` | Patient-facing mobile PWA |
| **eKiosk** | `/kiosk` | Touchscreen check-in terminal (1024×768 landscape) |
| **Website** | `/` | Public marketing site + booking |
| **Admin** | `/admin` | Internal clinic dashboard |

## Tech Stack

- **Framework**: React 19 + TypeScript strict
- **Build**: Vite 6
- **Styling**: Tailwind CSS v4 (utility classes) + inline `style` props for dynamic values
- **Animation**: `motion/react` (Framer Motion v12) — `motion.div`, `AnimatePresence`, spring transitions
- **Icons**: `lucide-react`
- **Types**: `@types/react@^19`, `@types/react-dom@^19`

## Design System

### Brand Colors
```
PINK  #E91E8C   — primary CTA, accents
ROSE  #FF6BB5   — gradient pair with PINK
AQUA  #06B6D4   — secondary accent
DARK  #0D1421   — primary text
```

### Signature Elements (apply to EVERY screen)
- **3px top strip**: `linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)` — positioned `absolute top-0 left-0 right-0 height:3px`
- **No blob/radial-gradient backgrounds** anywhere — use `AnimatedDentalBg` instead
- **No dark or vivid full-screen pink** backgrounds — light/white theme throughout
- Buttons: `border-radius: 14–18px`, gradient pink primary, white secondary with pink border

### Shared Components
| Component | Path | Usage |
|---|---|---|
| `AnimatedDentalBg` | `src/components/ui/AnimatedDentalBg.tsx` | Floating dental geometry bg (size: `'lg'` / `'sm'`) |
| `OmdcLogo` | `src/components/ui/OmdcLogo.tsx` | Pink heart-tooth + DENTAL wordmark |
| `DentalServiceIcon` | `src/components/mobile/DentalServiceIcon.tsx` | Per-service SVG icons + bezel container |
| `Skeleton` / `SkeletonText` | `src/components/ui/Skeleton.tsx` | Loading placeholders |
| `CountUp` | `src/components/ui/CountUp.tsx` | Scroll-triggered number animation |

### Service Icon Palette (`DentalServiceIcon.tsx`)
```ts
SERVICE_GRADIENTS[i]  // per-service gradient string
SERVICE_SHADOWS[i]    // per-service shadow color
<DentalServiceIcon id="s1" size={24} />   // s1..s8
<ServiceIconBezel gradient={...} shadowColor={...}>...</ServiceIconBezel>
```

## Mobile App Architecture

### Screen Flow (spec: SLICING PER MENU 1/10)

```
onboarding (5 slides)
  └─ login
      ├─ forgot-password
      └─ register
            └─ otp
                  └─ create-pin
                        └─ home ─────────────── bottom nav
                            ├─ booking
                            │    └─ booking-doctor
                            │         └─ booking-schedule
                            │               └─ booking-confirm
                            │                     └─ booking-payment
                            ├─ queue
                            ├─ profile
                            ├─ medical
                            ├─ notifications
                            ├─ history
                            ├─ family
                            └─ loyalty
```

### State (`MobileState`)
```ts
interface MobileState {
  screen: MobileScreen;
  user?: MobileUser;
  isLoggedIn: boolean;
  selectedService?: Service;
  selectedDoctor?: Doctor;
  selectedDate?: string;
  selectedTime?: string;
  currentQueue?: string;
  onboardingStep: number;      // 0–4 (5 slides)
  tcAccepted?: boolean;
  selectedTeeth?: number[];    // FDI tooth numbers from Odontogram
}
```

### Key Mobile Screens

| Screen | File | Notes |
|---|---|---|
| Onboarding | `MobileOnboarding.tsx` | 5 illustrated slides + dot nav + progress bar |
| Login | `MobileLogin.tsx` | Phone/email + password, Google/Apple social |
| Register | `MobileRegister.tsx` | Full registration form → navigates to OTP |
| OTP | `MobileOTP.tsx` | 6-box digit entry, 60s countdown, auto-focus |
| Create PIN | `MobileCreatePin.tsx` | 6-digit PIN numpad, 2-phase (create + confirm) |
| Forgot Password | `MobileForgotPassword.tsx` | Email input → send reset link |
| Home | `MobileHome.tsx` | Mesh gradient hero, service grid, doctor cards |
| Booking | `MobileBooking.tsx` | Tooth chart accordion + service list with DentalServiceIcon |
| Doctor Select | `MobileDoctorSelect.tsx` | Available/unavailable doctor cards |
| Schedule | `MobileSchedule.tsx` | Date + time slot picker |
| Queue | `MobileQueue.tsx` | Real-time queue tracker with broadcast bus |
| Loyalty | `MobileLoyalty.tsx` | Points, tier progress, rewards redemption |
| Family | `MobileFamily.tsx` | Multi-member management, bottom-sheet add/edit |

### UX Rules
- Selecting a service on Home goes **directly** to `booking-doctor` (skips booking service re-picker)
- Bottom nav hidden on: `onboarding`, `login`, `register`, `otp`, `create-pin`, `forgot-password`, all `booking-*`
- `haptic()` on every interactive tap

## Notification System

```ts
// src/context/NotificationContext.tsx
const { notifications, unreadCount, markRead, requestPushPermission } = useNotifications();

// src/lib/broadcastStore.ts — cross-tab/cross-component bus
pushBroadcast({ type, title, body })
subscribeBroadcasts(callback)
```

## eKiosk Architecture

- Landscape 1024×768 fixed viewport
- Sound: `kioskSound('tap'|'select'|'success'|'error')` — Web Audio API
- Language toggle: ID/EN on every screen
- Screens: `main-menu → service → doctor → schedule → patient-info → confirmation → payment → ticket → queue-display`

## Data / Mock

All data lives in `src/data/mockData.ts`:
- `SERVICES` — 8 dental services (s1..s8), each with `priceMin`, `priceMax`, `duration`
- `DOCTORS` — availability, schedule, rating, reviewCount
- `PROMOTIONS` — discount cards
- `SAMPLE_APPOINTMENTS` — pre-seeded queue data

## Development

```bash
npm run dev        # Start dev server
npm run build      # Production build
npx tsc --noEmit   # Type check only
```

## Versioning

`src/version.ts`:
```ts
export const APP_VERSION = '2.5.0';
export const APP_BUILD_DATE = '2026-06-21';
```

## Design Rules (MUST follow — no exceptions)

1. **No radial-gradient blobs** anywhere in backgrounds
2. **No dark/vivid full-screen pink gradients** — light theme only
3. **Every screen** has the 3px `linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)` strip at top
4. **Named exports** for all screens and components (no `export default` on screens)
5. **Pink primary** `#E91E8C` only — never substitute with other pinks
6. **Illustrations** use inline SVG — no external 3D asset dependencies

## Git / Deploy

- Feature branch: `claude/website-mobile-apps-dev-lmgp7x`
- GitHub Pages auto-deploys on merge to `main` via `deploy-pages.yml`
- Repository: `roollaanndd/2kang`
