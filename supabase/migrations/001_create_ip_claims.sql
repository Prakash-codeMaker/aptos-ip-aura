-- Migration: create ip_claims table

-- Note: run this in your Supabase SQL editor or via psql against your Supabase DB.

CREATE EXTENSION IF NOT EXISTS "pgcrypto"; -- for gen_random_uuid()

CREATE TABLE IF NOT EXISTS public.ip_claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  price numeric DEFAULT 0,
  owner text,
  content_hash text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ip_claims_content_hash ON public.ip_claims (content_hash);
