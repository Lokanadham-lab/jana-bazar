# JANA BAZAR production backend

This project uses Supabase Auth + Postgres + RLS. The browser must never contain the service-role key.

## Required Vercel environment variables
- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server/API routes only)
- `REVERSE_GEOCODE_URL_TEMPLATE` (server/API route only; provider-specific)

## Location data
`public.location_units` is designed for synchronized Government of India LGD data. Import states, districts, sub-districts, local bodies/Gram Panchayats and villages with their LGD codes and parent relationships. The application intentionally refuses to invent missing lower-level records.

The official LGD catalog is also published on data.gov.in and is updated monthly.

## Admin roles
Do not create an admin through public signup. Provision the first admin server-side by setting the Supabase Auth user's `app_metadata.role` to `admin` or `super_admin`. The frontend only reads that server-controlled claim.
