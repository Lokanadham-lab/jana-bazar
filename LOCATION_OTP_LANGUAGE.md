# JANA BAZAR V12 — Email OTP + India Location + Language Engine

## Email OTP
- Customer registration requires email OTP verification before activation.
- Email OTP login is available.
- OTP has a 5-minute expiry and a maximum of 5 verification attempts in the core client workflow.
- When a real email provider is configured, the UI switches from development preview to provider delivery.
- The current core build deliberately shows a development OTP preview only when the provider is disabled; this must not be used as a production email-delivery mechanism.

## India location
The UI supports the hierarchy:

State / UT → District → Mandal / Taluk / Tehsil / Sub-District → Gram Panchayat / Local Body → Village / Town / Locality → PIN.

Current-device location uses the browser Geolocation API. Browsers require HTTPS and user permission for geolocation.

For the authoritative all-India administrative dataset, use the Government of India Local Government Directory (LGD) as the synchronization source. The production adapter should periodically refresh state, district, sub-district, village, Gram Panchayat and mapping records rather than hard-coding a stale browser dataset.

## Languages
The selector includes English plus India's 22 Eighth Schedule language choices. English/Telugu/Hindi core UI labels are included in the first translation layer; the remaining languages use the same translation-key architecture and should be populated by the production translation catalog.
