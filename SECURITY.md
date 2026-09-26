# JANA BAZAR Security Baseline

- No production secrets in GitHub.
- No hard-coded admin password.
- Client state is never the authority for roles, money, inventory or order status.
- Sensitive actions require server authorization and appropriate OTP/MFA.
- Password reset invalidates prior sessions.
- OTPs expire and have resend/attempt/rate limits.
- Payment webhooks are signature-verified and idempotent.
- Wallet uses append-only ledger semantics plus controlled adjustments.
- Inventory uses server-side atomic reservation to prevent overselling.
- Admin actions are audited.
- File uploads require validation and malware/content scanning in the backend.
- PII and payment data are minimized in logs and analytics.
- Production database access is through least-privilege roles and RLS/authorization policies.
