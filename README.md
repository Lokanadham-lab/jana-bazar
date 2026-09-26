# JANA BAZAR V9 — Admin & Brand Upgrade

This is a browser-runnable prototype/transition build.

## Brand assets
The uploaded JANA BAZAR brand sheet was split into reusable assets:
- Primary/header logo
- Dark logo
- Icon/app icon
- Favicon
- Wordmark
- Monochrome variants
- Customer / Shop
- Seller
- B2B
- Services
- Utilities
- Admin
- Header / splash / browser assets

## Admin corrections
- No generic `admin()` route automatically grants access.
- Admin dashboard requires `admin` or `super_admin` role.
- Admin actions check authorization again before mutation.
- Seller approval is included.
- Product add/delete is included.
- Customer, seller/KYC, products, orders, payments/wallet, advertising, support and audit-log sections are included.
- Admin login is separated from normal customer login.
- Audit events are stored in demo mode.
- Demo mode is clearly marked.

## Demo admin
Email: `admin@janabazar.demo`
Password: `Admin@123`

This demo credential is intentionally for local prototype testing only. Do NOT deploy it as production authentication.

## Production
Set Supabase URL and publishable key in `config.js`. The frontend must never contain service-role keys, payment secrets, OTP provider secrets or wallet signing secrets.

Production authorization must be enforced with:
- Supabase Auth
- profiles/roles table
- RLS policies
- Edge Functions/server-side validation
- MFA/OTP provider
- payment gateway webhooks
- audit logging
- rate limiting
- secure wallet ledger

## Important
Real OTP, SMS/WhatsApp, UPI/Card/BBPS/FASTag/LPG, real wallet money, KYC verification and delivery transactions are NOT faked by this frontend.
