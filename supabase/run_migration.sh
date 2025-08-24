#!/usr/bin/env bash
# Cross-platform migration helper (bash)
# Usage: SUPABASE_DB_URL="postgres://..." ./run_migration.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MIGRATION_FILE="$SCRIPT_DIR/migrations/001_create_ip_claims.sql"

if [[ ! -f "$MIGRATION_FILE" ]]; then
  echo "Migration SQL not found at $MIGRATION_FILE" >&2
  exit 1
fi

if [[ -z "${SUPABASE_DB_URL:-}" ]]; then
  echo "Please set SUPABASE_DB_URL environment variable with your Supabase Postgres connection string." >&2
  echo "You can also run the SQL manually in the Supabase SQL editor. File: $MIGRATION_FILE" >&2
  exit 2
fi

if command -v psql > /dev/null 2>&1; then
  echo "Found psql, running migration..."
  psql "$SUPABASE_DB_URL" -f "$MIGRATION_FILE"
  echo "Migration applied successfully."
  exit 0
else
  echo "psql not found. Please install Postgres client or run the SQL in Supabase SQL editor:" >&2
  echo "$MIGRATION_FILE" >&2
  exit 3
fi
