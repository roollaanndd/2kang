# OMDC Dental Backend API

NestJS backend for the OMDC Dental clinic management system.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your Supabase database password and keys

# 3. Start development server
npm run dev

# 4. Open Swagger docs
open http://localhost:3001/api/docs
```

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `DATABASE_URL` | Supabase PostgreSQL connection string | Yes |
| `DATABASE_SSL` | Enable SSL (`true` for Supabase) | Yes |
| `JWT_SECRET` | Secret for JWT token signing (min 32 chars) | Yes |
| `SUPABASE_URL` | Supabase project URL | No |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | No |
| `MIDTRANS_SERVER_KEY` | Midtrans payment server key | No |
| `MIDTRANS_CLIENT_KEY` | Midtrans payment client key | No |
| `PORT` | Server port (default: 3001) | No |

## Database

Tables are managed via Supabase migrations. The schema includes:

- `users` — Patient accounts
- `admin_users` — Staff accounts (admin, owner, etc.)
- `doctors` — Doctor profiles and schedules
- `services` — Dental service catalog
- `branches` — Clinic locations
- `appointments` — Bookings with conflict detection
- `transactions` — OMDC codes, queue, and payments
- `notifications` — Push and broadcast
- `family_members` — Patient family members
- `promotions` — Marketing promotions
- `cms_content` — Generic CMS key/value store

## API Endpoints

All endpoints are prefixed with `/api/v1`. See Swagger docs at `/api/docs` for full details.

### Public
- `POST /auth/register` — Register patient
- `POST /auth/login` — Patient login
- `POST /auth/admin/login` — Admin login
- `GET /doctors` — List doctors
- `GET /services` — List services
- `GET /branches` — List branches
- `GET /queue/:branchId/status` — Queue status
- `POST /transactions/lookup` — Look up OMDC code
- `POST /payments/webhook/midtrans` — Payment webhook

### Authenticated
- `POST /appointments` — Book appointment
- `GET /appointments/my` — My appointments
- `POST /transactions` — Create transaction
- `PATCH /transactions/:id/check-in` — Check in
- `POST /payments/snap/:id` — Get payment token
- `GET /notifications` — My notifications

### Admin
- `GET /reports/dashboard` — Dashboard stats
- `GET /reports/revenue` — Revenue report
- `POST /queue/:branchId/call-next` — Call next patient
- `POST/PATCH /cms/*` — Content management

### Integration (Owner/Admin)
- `GET /integration` — List integration configs
- `POST /integration` — Create integration config
- `PATCH /integration/:id` — Update integration config
- `POST /integration/:id/test` — Test external connection
- `POST /integration/import/patients` — Import patients from external system
- `POST /integration/import/medical-records` — Import medical records
- `POST /integration/export` — Export OMDC data
- `GET /integration/sync/logs` — Sync history
- `POST /integration/webhook/:id` — Receive webhook (public)

## Scripts

```bash
npm run build       # Compile TypeScript
npm run dev         # Dev mode with watch
npm run start:prod  # Production mode
npm run lint        # Type check only
```
