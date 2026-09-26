# JANA BAZAR — Advanced Marketplace Starter

JANA BAZAR is an India-focused multi-vendor marketplace prototype designed around:

- Customer, Seller, Admin, B2B, Delivery and Service-provider roles
- OTP registration/recovery architecture
- Forgot Password for every login type
- Product catalogue, product details, search, voice search, cart, wishlist and checkout
- Farmers, FPOs, Homemade, Kirana, Manufacturers, Brands, Distributors, Dealers, Wholesalers and Retailers
- Local commerce and service marketplace
- B2B/RFQ workflow
- JANA Wallet architecture
- Recharge & bill-payments architecture
- FASTag and LPG service modules
- Seller dashboard and admin dashboard
- Advertising Center
- Delivery OTP architecture
- Reviews, offers, support and policy placeholders
- Responsive mobile/desktop UI

## Important: demo vs production

This repository runs immediately on GitHub Pages without a database or manual SQL. It uses `localStorage` for demo data.

**Do not treat demo authentication, wallet credits or utility submissions as production financial functionality.** The following need a secure backend and authorized providers before launch:

- Real SMS/WhatsApp OTP
- Real payment gateway and webhook verification
- Real wallet ledger/cash handling
- BBPS/recharge provider
- FASTag provider
- LPG provider/API where available
- Maps/geocoding
- KYC verification
- Seller payouts/settlements
- Production database/RLS

No secret API keys belong in frontend code.

## Demo accounts

### Admin
- Email: `admin@janabazar.demo`
- Password: `Admin@123`

### OTP
- `123456`

You can also register Customer/Seller/B2B/Service/Delivery accounts from the UI.

## GitHub Pages

1. Create a GitHub repository.
2. Upload all files/folders from this directory.
3. Commit to `main`.
4. GitHub → Settings → Pages → Deploy from branch → `main` / root.
5. Open the generated Pages URL.

Because this is a static prototype, no build command is required.

## Production migration plan

Keep the UI, but replace localStorage data services with a secure API/backend. Recommended production layers:

```text
Web / Android / iOS
        ↓
Secure API / Edge Functions
        ↓
Auth + RBAC
        ↓
Postgres/Supabase or equivalent
        ↓
Payments / OTP / BBPS / FASTag / Maps / Shipping
```

Database migrations, indexes, RLS and seed data should be deployed automatically through the project's migration pipeline instead of asking the user to repeatedly paste SQL into an editor.
