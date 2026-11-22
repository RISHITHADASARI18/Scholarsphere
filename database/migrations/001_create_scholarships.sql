-- ScholarSphere scholarship directory schema (PostgreSQL / Neon compatible)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS scholarships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  provider TEXT NOT NULL,
  provider_type TEXT NOT NULL CHECK (provider_type IN ('government','corporate','foundation','university','ngo','other')),
  education_levels TEXT[] NOT NULL DEFAULT '{}',
  grades TEXT[] NOT NULL DEFAULT '{}',
  states TEXT[] NOT NULL DEFAULT ARRAY['All India']::TEXT[],
  categories TEXT[] NOT NULL DEFAULT '{}',
  scholarship_type TEXT NOT NULL DEFAULT 'Need-based',
  summary TEXT NOT NULL,
  benefits TEXT,
  amount_min_inr NUMERIC(12,2),
  amount_max_inr NUMERIC(12,2),
  amount_description TEXT,
  eligibility JSONB NOT NULL DEFAULT '{}'::jsonb,
  required_documents TEXT[] NOT NULL DEFAULT '{}',
  application_process TEXT,
  official_application_url TEXT,
  official_source_url TEXT NOT NULL,
  academic_year TEXT NOT NULL,
  application_status TEXT NOT NULL DEFAULT 'verify_on_provider' CHECK (application_status IN ('open','opening_soon','closed','check_state_portal','verify_on_provider')),
  application_open_date DATE,
  application_deadline DATE,
  status_note TEXT,
  source_last_checked_at DATE NOT NULL,
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending','verified','needs_review','archived')),
  published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS scholarships_published_level_idx ON scholarships USING GIN (education_levels);
CREATE INDEX IF NOT EXISTS scholarships_grades_idx ON scholarships USING GIN (grades);
CREATE INDEX IF NOT EXISTS scholarships_states_idx ON scholarships USING GIN (states);
CREATE INDEX IF NOT EXISTS scholarships_categories_idx ON scholarships USING GIN (categories);
CREATE INDEX IF NOT EXISTS scholarships_status_idx ON scholarships (application_status);
CREATE INDEX IF NOT EXISTS scholarships_provider_idx ON scholarships (provider);

CREATE TABLE IF NOT EXISTS scholarship_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scholarship_id UUID NOT NULL REFERENCES scholarships(id) ON DELETE CASCADE,
  source_name TEXT NOT NULL,
  source_url TEXT NOT NULL,
  source_type TEXT NOT NULL DEFAULT 'official_notification',
  checked_at DATE NOT NULL,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS provider_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  official_email TEXT NOT NULL,
  programme_name TEXT NOT NULL,
  official_programme_url TEXT NOT NULL,
  description TEXT,
  review_status TEXT NOT NULL DEFAULT 'pending' CHECK (review_status IN ('pending','approved','rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Only verified records are eligible for public display. Publishing is an explicit admin action.
COMMENT ON COLUMN scholarships.published IS 'Must remain false until an editor verifies the current official source and approves the record.';
