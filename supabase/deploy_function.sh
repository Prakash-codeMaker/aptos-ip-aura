#!/usr/bin/env bash
# Deploy Supabase Edge Function (requires supabase CLI)
# Usage: SUPABASE_PROJECT_REF=<project-ref> SUPABASE_SERVICE_ROLE_KEY=<service-key> ./deploy_function.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FUNCTION_DIR="$SCRIPT_DIR/functions/create_claim"

if [[ ! -d "$FUNCTION_DIR" ]]; then
  echo "Function directory not found: $FUNCTION_DIR" >&2
  exit 1
fi

if ! command -v supabase >/dev/null 2>&1; then
  echo "supabase CLI not found. Install from https://supabase.com/docs/guides/cli" >&2
  exit 2
fi

if [[ -z "${SUPABASE_PROJECT_REF:-}" ]]; then
  echo "Please set SUPABASE_PROJECT_REF environment variable (your project ref)." >&2
  exit 3
fi

# Deploy the function using supabase CLI
# Store PROJECT_REF in local environment
export SUPABASE_URL="https://$SUPABASE_PROJECT_REF.supabase.co"

echo "Deploying function from $FUNCTION_DIR to project $SUPABASE_PROJECT_REF"

supabase functions deploy create_claim --project-ref "$SUPABASE_PROJECT_REF" --no-verify

echo "If deployment succeeded, set VITE_CREATE_CLAIM_URL to the function URL in your .env:"
echo "VITE_CREATE_CLAIM_URL=https://$SUPABASE_PROJECT_REF.functions.supabase.co/create_claim"

