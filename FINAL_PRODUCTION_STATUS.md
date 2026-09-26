# JANA BAZAR V15 — Final Production Foundation

## Included now (no paid provider required)
- Responsive marketplace UI for customer, seller, B2B, services, utilities and admin.
- Supabase Auth integration contract with persistent sessions.
- Email OTP / password recovery contract.
- Seller Login and Seller Create Account separated from Business Registration.
- Business registration with seller type, KYC/business/settlement fields.
- Admin role architecture with Super Admin + functional admin roles.
- Advertising Center with campaign types, targeting fields, budgets, scheduling and analytics structure.
- India location hierarchy UI: State → District → Sub-District/Mandal → Local Body/Panchayat → Village/Town → PIN.
- Current-device geolocation and reverse-geocode adapter.
- Multilingual selector architecture with 23 language choices and persistent preference.
- Browser Web Speech voice-search integration where supported; provider adapter remains optional.
- Product detail/specifications/variants-ready marketplace structure.
- B2B/RFQ, services, delivery, wallet and utilities UI/workflow contracts.
- Security headers, RLS migration, app_metadata-based admin authority and audit-log schema.
- All supplied JANA BAZAR logo variants retained and assigned to header, portals, footer, favicon, PWA/app and module surfaces.

## Deliberately NOT claimed as live without provider credentials/data
- Real-money payment capture/refunds.
- Real wallet money movement.
- BBPS/recharge/FASTag/LPG transactions.
- SMS/WhatsApp OTP if an external provider is required.
- Shipping/live delivery tracking.
- Production push notifications.
- AI provider calls.
- Reverse geocoding if `REVERSE_GEOCODE_URL_TEMPLATE` is not configured.
- Full LGD village/local-body records until `location_units` is populated by the official sync process.

## Production rule
The frontend must never claim a paid-provider transaction succeeded when the provider is not connected. Draft/test states are explicit.
