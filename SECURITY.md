# Security Notes — OMDC Dental App

## Audit Status (2026-06-25)

Full security audit completed. All CRITICAL and HIGH issues resolved. See findings below.

---

## Fixed Issues

### CRITICAL (resolved)
- **Supabase keys removed from source** — Keys now loaded from `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` env vars. If you see the old key in git history, **rotate it immediately** in Supabase → Settings → API → Regenerate.
- **Passwords no longer stored in localStorage** — `AuthContext` now strips passwords before any persistence. Users list stored in `localStorage` contains only non-sensitive fields.
- **Session uses `sessionStorage`** — Session token clears automatically on tab/browser close.

### HIGH (resolved)
- **Route-level permission enforcement** — `AdminLayout` now wraps permission-gated routes in a `<Guarded>` component; direct URL access is denied without the required permission.
- **Iframe src validation** — `Contact.tsx` validates `mapEmbed` against `google.com/maps/` regex before rendering; also adds `sandbox` attribute.
- **Security headers upgraded** — `vercel.json` now includes `Content-Security-Policy`, `Strict-Transport-Security`, and `Permissions-Policy`.

### MEDIUM (resolved)
- **Login rate limiting** — Max 5 failed attempts per username → 15-minute lockout (in-memory, resets on server restart).
- **Idle session timeout** — 30-minute inactivity auto-logout via activity listeners (`mousemove`, `keydown`, `touchstart`).
- **Image upload validation** — `uploadImage()` now rejects non-image file types and files over 5 MB.

---

## Remaining / Production Checklist

### Authentication (replace before go-live)
- [ ] **Replace demo auth** with real backend: Supabase Auth (`supabase.auth.signInWithPassword`) or dedicated auth service
- [ ] Use `httpOnly` cookies for session tokens (JS-inaccessible, XSS-safe)
- [ ] Hash passwords with bcrypt/argon2 server-side — never compare plain-text
- [ ] Force password change on first login for seeded accounts
- [ ] Add email verification and password reset flow

### Supabase RLS (Row Level Security)
- [ ] Enable RLS on **every** table in Supabase dashboard
- [ ] Use `auth.uid()` in policies, not manual user IDs
- [ ] Example policies:
  ```sql
  -- Only authenticated users can read cms_content
  CREATE POLICY "Authenticated read" ON cms_content
    FOR SELECT USING (auth.role() = 'authenticated');

  -- Only service-role (backend) can write
  CREATE POLICY "Service write only" ON cms_content
    FOR ALL USING (auth.role() = 'service_role');
  ```
- [ ] Audit storage bucket permissions: ensure `uploads` bucket is private or scoped to authenticated users

### SQL / Supabase
- [ ] All queries already use Supabase client (parameterized) — no raw SQL injection risk
- [ ] Review `upsert` calls in `CMSContext` — add conflict handling for concurrent edits
- [ ] Never use `service_role` key in client-side code

### Forms / Input Validation
- [ ] Add server-side validation when backend is live (current client-side validation is bypass-able)
- [ ] Add CSRF tokens when real form submissions are wired up
- [ ] Rate-limit form submission endpoints (contact, booking)

### Environment Variables
- [ ] Copy `.env.example` → `.env.local` and fill in real values
- [ ] Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel/Netlify environment settings
- [ ] **Never** put `service_role` key in any client-side env var (only on server)
- [ ] Rotate the old hardcoded Supabase key (previously in `src/lib/supabase.ts`)

### Headers / CSP
- [ ] Test CSP in report-only mode first: `Content-Security-Policy-Report-Only`
- [ ] Tighten `unsafe-inline` for scripts once dynamic styles are migrated to CSS modules
- [ ] Add `report-uri` directive to collect CSP violation reports

---

## Authentication Flow (Current — Demo)

```
Login form → AuthContext.login()
  → rate-limit check (5 attempts / 15 min lockout)
  → compare against DEFAULT_USERS (in-memory, passwords never persisted)
  → on success: strip password → save to sessionStorage → set React state
  → idle timer starts (30 min inactivity → auto-logout)
  → on logout: clearSession() removes sessionStorage + any legacy localStorage keys
```

## Reporting a Vulnerability

Open a private GitHub issue or email the repository owner directly. Do not disclose security issues publicly.
