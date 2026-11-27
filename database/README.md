# ScholarSphere database setup

## What this database stores
- Scholarship programme metadata and eligibility rules.
- Official provider/application URLs and source verification history.
- Publication state, academic year, application window and status.
- Provider-submitted programme suggestions (review queue only).

Student applications and student documents are **not** stored here.

## Provisioning
1. Provision a PostgreSQL database (Neon is the intended provider for this Next.js/Vercel project).
2. Add the provider's pooled connection string as `DATABASE_URL` in Vercel Development, Preview and Production environments.
3. Run `database/migrations/001_create_scholarships.sql` against the database.
4. Install dependencies, then run `npm run db:seed:all` to import the researched records from all six education-level seed files in `data/scholarships/`.
5. Keep `published=false` until an editor confirms the official source and current academic-year details.

The repository currently contains the schema and seed research for School, Intermediate, Diploma, Undergraduate, Postgraduate and Research. It does not contain database credentials and does not claim that a live database has been provisioned.

## Data quality rules
- The official provider or government notification is the source of truth.
- Store the date each source was checked.
- Never infer an open application window from a previous year's dates.
- Use `check_state_portal` where state-level dates are not centrally confirmed.
- Keep uncertain benefit amounts out of numeric amount fields.
- Admin approval is required before publication.
