# JANA BAZAR V22 — Production Launch Candidate

A multi-vendor, hyperlocal, B2B/B2C marketplace foundation with customer, seller, service-provider, delivery-partner and admin workflows.

**Important:** this repository is launch-ready at the code/architecture level, but external services such as payment gateways, SMS/WhatsApp, BBPS, FASTag, LPG, maps and shipping require the deployer’s own provider accounts, credentials, contracts and UAT. No fake transaction success is implemented.

See `docs/PRODUCTION_LAUNCH_CHECKLIST.md`, `docs/DELIVERY_PRODUCTION.md` and `docs/FEATURE_COVERAGE_V22.md`.

All supplied JANA BAZAR logo variants are retained at repository root; see `brand-assets.json`.

# JANA BAZAR V20 — Current Location Fixed

This build fixes the current-location workflow. The browser captures device GPS coordinates over HTTPS, saves them immediately, and then uses the server reverse-geocoding adapter. If no paid provider is configured, the adapter uses OpenStreetMap Nominatim as a low-volume fallback. For high-scale production traffic, configure a dedicated geocoding provider and comply with its terms.

LGD administrative dropdowns remain backend-data dependent: configure Supabase service-role environment variables and synchronize official LGD data into `location_units` for State → District → Sub-District → Local Body → Village codes.

No real payment, wallet, BBPS, FASTag, LPG or shipping transaction is fabricated.

# JANA BAZAR V17 — Final Stable Production Foundation

JANA BAZAR is an India-focused multi-vendor marketplace foundation for customers, farmers, FPOs, homemade sellers, Kirana stores, manufacturers, brands, distributors, dealers, wholesalers, retailers, service providers and B2B buyers.

## Included
- Customer marketplace, search, product detail/specifications, cart, wishlist and account
- Seller Login / Create Seller Account separate from Business Registration
- Seller KYC/GST/PAN/Udyam/bank-ready workflow
- B2B/RFQ foundation
- Services marketplace
- Utilities: recharge/bills, FASTag, LPG and JANA Wallet architecture
- Advertising Center
- Admin Portal and role-based architecture
- India State → District → Sub-District/Mandal → Local Body/Panchayat → Village hierarchy API
- Current device location adapter
- Email OTP / password recovery adapters through Supabase Auth
- 23 scheduled Indian language choices
- Browser voice search adapter
- PWA assets
- Supabase RLS schema and marketplace expansion migration
- All supplied JANA BAZAR logo variants mapped to their intended surfaces
- Vercel-safe static deployment with API functions

## Important
This is a production **foundation / launch candidate**, not a claim that external regulated/payment services are live without credentials. Real-money, OTP, BBPS, FASTag, LPG, shipping, SMS/WhatsApp and similar providers require their own accounts, secrets, agreements and server-side verification. The UI will not fabricate successful transactions when those providers are absent.

## GitHub
Replace the old project with this release as one complete tree. Preserve `api/` and `supabase/`; do not flatten server files into the root. Do not upload secrets.

See `docs/FINAL_BUILD_STATUS.md` and `docs/DEPLOYMENT_NO_PATCHES.md`.


## V19 Language Fix
The language selector now applies a centralized UI translation catalog after every render, persists the selected locale, updates document language, and translates core navigation/home UI for supported language packs. Product/seller proper names remain unchanged.

## Admin authentication
See `docs/ADMIN_PRODUCTION_SETUP.md`. Admin login requires Supabase Auth and a server-controlled `app_metadata.role`. No demo admin credentials are included.
