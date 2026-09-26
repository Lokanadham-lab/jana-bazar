# Free-now vs paid-later integration matrix

| Capability | Can be used now without paid provider | Paid/provider configuration later |
|---|---|---|
| Supabase Auth | Yes, subject to Supabase project limits | Higher tiers if needed |
| Email OTP | Yes through configured Supabase email delivery | Custom SMTP/provider |
| Browser voice input | Yes where browser supports Web Speech | Cloud speech provider for broader support |
| Device geolocation | Yes, HTTPS + user permission | — |
| LGD hierarchy UI/API | Yes after data sync | Data pipeline/hosting as needed |
| Reverse geocoding | Adapter ready | Provider/API may have quotas/cost |
| UI translations | Architecture ready | Translation provider optional |
| Payments | UI + backend contract only | Payment gateway |
| Wallet money | Ledger architecture only | Regulated/payment/wallet provider and compliance |
| BBPS | Adapter only | BBPS provider |
| FASTag | Adapter only | Provider |
| LPG | Adapter only | Provider |
| Shipping | Adapter only | Shipping/aggregator provider |
| SMS/WhatsApp | Adapter only | Provider |
| Push notifications | Browser foundation | Push infrastructure/provider as needed |
| AI | Architecture only | AI API/provider |
