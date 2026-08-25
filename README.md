# Jin-travel

## Supabase database setup

For this project, use the Supabase session-mode pooler for Prisma:

```text
postgresql://USER:PASSWORD@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres
```

The project's direct `db.<project-ref>.supabase.co` hostname is IPv6-only in
this environment, so it is unreachable from hosts without an IPv6 route.
When a password contains special characters, URL-encode them before putting
the value in `DATABASE_URL` (`!` becomes `%21`).

Use session mode on port `5432` for migrations:

```bash
DATABASE_URL='postgresql://...' npx prisma migrate deploy
DATABASE_URL='postgresql://...' npx prisma db seed
```

Keep `DATABASE_URL` inline or in `.env.local`; do not commit local credentials.

## Supabase Storage image setup

Set `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`.
The authenticated itinerary image upload action uses the `tour-images` bucket
and creates it as public on the first upload if it does not already exist.
The service-role key is server-only and must never be exposed to the browser.
