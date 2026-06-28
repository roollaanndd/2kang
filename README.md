# OMDC Dental — Multi-Platform Clinic Management Suite

A comprehensive dental clinic management system built with React 19 + TypeScript + Vite 6 + Tailwind CSS v4, featuring four integrated platforms:

| Platform | Route | Description |
|---|---|---|
| **Mobile App** | `/mobile` or `/app` | Patient-facing mobile PWA |
| **eKiosk** | `/kiosk` | Touchscreen check-in terminal (1024x768 landscape) |
| **Website** | `/` | Public marketing site + booking |
| **Admin** | `/admin` | Internal clinic dashboard |

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Type check
npx tsc --noEmit
```

## Backend API

The NestJS backend is in `backend/`. See [backend/README.md](backend/README.md) for setup instructions.

```bash
cd backend
npm install
cp .env.example .env   # configure your database credentials
npm run dev             # starts on port 3001
```

## Architecture

- **Frontend**: React 19, Vite 6, Tailwind CSS v4, Framer Motion v12
- **Backend**: NestJS 11, TypeORM 0.3, PostgreSQL (Supabase)
- **Auth**: JWT with Passport, RBAC roles
- **Payments**: Midtrans Snap integration
- **Real-time**: WebSocket (Socket.IO) for queue updates

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for full technical documentation.

## Project Structure

```
src/                    # Frontend source
  components/           # Shared UI components
    mobile/             # Mobile app screens
    kiosk/              # eKiosk screens
    website/            # Website pages
    admin/              # Admin dashboard
  services/             # API client layer
  lib/                  # Utilities (OMDC codes, broadcasts)
  data/                 # Mock data
  context/              # React contexts

backend/                # NestJS backend API
  src/
    auth/               # Authentication & authorization
    appointments/       # Booking management
    transactions/       # OMDC codes & queue
    integration/        # External system connectors
    ...

docs/                   # Architecture documentation
design/                 # Design assets & references
```

## Environment Variables

### Frontend (`.env.local`)
| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API URL (default: `http://localhost:3001`) |
| `VITE_WS_URL` | WebSocket URL (defaults to API URL) |

### Backend (`.env`)
See [backend/README.md](backend/README.md) for full list.

## Deployment

- GitHub Pages auto-deploys on merge to `main` via `deploy-pages.yml`
- Backend deploys separately (see backend docs)

## License

Proprietary — OMDC Dental. All rights reserved.
