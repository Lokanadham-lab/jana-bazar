# JANA BAZAR V14 Production Audit

## Critical issues found in V13.1
1. Location UI only had a State dropdown; District/Mandal/Panchayat/Village were free-text fields. No location API endpoint or LGD dataset was connected.
2. `Use Current Location` captured latitude/longitude only; it did not reverse-geocode into the administrative hierarchy.
3. Browser `localStorage` remained the source for users, sellers, orders, wallet and admin data. This is not a production authority.
4. Demo users included a local admin record. Removed from the launch candidate.
5. Admin authorization previously allowed a user-metadata role. V14 uses only server-controlled Supabase `app_metadata.role` for the admin gate, with RLS as the real authorization layer.
6. Admin Login exposed `Create Account`; removed.
7. Customer, seller and admin authentication contexts were mixed. Admin no longer exposes customer signup.
8. Language selector changed the selected code but only a small navigation dictionary existed; full catalog/page translation is not yet complete.
9. Payment/wallet/BBPS/FASTag/LPG/shipping/maps providers are not actually connected and must remain disabled until credentials and server adapters are configured.
10. Product images were external demo URLs. Production catalog should use controlled storage/CDN.
11. Seller onboarding was only a basic form; production requires OTP, KYC, bank verification, agreement and approval states.
12. Audit events were stored in browser notifications rather than a server audit table. V14 adds a Supabase audit table and admin-only RLS.
13. Performance diagnostics seen in screenshots were browser debugging overlays, not application UI. They should not be enabled for customer production sessions.

## V14 changes
- Hierarchical location selectors with API-backed data loading.
- Current device location + reverse-geocode adapter.
- Vercel runtime configuration endpoint so public Supabase configuration is not committed to Git.
- Supabase production schema, RLS and role-aware authorization foundation.
- Admin Create Account removed.
- Demo users removed from seed state.
- Server-controlled admin role claim.
- Security headers including geolocation Permissions-Policy.
- Production health endpoint.

## Still credential/provider dependent
A project cannot truthfully be called fully live until the owner configures Supabase, SMTP, LGD sync, reverse geocoder, payment provider, wallet rails, BBPS/FASTag/LPG provider, shipping/maps and notification providers. The code intentionally fails closed instead of generating fake transactions.
