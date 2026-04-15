# LIN-49 — agent memory

## Infrastructure setup

### 2026-04-15T19:40:00Z

**GitHub:** Created public repo `bjax13/hello-greg` with README (`gh repo create … --add-readme`). Cloned into workspace (rsync merge; `.cursor` preserved).

**Vercel:** Linked local dir to team `bjax13s-projects`, project `hello-greg` (`.vercel/project.json`). Added `vercel.json` with `"framework": "nextjs"`.

**Git ↔ Vercel:** `vercel git connect` failed with “Failed to connect bjax13/hello-greg” (likely Vercel ↔ GitHub app install or OAuth in browser). Connect the repo under **Vercel → Project → Settings → Git** if Git-based deploys are required.

**Supabase:** Installed marketplace integration `supabase`; resource `supabase-copper-paddle` connected to `hello-greg`. Confirmed via `vercel integration list`.

**Local env:** Ran `vercel env pull .env.local` — development env includes `POSTGRES_*`, `SUPABASE_*`, `NEXT_PUBLIC_SUPABASE_*`, `VERCEL_OIDC_TOKEN`, etc. `.env.local` and `.vercel` are gitignored.

### 2026-04-15T19:41:00Z

Pushed commit `b3d1007` to `origin/main` adding `.gitignore`, `vercel.json`, and this memory file. Follow-up: `06e8e9b` (memory update).

**Git status:** `main` matches `origin/main`; only untracked path is local `.cursor/`.
