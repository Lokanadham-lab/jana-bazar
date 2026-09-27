# JANA BAZAR Delivery — Production Workflow

## Roles
- Delivery Partner
- Seller / Pickup source
- Customer / Delivery recipient
- Admin / Operations

## Lifecycle
`PLACED → SELLER_ACCEPTED → READY_FOR_PICKUP → PARTNER_ASSIGNED → PARTNER_ACCEPTED → PICKUP_OTP_VERIFIED → PICKED_UP → OUT_FOR_DELIVERY → DELIVERY_OTP_VERIFIED → DELIVERED → EARNING_CREATED → SETTLEMENT`

## Security
- Partner actions require authenticated server authorization.
- Assignment ownership is checked server-side.
- Pickup and delivery OTPs are stored as hashes and expire.
- Delivery events support idempotency keys.
- COD collection is reconciled against expected order amount.
- Partner earnings are ledger records; browser localStorage is never authoritative.
- KYC documents belong in private object storage with signed access.

## Partner model
Supports JANA BAZAR delivery partners, seller self-delivery and future external logistics adapters.

## API
- `GET /api/delivery/jobs` — authenticated partner/admin jobs
- `POST /api/delivery/{assignmentId}/accept` — server-authorized assignment acceptance
- Future provider-specific shipment creation/tracking should be implemented as adapters, not hard-coded into the customer UI.
