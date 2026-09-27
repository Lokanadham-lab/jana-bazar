# No-patch deployment

1. Delete/replace the old JANA BAZAR repository files with this release.
2. Upload all root files plus `api/`, `supabase/`, `docs/`, and all PNG brand assets.
3. Do not keep old `index.html`, `app.js`, `config.js`, or old runtime declarations alongside these files.
4. Do not upload `.env` or service-role/private provider credentials.
5. Vercel should use the repository root as the project root. No build command is required.
6. After deployment, `/api/health` should return JSON with version `16.0-final-stable-production`.
