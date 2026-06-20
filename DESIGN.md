# OMDC Dental — Design System

> "Senyum Sehat, Percaya Diri Penuh" — Confident, warm, and clinically precise.

This document is the single source of truth for every UI decision across the OMDC system:
**Website** · **E-Kiosk** · **Mobile PWA** · **Admin CMS**

AI agents reading this file must follow every rule below exactly. Do not deviate from colors,
typography weights, spacing tokens, or component patterns without explicit instruction.

---

## 1. Core Identity

OMDC is a premium dental clinic brand. The visual system blends four influences:

| Influence | What we take |
|-----------|-------------|
| **OMDC** | Pink primary brand, dental warmth, Indonesian locale |
| **Stripe** | Precision typography, tabular figures for pricing, tight pill CTAs |
| **Linear** | 4px spacing grid, surface-tier card system, dense dark admin sidebar |
| **Figma** | Color-block storytelling, weight-as-hierarchy, pastel section panels |

The brand feeling: *a trusted clinic that feels as polished as a fintech product.*

---

## 2. Color System

### Primary Palette

```
--color-pink-primary:   #E91E8C   /* Brand pink — buttons, links, highlights */
--color-pink-light:     #FF6BB5   /* Gradient endpoint, hover states */
--color-pink-pastel:    #FFF0F8   /* Tinted backgrounds, tag chips */
--color-pink-deep:      #C2186D   /* Active/pressed states, dark text on pink */

--color-blue-accent:    #4FC3F7   /* Secondary accent — queue numbers, stats */
--color-blue-pastel:    #E0F7FD   /* Blue tinted backgrounds */
```

### Surface Ladder (Light Theme — Website & Mobile)

```
surface-0:  #FFFFFF   /* Cards, modals */
surface-1:  #FFF5F9   /* Page background — warm white with pink tint */
surface-2:  #FFF0F8   /* Section alternates, form inputs */
surface-3:  #FFE4F3   /* Hover states on pink-tinted elements */
```

### Surface Ladder (Dark Theme — Admin & Kiosk night mode)

```
dark-0:     #0D0D1A   /* Deepest background */
dark-1:     #1A1A2E   /* Admin sidebar background */
dark-2:     #16213E   /* Card surfaces in dark theme */
dark-3:     #0F3460   /* Elevated panels */
```

### Semantic Colors

```
success:    #10B981   /* Confirmed, done, active */
warning:    #F59E0B   /* Pending, attention */
danger:     #EF4444   /* Cancelled, error */
info:       #4FC3F7   /* Informational — same as blue-accent */
```

### Text Colors

```
text-primary:    #1F2937   /* Main body copy */
text-secondary:  #6B7280   /* Supporting text */
text-muted:      #9CA3AF   /* Placeholders, captions */
text-inverse:    #FFFFFF   /* On pink/dark backgrounds */
text-pink:       #E91E8C   /* Colored text emphasis */
```

**Rule (from Figma):** No mid-gray text. Use `text-primary` or `text-secondary` — never opacity tricks to create in-between grays. Hierarchy comes from weight and size, not color washing.

**Rule (from Stripe):** Any cell displaying currency or numbers uses `font-feature-settings: "tnum"` (tabular figures). This applies to pricing, queue numbers, appointment counts, and revenue stats.

---

## 3. Typography

### Typeface

**Inter** — single family across all surfaces. Variable font, loaded via Google Fonts.

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
font-feature-settings: "cv02", "cv03", "cv04", "cv11";
```

For dental pricing and queue numbers, add:
```css
font-feature-settings: "tnum", "cv02", "cv03", "cv04", "cv11";
```

### Scale (Stripe-inspired negative tracking at display, zero at body)

| Token        | Size  | Weight | Line-height | Letter-spacing | Usage |
|-------------|-------|--------|-------------|----------------|-------|
| `display-2xl` | 56px | 700 | 1.1 | -1.4px | Hero headlines |
| `display-xl`  | 40px | 700 | 1.15 | -1.0px | Page titles |
| `display-lg`  | 32px | 700 | 1.2 | -0.64px | Section headers |
| `display-md`  | 24px | 600 | 1.3 | -0.32px | Card titles, modal headers |
| `display-sm`  | 20px | 600 | 1.4 | -0.16px | Sub-section labels |
| `body-lg`     | 18px | 400 | 1.6 | 0 | Lead paragraphs |
| `body-md`     | 16px | 400 | 1.6 | 0 | Body copy |
| `body-sm`     | 14px | 400 | 1.5 | 0 | Supporting text |
| `caption`     | 12px | 500 | 1.4 | +0.2px | Labels, tags, eyebrows |
| `mono`        | 13px | 500 | 1.4 | 0 | Queue numbers (A017), MRNs, codes |

**Rule (from Stripe):** Display sizes use weight 700. Never use 400 at display scale — "at 400 the brand's clinical precision collapses."

**Rule (from Linear):** Eyebrow labels (category tags, section labels above headlines) use `caption` with `+0.4px` tracking and `uppercase` transform. Example: `LAYANAN UNGGULAN` above a section title.

---

## 4. Spacing System

**Base: 4px** (Linear's foundation)

```
space-1:   4px    /* Tight gaps: icon-to-label, inline badges */
space-2:   8px    /* Input padding vertical, badge padding */
space-3:   12px   /* Compact card inner padding */
space-4:   16px   /* Standard inner padding, button padding */
space-5:   20px   /* Section internal spacing */
space-6:   24px   /* Card padding (standard) */
space-8:   32px   /* Card padding (featured/CTA cards) */
space-10:  40px   /* Between card rows */
space-12:  48px   /* CTA banner padding */
space-16:  64px   /* Section vertical padding */
space-20:  80px   /* Large section gaps */
space-24:  96px   /* Page section separation */
```

**Rule (from Linear):** Cards use 24px padding standard, 32px on testimonials, 48px on hero/CTA banners. Never mix arbitrary pixel values — always snap to the 4px grid.

**Max content width:** 1280px centered with `mx-auto px-4 sm:px-6 lg:px-8`.

---

## 5. Border Radius

```
radius-sm:   6px    /* Tags, small badges, table rows */
radius-md:   8px    /* Inputs, small cards, admin buttons */
radius-lg:   12px   /* Standard cards */
radius-xl:   16px   /* Feature cards, modals */
radius-2xl:  20px   /* Hero cards, large panels */
radius-3xl:  24px   /* Kiosk cards, prominent CTAs */
radius-pill: 9999px /* All primary/secondary buttons (from Stripe) */
radius-full: 50%    /* Avatars, icon-only buttons, dot indicators */
```

**Rule (from Stripe):** All buttons are pill-shaped (`border-radius: 9999px`). Never use `rounded-lg` on a button.

**Rule (from Linear):** Cards use `radius-lg` (12px) or `radius-xl` (16px). The `radius-pill` is reserved exclusively for buttons and badge pills.

---

## 6. Component Patterns

### 6.1 Buttons

```tsx
// Primary — pink gradient pill (Stripe-inspired)
<button className="px-6 py-3 rounded-full text-white font-semibold text-sm
  bg-gradient-to-r from-[#E91E8C] to-[#FF6BB5]
  hover:shadow-lg hover:shadow-pink-200 hover:-translate-y-0.5
  active:scale-95 transition-all duration-200">
  Buat Janji
</button>

// Secondary — outlined pill
<button className="px-6 py-3 rounded-full font-semibold text-sm
  border-2 border-[#E91E8C] text-[#E91E8C]
  hover:bg-pink-50 active:scale-95 transition-all duration-200">
  Pelajari Lebih
</button>

// Ghost — text only
<button className="px-4 py-2 rounded-full text-sm font-medium text-gray-600
  hover:bg-gray-100 active:scale-95 transition-all duration-200">
  Batal
</button>

// Danger
<button className="px-6 py-3 rounded-full text-white font-semibold text-sm
  bg-red-500 hover:bg-red-600 active:scale-95 transition-all duration-200">
  Batalkan
</button>
```

**Sizing:**
- `sm`: `px-4 py-2 text-xs`
- `md`: `px-5 py-2.5 text-sm` (default)
- `lg`: `px-8 py-4 text-base`
- `xl`: `px-10 py-5 text-lg` (Kiosk only)

### 6.2 Cards

```tsx
// Standard card (surface-0, shadow-sm)
<div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">

// Feature card (gradient border or pink tint)
<div className="bg-white rounded-2xl shadow-sm p-6 border border-pink-100
  hover:border-pink-300 transition-all">

// Dark card (Admin / Kiosk dark mode)
<div className="rounded-2xl p-6" style={{ background: '#16213E' }}>

// CTA banner card (full gradient)
<div className="rounded-3xl p-12 text-white"
  style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5, #4FC3F7)' }}>
```

**Rule:** Cards never use box-shadow greater than `shadow-lg`. Elevation is communicated through the surface ladder (surface-0 on surface-1 background), not heavy drop shadows.

### 6.3 Color Block Sections (Figma-inspired)

Full-viewport pink or blue panel sections that interrupt the white-surface flow:

```tsx
// Pink panel section
<section className="py-24" style={{ background: 'linear-gradient(135deg, #E91E8C15, #FF6BB515)' }}>

// Deep pink hero panel
<section className="py-24 text-white"
  style={{ background: 'linear-gradient(135deg, #C2186D, #E91E8C, #FF6BB5)' }}>

// Blue accent panel
<section className="py-24" style={{ background: 'linear-gradient(135deg, #E0F7FD, #B3E5FC)' }}>

// Dark panel (for kiosk IDLE / admin hero areas)
<section className="py-24 text-white"
  style={{ background: 'linear-gradient(135deg, #1A1A2E, #16213E)' }}>
```

Each color block section must: (1) span full width, (2) have `py-24` minimum vertical padding, (3) contain only `max-w-7xl mx-auto px-4` inner container.

### 6.4 Form Inputs

```tsx
<input className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white
  text-gray-800 placeholder-gray-400 text-sm
  focus:outline-none focus:ring-2 focus:ring-[#E91E8C]/30 focus:border-[#E91E8C]
  transition-all" />
```

Always: `rounded-xl` (not pill), `ring-2` on focus with `30%` opacity pink ring, `border` not shadow for resting state.

### 6.5 Badges & Tags

```tsx
// Service/category tag
<span className="px-3 py-1 rounded-full text-xs font-medium bg-[#FFF0F8] text-[#E91E8C]">
  Ortodonti
</span>

// Status badge: confirmed
<span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 flex items-center gap-1">
  <CheckCircle2 size={12} /> Dikonfirmasi
</span>

// Queue number (always tabular mono)
<span className="font-mono font-bold tabular-nums text-4xl" style={{ color: '#E91E8C' }}>
  A017
</span>
```

### 6.6 Stats Cards (KPI style — Stripe + Linear blend)

```tsx
<div className="bg-white rounded-2xl p-6 shadow-sm">
  {/* Eyebrow — Linear style */}
  <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
    Pasien Hari Ini
  </div>
  {/* Value — tabular, large */}
  <div className="text-4xl font-bold tabular-nums" style={{ color: '#E91E8C' }}>
    48
  </div>
  {/* Delta */}
  <div className="flex items-center gap-1 mt-2 text-sm text-green-500">
    <TrendingUp size={14} /> +12% dari kemarin
  </div>
</div>
```

### 6.7 Pricing Display (Stripe tabular rules)

```tsx
// Always use tabular figures for prices
<div className="font-bold tabular-nums" style={{ fontFeatureSettings: '"tnum"' }}>
  Rp 350.000
</div>

// Price range
<div className="tabular-nums">
  <span className="text-2xl font-bold text-[#E91E8C]">Rp 200.000</span>
  <span className="text-gray-400 text-sm"> – Rp 500.000</span>
</div>
```

---

## 7. Motion & Animation

**Library:** `motion/react` (Framer Motion v12+)

### Entry animations (stagger children)
```tsx
// Parent container
<motion.div
  initial="hidden"
  animate="visible"
  variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
>
  {/* Child items */}
  <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}>
```

### Page transitions
```tsx
<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -8 }}
  transition={{ duration: 0.25 }}
>
```

### Kiosk screen transitions (slide)
```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={step}
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -40 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
```

### Hover micro-interactions
```tsx
// Cards — lift
hover:shadow-md hover:-translate-y-1 transition-all duration-200

// Buttons — press
active:scale-95 transition-transform duration-100

// Icons — spin/pulse
className="animate-spin"   // Loading
className="animate-pulse"  // Queue waiting
className="animate-bounce" // Attention prompt
```

**Rule (from Linear):** No atmospheric gradient animations. No scroll-triggered parallax. Motion is purposeful: it confirms state changes or guides eye movement — not decoration.

---

## 8. Icon System

**Library:** `lucide-react` (current version)

### Icon sizing
```
icon-xs:  12px  /* Inside badges, table cells */
icon-sm:  14px  /* Button icons, inline */
icon-md:  16px  /* Default companion icons */
icon-lg:  20px  /* Sidebar nav items */
icon-xl:  24px  /* Feature icons, section icons */
icon-2xl: 32px  /* Hero icons, kiosk buttons */
icon-3xl: 48px  /* Empty states, success confirmations */
```

### Icon + container pattern (Stripe-inspired)
```tsx
<div className="w-12 h-12 rounded-2xl flex items-center justify-center"
  style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)' }}>
  <Stethoscope size={24} className="text-white" />
</div>
```

Never use raw icons on colored backgrounds without a container. Always wrap in a rounded container with appropriate size.

---

## 9. Layout System

### Website (`/`)
- Max-width: `max-w-7xl` (1280px) with `mx-auto px-4 sm:px-6 lg:px-8`
- Sections alternate: white → pink-tint → white → dark-panel
- Grid: 12-column base, components snap to `grid-cols-2`, `grid-cols-3`, `grid-cols-4`
- Navbar: sticky, `h-16`, white bg with `shadow-sm` on scroll

### E-Kiosk (`/kiosk`)
- Full viewport: `min-h-screen` with gradient background
- No max-width constraint — kiosk uses full 1080px width
- Touch targets: minimum `80px × 80px` for all interactive elements
- Font scale: bump all sizes up 1.5× (kiosk is viewed at distance)
- Grid: max `4×2` for service/option buttons

### Mobile PWA (`/app`)
- Max-width: `max-w-sm` (384px) centered, or full-width on small screens
- Bottom navigation: fixed, `h-16`, white bg, pink active indicators
- Safe area: `pb-safe` (iOS home indicator clearance)
- Cards: full-width minus `mx-4` margin

### Admin CMS (`/admin`)
- Sidebar: fixed width 280px (or 72px collapsed), `bg-[#1A1A2E]`
- Main area: `flex-1`, `bg-[#F8FAFC]`
- Content max-width: none (fills available space)
- Topbar: `h-16`, white, `border-b border-gray-100`

---

## 10. Module-Specific Rules

### Website
- Every section must have an eyebrow label (12px, uppercase, tracked, gray-400)
- Hero section must include the gradient mesh: `background: linear-gradient(135deg, #E91E8C, #FF6BB5, #4FC3F7)`
- Doctor cards: always show photo placeholder, specialty tag, rating (⭐4.9), consult fee
- Service cards: always show icon container (pink gradient), price range with tabular figures, duration badge

### E-Kiosk
- Welcome screen: animated pulse on the "Sentuh untuk Mulai" prompt
- All screens: live clock in top-right (`HH:MM:SS`, monospace)
- Queue ticket: number uses `text-8xl font-bold tabular-nums text-[#E91E8C]`
- Back button: always bottom-left, `text-white/70`, arrow icon
- Language toggle: always visible on welcome + menu screens

### Mobile PWA
- Bottom nav: 5 icons — Home, Booking, Queue, Records, Profile
- Onboarding: 3 slides, pink gradient hero, progress dots, swipe gesture
- Appointment cards: pink gradient left border (`border-l-4 border-[#E91E8C]`)
- Notification dot: `w-2 h-2 bg-[#E91E8C] rounded-full` on nav icon

### Admin CMS
- Sidebar active state: `background: #E91E8C` (not a border indicator — full fill)
- All data tables: `text-sm`, alternating `hover:bg-gray-50` rows
- Status badges always use `STATUS_CONFIG` map — never inline color strings
- Dashboard stat cards: eyebrow + large tabular number + delta percentage
- Every page must have a primary action button (top-right, pink gradient pill)

---

## 11. Indonesian Locale Conventions

- **Currency:** `Rp 350.000` (period as thousands separator, no decimal for whole amounts)
- **Date:** `20 Juni 2026` (day month-name year, no comma)
- **Time:** `09:30` (24-hour, colon separator)
- **Queue numbers:** `A001` format — letter prefix + 3-digit padded number
- **Phone:** `0812-3456-7890` (hyphen-separated groups)
- **All UI labels** in Bahasa Indonesia (with English in kiosk language-toggle mode)

---

## 12. Accessibility Rules

- Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text (WCAG AA)
- All pink text on white must be `#C2186D` (deep pink) or darker — never `#E91E8C` on white
- Focus rings: always visible, `ring-2 ring-[#E91E8C]/50`
- All images: meaningful `alt` text in Bahasa Indonesia
- Kiosk touch targets: minimum 80×80px
- Mobile tap targets: minimum 44×44px

---

## 13. Do Not Rules

- **Do not** use `#E91E8C` as a text color on white backgrounds (fails contrast — use `#C2186D`)
- **Do not** use arbitrary pixel values — always use the 4px spacing grid
- **Do not** apply `font-weight: 400` to headlines (use 600 or 700)
- **Do not** mix `rounded-lg` and `rounded-full` on buttons — all buttons are `rounded-full`
- **Do not** use `box-shadow` larger than `shadow-lg`
- **Do not** animate decoratively — every animation must confirm a state change or direct attention
- **Do not** use gray as a background color — always use the surface ladder (white or pink-tinted)
- **Do not** display prices without tabular figures (`font-feature-settings: "tnum"`)
- **Do not** skip the eyebrow label on any major section heading
- **Do not** create new color values — use only the tokens defined in §2

---

## 14. File & Component References

```
src/
├── index.css              # @theme tokens (Tailwind v4)
├── types/index.ts         # All TypeScript types
├── data/mockData.ts       # Seed data (doctors, services, promos, etc.)
├── components/
│   ├── ui/
│   │   ├── Button.tsx     # Pill button variants
│   │   └── OmdcLogo.tsx   # SVG tooth logo (sm/md/lg/xl, default/white/dark)
│   ├── website/
│   │   ├── Navbar.tsx     # Sticky navbar with mobile drawer
│   │   └── Footer.tsx     # Footer with WhatsApp CTA
│   ├── kiosk/
│   │   └── KioskHeader.tsx # Live clock, back button
│   ├── mobile/
│   │   ├── BottomNav.tsx  # 5-tab nav
│   │   └── MobileHeader.tsx
│   └── admin/             # (no shared components yet)
├── pages/
│   ├── website/           # Home, Doctors, Services, Booking, Promotions, About, Contact
│   ├── kiosk/             # KioskLayout + 14 screens
│   ├── mobile/            # MobileLayout + 13 screens
│   └── admin/             # AdminLayout + 9 pages
└── services/              # API service layer (api, appointments, queue, patients, doctors)
```

**Brand assets:**
- Logo: `OmdcLogo` component — tooth SVG with pink gradient
- Favicon: `public/icons/favicon.svg` — same tooth, 32×32
- PWA manifest: `public/manifest.json`

---

## 15. Quick Reference Cheatsheet

```
PRIMARY CTA:     bg-gradient-to-r from-[#E91E8C] to-[#FF6BB5] rounded-full text-white font-semibold
SECONDARY CTA:   border-2 border-[#E91E8C] text-[#E91E8C] rounded-full font-semibold
PAGE BG:         bg-[#FFF5F9]
CARD:            bg-white rounded-2xl shadow-sm p-6
SECTION HEADING: text-3xl font-bold text-gray-800 tracking-tight
EYEBROW:         text-xs font-semibold uppercase tracking-widest text-gray-400
PINK TEXT:       text-[#C2186D] font-semibold   (not #E91E8C on white!)
QUEUE NUMBER:    font-mono font-bold tabular-nums text-[#E91E8C]
PRICE:           font-bold tabular-nums (fontFeatureSettings: '"tnum"')
STATUS OK:       bg-green-50 text-green-700 rounded-full px-2.5 py-1 text-xs font-medium
STATUS WARN:     bg-amber-50 text-amber-700 rounded-full px-2.5 py-1 text-xs font-medium
STATUS ERR:      bg-red-50 text-red-600 rounded-full px-2.5 py-1 text-xs font-medium
ADMIN SIDEBAR:   bg-[#1A1A2E] text-white
ADMIN ACTIVE:    bg-[#E91E8C] text-white rounded-xl
INPUT:           rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#E91E8C]/30
ICON CONTAINER:  w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E91E8C] to-[#FF6BB5]
```
