<#
PowerShell migration helper for Supabase Postgres.
Usage:
  Set the environment variable SUPABASE_DB_URL to your Supabase Postgres connection string.
  Then run: .\run_migration.ps1

This script will attempt to use psql to run the migration SQL file located at supabase/migrations/001_create_ip_claims.sql.
If psql is not available, it will print the SQL path and instruct you how to run it manually using Supabase SQL editor.
#>

$ErrorActionPreference = 'Stop'

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$migrationFile = Join-Path $scriptDir "migrations\001_create_ip_claims.sql"

if (-not (Test-Path $migrationFile)) {
  Write-Host "Migration SQL not found at $migrationFile" -ForegroundColor Red
  exit 1
}

if (-not $env:SUPABASE_DB_URL) {
  Write-Host "Please set environment variable SUPABASE_DB_URL with your Supabase Postgres connection string." -ForegroundColor Yellow
  Write-Host "Example (PowerShell):`n$env:SUPABASE_DB_URL = 'postgres://...'
" -ForegroundColor Gray
  Write-Host "You can also run the SQL manually in the Supabase SQL editor using the file:`n$migrationFile" -ForegroundColor Gray
  exit 1
}

# Check for psql
$psql = Get-Command psql -ErrorAction SilentlyContinue
if ($psql) {
  Write-Host "Found psql, running migration..." -ForegroundColor Green
  & psql $env:SUPABASE_DB_URL -f $migrationFile
  if ($LASTEXITCODE -eq 0) {
    Write-Host "Migration applied successfully." -ForegroundColor Green
  } else {
    Write-Host "psql reported exit code $LASTEXITCODE" -ForegroundColor Red
  }
  exit $LASTEXITCODE
} else {
  Write-Host "psql not found on PATH." -ForegroundColor Yellow
  Write-Host "You can run the SQL manually in the Supabase SQL editor. File path:" -ForegroundColor Gray
  Write-Host $migrationFile -ForegroundColor Cyan
  Write-Host "Or install psql (Postgres client) and re-run this script. On Windows, install Postgres or psql tools." -ForegroundColor Gray
  exit 2
}
