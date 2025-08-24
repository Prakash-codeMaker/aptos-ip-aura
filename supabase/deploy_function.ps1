<#
PowerShell script to deploy Supabase Edge Function using supabase CLI.
Usage:
  $env:SUPABASE_PROJECT_REF = '<project_ref>'
  supabase login
  .\deploy_function.ps1
#>
param()

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$functionDir = Join-Path $scriptDir "functions\create_claim"

if (-not (Test-Path $functionDir)) {
  Write-Host "Function directory not found: $functionDir" -ForegroundColor Red
  exit 1
}

$supabaseCli = Get-Command supabase -ErrorAction SilentlyContinue
if (-not $supabaseCli) {
  Write-Host "supabase CLI not found. Install from https://supabase.com/docs/guides/cli" -ForegroundColor Red
  exit 2
}

if (-not $env:SUPABASE_PROJECT_REF) {
  Write-Host "Please set SUPABASE_PROJECT_REF environment variable (your project ref)." -ForegroundColor Yellow
  exit 3
}

Write-Host "Deploying function from $functionDir to project $env:SUPABASE_PROJECT_REF" -ForegroundColor Green
& supabase functions deploy create_claim --project-ref $env:SUPABASE_PROJECT_REF --no-verify

Write-Host "If deployment succeeded, set VITE_CREATE_CLAIM_URL to the function URL in your .env:" -ForegroundColor Gray
Write-Host "VITE_CREATE_CLAIM_URL=https://$env:SUPABASE_PROJECT_REF.functions.supabase.co/create_claim" -ForegroundColor Cyan
