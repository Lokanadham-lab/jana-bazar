# JANA BAZAR Admin Production Setup

Admin authentication is Supabase Auth based. There are no demo admin credentials.

## Required Vercel variables
- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-side only)
- `JANA_ADMIN_BOOTSTRAP_TOKEN` (temporary, long random secret)

## First admin
1. Deploy the project with the variables above.
2. Open **Admin Login** → **First Admin Setup**.
3. Enter the temporary bootstrap token, admin email, a password of at least 12 characters, and role.
4. Provision the account.
5. Remove `JANA_ADMIN_BOOTSTRAP_TOKEN` from Vercel and redeploy.
6. Login normally with the provisioned email/password.

The role is written to Supabase Auth `app_metadata.role`, which is the trusted admin authorization claim used by the frontend and RLS policies. Never expose the service-role key or bootstrap token in frontend code.
