# Integration Contracts — Connect Later

The V11 core intentionally works without external providers. These are the adapters to connect later:

1. Auth/Identity provider — real sessions, password hashing, OTP, MFA, device trust.
2. OTP/SMS — registration, login, recovery, sensitive changes, delivery OTP.
3. Payment gateway — UPI/cards/netbanking, payment intents, refunds, webhook verification.
4. Wallet/ledger backend — server-side money ledger and reconciliation.
5. BBPS — biller discovery, payment, status, webhook/reconciliation.
6. FASTag — account/vehicle lookup, recharge, status.
7. LPG — supported provider booking/service workflow.
8. Maps/geocoding — location, distance, service areas, delivery zones.
9. Shipping/logistics — label, pickup, tracking, delivery status.
10. Notifications — SMS/email/WhatsApp/push.
11. Search index — large-scale product/store/service search.
12. AI — shopping assistant, seller assistant, moderation and analytics.

Every adapter must expose success, pending, failure, retry and reconciliation states. No provider should be represented as successful merely because a frontend button was clicked.
