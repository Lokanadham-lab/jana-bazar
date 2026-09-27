# V16 Integration Matrix

| Capability | Built into source | Needs provider/account |
|---|---|---|
| Marketplace UI/search/cart/wishlist | Yes | No |
| Seller account + business registration workflow | Yes | Supabase Auth/backend for real accounts |
| Email OTP | Adapter/UI | Supabase Auth + email configuration |
| Admin RBAC | UI + SQL/RLS foundation | Supabase role provisioning + MFA policy |
| India location hierarchy | API adapter | LGD dataset sync |
| Current device location | Browser API | HTTPS + user permission |
| Voice search | Browser API adapter | Browser support |
| 23 scheduled Indian language choices | Yes | Full seller/customer content translation is data-driven |
| Payments / UPI / cards | Contracts/UI | Payment gateway |
| Wallet real money | Schema/contracts | Payment + secure ledger backend |
| BBPS / FASTag / LPG | Contracts/UI | Licensed provider |
| Shipping/maps | Contracts/UI | Provider |
| SMS/WhatsApp/push | Contracts/UI | Provider |
| Advertising | Campaign UI + schema | Billing/delivery/measurement backend |
| B2B RFQ | UI + schema | Backend notifications/quotes |
| Services | UI + schema | Provider verification/booking backend |
