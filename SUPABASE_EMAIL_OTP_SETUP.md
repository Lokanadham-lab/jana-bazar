# JANA BAZAR V13 — Supabase Email OTP

## What is connected
- Supabase Auth client in the browser
- Customer registration: email + password + Supabase email OTP verification
- Password login through Supabase Auth
- Passwordless email OTP login through `signInWithOtp` + `verifyOtp`
- Password recovery email through `resetPasswordForEmail`
- No development OTP is generated or displayed by the application

## 1. Add Supabase project values
Edit `config.js`:

```js
supabase:{
  url:'https://YOUR_PROJECT_REF.supabase.co',
  publishableKey:'YOUR_SUPABASE_PUBLISHABLE_KEY',
  redirectTo:window.location.origin+'/',
  recoveryRedirectTo:window.location.origin+'/'
}
```

Use the browser-safe **publishable key** (or the legacy `anon` key where applicable). Never put a `service_role` or secret key in this file.

## 2. Enable Email Auth / OTP in Supabase
In Supabase Dashboard → Authentication → Providers → Email, enable email authentication.

For OTP delivery, the Magic Link email template must contain `{{ .Token }}`. If the template uses only `{{ .ConfirmationURL }}`, Supabase sends a link instead of the numeric OTP.

## 3. Configure URLs
In Authentication → URL Configuration, set the Site URL to the deployed JANA BAZAR domain and add the deployed domain to the allowed redirect URLs.

## 4. Configure production email delivery
Supabase's built-in email service is intended for development/testing and restricts delivery to pre-authorized addresses. For real customers, configure a custom SMTP provider in Supabase Auth.

## 5. Flow
1. Customer enters name, mobile, email and password.
2. JANA BAZAR calls `supabase.auth.signUp()`.
3. Supabase sends the verification OTP.
4. Customer enters the OTP.
5. JANA BAZAR calls `supabase.auth.verifyOtp({ email, token, type: 'email' })`.
6. A Supabase session is created and the local UI session is synchronized.
7. Email OTP login uses `signInWithOtp({ shouldCreateUser:false })` and then `verifyOtp()`.

## Security
- No service-role key in frontend.
- Authentication is delegated to Supabase Auth.
- Production authorization must still be enforced with database RLS / server-side role checks; hiding an Admin button is not a security control.
