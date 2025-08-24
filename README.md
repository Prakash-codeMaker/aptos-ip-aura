# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/62ad743d-4879-4aa4-a2c0-47f080fe07c1

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/62ad743d-4879-4aa4-a2c0-47f080fe07c1) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/62ad743d-4879-4aa4-a2c0-47f080fe07c1) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Supabase: IP claims migration and functions

This project includes server-side helpers to securely record and verify IP claims using Supabase.

1. Create the `ip_claims` table in your Supabase project.

- Open your Supabase project, go to SQL editor, and run the migration SQL in `supabase/migrations/001_create_ip_claims.sql`.

2. Deploy the Supabase Edge Function for creating claims

- The example function is in `supabase/functions/create_claim/index.ts`.
- This is a Deno function for Supabase Edge runtime. Set environment variables `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` when deploying.
- The function expects a POST JSON payload { title, description, price, owner, content_hash } and returns either `{ duplicate }` or `{ claim }`.

3. Configure the client

- Set `VITE_CREATE_CLAIM_URL` in your `.env` to the deployed function URL (e.g., `https://<project>.functions.supabase.co/create_claim`).

4. Security notes

- Use service role key only on server-side (Edge Function). Do not expose it in client code.
- Add RLS policies to `ip_claims` if needed to control read/write access.

### Quick deploy helpers

This repo includes helper scripts to run the SQL migration and deploy the Supabase Edge Function.

- Run migration (bash):

  SUPABASE_DB_URL="postgres://<user>:<pass>@<host>:5432/<db>" ./supabase/run_migration.sh

- Run migration (PowerShell):

  $env:SUPABASE_DB_URL = "postgres://..."
  .\supabase\run_migration.ps1

- Deploy function (bash):

  SUPABASE_PROJECT_REF=<project-ref> ./supabase/deploy_function.sh

- Deploy function (PowerShell):

  $env:SUPABASE_PROJECT_REF = '<project-ref>'
  .\supabase\deploy_function.ps1

After deploying, set `VITE_CREATE_CLAIM_URL` in your `.env` to the provided function URL and restart the dev server.
