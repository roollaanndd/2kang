# Security Notes

## Authentication

This project currently uses a **client-side localStorage auth layer** as a prototype/demo. It is NOT intended for production use without a real backend.

### Default credentials

Default seed credentials are set at build time via environment variables:

```env
VITE_ADMIN_DEFAULT_PASSWORD=your-strong-password-here
VITE_OWNER_DEFAULT_PASSWORD=your-strong-password-here
```

If these variables are not set, fallback demo credentials are used. **Change all passwords immediately after first login** via Admin → Users.

### Production hardening checklist

- [ ] Replace localStorage auth with a real backend (see `src/services/api.ts`)
- [ ] Set `VITE_ADMIN_DEFAULT_PASSWORD` and `VITE_OWNER_DEFAULT_PASSWORD` as secrets in your CI/CD environment
- [ ] Change all default passwords on first login
- [ ] Enable HTTPS (handled by Vercel/Netlify/GitHub Pages automatically)
- [ ] Review Content Security Policy headers in `vercel.json`

## Sensitive data

- No real API keys or secrets are committed to this repository
- The `.env.example` file contains only placeholder values
- All runtime secrets should be set as environment variables in your deployment platform

## Reporting a vulnerability

Please open a private GitHub issue or email the repository owner directly.
