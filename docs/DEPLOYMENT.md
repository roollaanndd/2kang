# OMDC Dental — Deployment Guide

## Prerequisites

- Node.js 18+
- npm 9+
- Git

---

## Build

```bash
# Install dependencies
npm install

# Create production build
npm run build
```

Output is written to `dist/`. The build includes:
- Minified JS/CSS bundles
- PWA service worker (`sw.js`)
- `manifest.json`
- All static assets with content-hash filenames

### Preview Production Build Locally

```bash
npm run preview
# Opens at http://localhost:4173
```

---

## Vercel Deployment

Vercel is the recommended hosting platform for this project. SPA routing is pre-configured in `vercel.json`.

### Steps

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your repository

3. **Configure Build Settings** (Vercel usually auto-detects Vite)

   | Setting | Value |
   |---------|-------|
   | Framework Preset | Vite |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install` |

4. **Set Environment Variables**

   In the Vercel dashboard under Settings > Environment Variables, add:

   | Key | Value | Environment |
   |-----|-------|-------------|
   | `VITE_API_URL` | `https://api.omdcdental.com/v1` | Production |
   | `VITE_GA_ID` | `G-XXXXXXXXXX` | Production |
   | `VITE_SENTRY_DSN` | `https://xxx@sentry.io/xxx` | Production |
   | `VITE_GOOGLE_MAPS_KEY` | `AIzaXXXXXX` | Production |
   | `VITE_WA_NUMBER` | `6221123456789` | Production |

5. **Deploy**

   Click "Deploy". Vercel builds and deploys. Subsequent pushes to `main` trigger automatic redeployments.

### Custom Domain

In the Vercel dashboard: Settings > Domains > Add > Enter `omdcdental.com`. Follow DNS configuration instructions.

---

## Netlify Deployment

### Option A: Drag & Drop

1. Run `npm run build`
2. Go to [app.netlify.com](https://app.netlify.com)
3. Drag the `dist/` folder into the deploy dropzone

### Option B: Git Integration

1. Go to [app.netlify.com/start](https://app.netlify.com/start)
2. Connect GitHub and select the repository
3. Configure:

   | Setting | Value |
   |---------|-------|
   | Build Command | `npm run build` |
   | Publish Directory | `dist` |

4. Add environment variables under Site Settings > Environment Variables (same keys as Vercel above).

### Netlify Redirects

Create `public/_redirects` with:

```
/*  /index.html  200
```

This handles SPA client-side routing. (The `vercel.json` rewrites cover Vercel; `_redirects` is Netlify's equivalent.)

---

## Docker Deployment

### Dockerfile

Create a `Dockerfile` at the project root:

```dockerfile
# ---- Build stage ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_API_URL
ARG VITE_GA_ID
ARG VITE_SENTRY_DSN
ARG VITE_GOOGLE_MAPS_KEY
ARG VITE_WA_NUMBER
RUN npm run build

# ---- Serve stage ----
FROM nginx:1.25-alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html

# SPA fallback config
RUN printf 'server {\n\
    listen 80;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
    location /assets/ {\n\
        expires 1y;\n\
        add_header Cache-Control "public, immutable";\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Build & Run Docker Image

```bash
# Build image (pass env vars as build args)
docker build \
  --build-arg VITE_API_URL=https://api.omdcdental.com/v1 \
  --build-arg VITE_WA_NUMBER=6221123456789 \
  -t omdc-dental:latest .

# Run container
docker run -p 8080:80 omdc-dental:latest
# App available at http://localhost:8080
```

### Docker Compose (with API backend)

```yaml
# docker-compose.yml
version: '3.9'
services:
  frontend:
    build:
      context: .
      args:
        VITE_API_URL: http://backend:3000/api
    ports:
      - "80:80"
    depends_on:
      - backend

  backend:
    image: omdc-backend:latest   # your backend image
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://user:pass@db:5432/omdc
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    volumes:
      - pg_data:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: omdc

volumes:
  pg_data:
```

```bash
docker compose up -d
```

---

## Environment Variables for Production

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | Yes (for real data) | Backend REST API base URL. Leave empty to use mock data. |
| `VITE_GA_ID` | Optional | Google Analytics 4 Measurement ID |
| `VITE_SENTRY_DSN` | Optional | Sentry DSN for error tracking |
| `VITE_GOOGLE_MAPS_KEY` | Optional | Google Maps API key for contact page |
| `VITE_WA_NUMBER` | Optional | WhatsApp Business number (digits only, e.g. `6221123456789`) |

> All `VITE_*` variables are baked into the JS bundle at build time. Never put secrets (database passwords, private keys) in `VITE_*` variables.

---

## PWA Setup for Production

The PWA is configured via `vite.config.ts` using `vite-plugin-pwa`. No extra steps are needed for Vercel or Netlify — the service worker and manifest are included in the `dist/` output.

### Verifying PWA in Production

1. Open Chrome DevTools > Application > Service Workers — status should be "activated and running".
2. Application > Manifest — should display OMDC Dental name, icons, and theme color.
3. Lighthouse audit (PWA category) — aim for 100%.

### iOS Add to Home Screen

iOS Safari does not auto-prompt. Users must manually:
1. Tap Share
2. Tap "Add to Home Screen"

The app includes a custom in-app install banner for Android Chrome.

---

## Capacitor APK Build (Android)

To distribute the Mobile App (`/app`) as a native Android APK:

```bash
# 1. Install Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android

# 2. Initialize Capacitor
npx cap init "OMDC Dental" "com.omdcdental.app"

# 3. Add Android platform
npx cap add android

# 4. Build web assets and sync to Android
npm run build && npx cap copy

# 5. Open in Android Studio
npx cap open android
```

In Android Studio:
- Connect an Android device or start an emulator
- Click **Run** to install and launch the app
- To generate a signed APK: Build > Generate Signed Bundle / APK

### Capacitor Config (`capacitor.config.ts`)

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.omdcdental.app',
  appName: 'OMDC Dental',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
```

### After Code Changes

```bash
# Rebuild and re-sync without opening Android Studio
npm run build && npx cap sync
```

---

## Post-Deployment Checklist

- [ ] `VITE_API_URL` set and API is reachable
- [ ] HTTPS enabled (required for service workers)
- [ ] Custom domain configured and DNS propagated
- [ ] PWA manifest and service worker verified
- [ ] Admin panel accessible at `/admin`
- [ ] Queue kiosk accessible at `/kiosk` (test on touch device)
- [ ] Mobile PWA tested on iOS and Android
- [ ] Error tracking (Sentry) receiving events
- [ ] Analytics (GA4) recording page views
- [ ] Default admin password changed
- [ ] Backup/restore procedure for patient database documented
