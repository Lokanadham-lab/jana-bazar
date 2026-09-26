# JANA BAZAR V11 — FULL PRODUCTION CORE

This is the upgraded **main JANA BAZAR project** built from the V10 branded project and expanded to cover the agreed marketplace architecture before external integrations.

## What is included now
- Customer marketplace experience
- Multi-vendor product catalog
- Farmers / FPO / Homemade / Kirana / Manufacturer / Brand / Distributor / Dealer / Wholesaler / Retailer seller types
- Hyperlocal store discovery
- Product detail + specifications + seller information
- Cart / wishlist / checkout / order lifecycle
- Customer account and support
- Seller registration + KYC/approval workflow + seller dashboard
- B2B marketplace + RFQ workflow
- Service marketplace + booking workflow
- Delivery partner workflow foundation
- JANA Wallet ledger model
- Recharge / bills / FASTag / LPG UI and safe provider boundaries
- Advertising center
- Admin command center
- Customers / Sellers / Products / Orders / Payments / Wallet / Delivery / Services / Advertising / Support / CMS / Security / Audit views
- PWA and responsive mobile UI
- Complete JANA BAZAR logo placement system
- Feature/data models and integration contracts

## What “integrations later” means
This build deliberately does NOT pretend that external services are live. OTP, MFA, payment gateway, real-money wallet, BBPS, FASTag, LPG, maps, shipping, SMS/WhatsApp/email/push and AI providers are isolated as future adapters. The core workflows and UI exist now; provider credentials and server-side implementations can be attached later.

## Core-mode persistence
The browser uses localStorage only as a development/demo repository so the complete interface can be exercised without external credentials. It must NOT be treated as production authority for authentication, authorization, money, inventory or order state. The backend contract and database blueprint in `/backend` and `/database` define the production replacement.

## Run
This is a static project. Open `index.html` through a static web server (recommended) or deploy the repository to a static host.

## Important
Do not put secret provider keys into `config.js` or GitHub. Production secrets belong in deployment/server secret management.

## V12 additions
- Email OTP registration verification and email-OTP login workflow.
- India-wide location hierarchy UI: State/UT, District, Mandal/Sub-District, Panchayat/Local Body, Village/Town, PIN.
- Current device location capture using browser geolocation permission.
- Language selector with English + 22 Indian scheduled-language choices.
- Official Government of India LGD is the planned authoritative synchronization source for the complete administrative hierarchy.


## V13 Supabase Email OTP
Supabase Auth is wired for email/password, email OTP registration verification, passwordless email OTP login, and password recovery. Configure `config.js` and Supabase Auth/SMTP before production. See `docs/SUPABASE_EMAIL_OTP_SETUP.md`.
