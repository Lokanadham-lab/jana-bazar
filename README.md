# JANA BAZAR Backend Contract — V11

This core build is integration-neutral. The browser currently uses a local repository so every workflow can be demonstrated without external credentials. The production backend must replace that repository with server-authorized APIs.

## Required server domains
- Identity: registration, login, OTP, password recovery, MFA, sessions, devices
- Marketplace: catalog, search, stores, seller profiles, inventory
- Commerce: cart, checkout, orders, returns, refunds
- Finance: payment intents, webhooks, wallet ledger, settlements, reconciliation
- Seller: KYC, approvals, products, staff, advertising, analytics
- B2B: RFQ, quotes, negotiation, purchase orders
- Services: provider verification, booking, scheduling, quotes
- Delivery: assignments, tracking, pickup/delivery OTP, proof of delivery
- Utilities: recharge, bills, FASTag, LPG through approved providers
- Platform: CMS, notifications, support, moderation, audit, risk

## Security rule
No client-side state is an authority for production authorization, money, inventory, KYC or order status. Every sensitive action must be authorized server-side and recorded in an audit trail.
