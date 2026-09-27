# JANA BAZAR V22 — Production Launch Checklist

This package is a **production launch candidate codebase**, not a claim that external providers are already contracted or live.

## Included
- Customer, Seller, B2B, Service Provider, Delivery Partner, Admin and Super Admin role architecture
- Customer ↔ Seller same-auth-account model
- OTP/email verification and recovery architecture
- Admin bootstrap with server-only service role key
- Marketplace catalogue, seller types, B2B/RFQ, services, utilities, advertising, support
- India location hierarchy and GPS/reverse-geocoding adapters
- 23-language selection and core English/Telugu/Hindi UI translations
- Cart, wishlist, checkout/order foundation, returns/disputes schema
- JANA Wallet server-ledger schema; no browser balance is authoritative
- Payment intents, webhook/idempotency schema
- Delivery partner onboarding schema, zones, assignments, pickup/delivery OTP, tracking events, COD collection, earnings and payouts
- Seller settlements
- Notifications/devices/security events
- Feature flags and integration status endpoint
- All supplied JANA BAZAR logo assets retained at repository root and mapped in config
- Vercel deployment/security headers

## Before accepting real money
1. Configure Supabase URL/publishable key/service role in Vercel.
2. Apply all migrations in order.
3. Sync official location data into `location_units`.
4. Provision the first admin, then remove the bootstrap token.
5. Configure and verify payment gateway credentials + webhook signing secret.
6. Configure OTP/SMS/WhatsApp provider if required for the selected verification channel.
7. Configure BBPS/FASTag/LPG providers separately; do not enable flags until provider UAT passes.
8. Configure maps/geocoding and shipping provider if external delivery is used.
9. Configure storage buckets and private document access for KYC.
10. Run RLS/security tests and UAT for customer, seller, admin and delivery roles.
11. Run payment webhook replay/idempotency tests and refund/reconciliation tests.
12. Enable production feature flags one module at a time.

## No-fake-production rule
If a provider is not configured or a webhook is not verified, the application must not show a successful real-money transaction. It must return an explicit not-configured/error state.
