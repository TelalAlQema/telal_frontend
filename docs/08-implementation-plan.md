# 08 — Implementation Plan (Milestones)

> Telal Al Qema — Rebuild to Next.js + Express + Prisma + MySQL
> Version: 1.0 · Status: Draft — Read with `docs/06-brd.md` + `docs/07-srs.md`

---

## 0. Guiding principles

1. **The legacy site stays live until the cut / end of M10.** No loss of leads, no downtime (dark-launch).
2. Do the **security + secrets first** (already the P0 mandate in `docs/02`), for both old and new stacks.
3. Each milestone is independently shippable, with clear **acceptance criteria** (“done”) — review and
   approve before moving on.
4. One repo, two folders: `frontend/`, `backend/`, plus shared `docs/`.
5. Default decisions — **confirmed at M0 kickoff (2026-08-07)**:
   - **frontend: Next.js 16 (App Router, latest stable) + Tailwind v4 + TypeScript** — supersedes the
     earlier "Next.js 15" note; `create-next-app@latest` scaffold installed 16.3.0 and is approved.
   - **backend: Express 5 + Prisma 7 + nodemailer + zod** — to be installed at M1 (not M0).
   - **database: MySQL 8.0**, standalone (no XAMPP) at `127.0.0.1:3301`, db `telalalqema`, dedicated
     app user `telal` (never root in `DATABASE_URL`). `.env`/`.env.local` are gitignored.
   - **package manager: npm** (`pnpm-if-installed else npm` → pnpm not present).
   - **auth: JWT in httpOnly SameSite=Lax cookie** (M2).
   - **deployment: VPS/Nginx or Vercel — deferred, confirm at M10.**

---

## 1. Monorepo layout (target)
```
/ (repo root)
├─ AGENTS.md
├─ docs/            (all docs incl. this)
├─ backend/
│  ├─ src/          (Express app; routes/services/validation/middleware)
│  ├─ prisma/       (schema.prisma, migrations/, seed.ts)
│  ├─ .env.example   (committed)
│  ├─ .env           (local, gitignored)
│  └─ package.json
└─ frontend/
   ├─ app/          (Next.js routes under src/app)
   ├─ components/   (layout, header, footer, forms, cards)
   ├─ lib/          (api client, meta)
   ├─ .env.local.example   .env.local
   └─ package.json
```

---

## 2. Milestones at a glance

| # | Name | Deliverable | Depends on |
|---|---|---|---|
| M0 | Kickoff & tooling | git repo, folders, env rotation, toolchain, local MySQL | – |
| M1 | Backend foundation | Express+TS app, Prisma schema+migrate+seed, health, error handling, logging | M0 |
| M2 | Auth | admin login/logout/me, bcrypt+JWT cookie, middleware | M1 |
| M3 | Lead APIs | contact + quote endpoints (zod, reCAPTCHA, rate-limit, honeypot, nodemailer) | M1 |
| M4 | Admin APIs | submissions list/filter/paginate, mark-read, delete | M2, M3 |
| M5 | Frontend foundation | Next app skeleton, shared Layout/Header/Footer, meta/SEO, design port CSS | M0 |
| M6 | Public pages | all 14 + about/services/team/contact/thank-you/legal routes, forms wired | M3, M5 |
| M7 | Admin UI | `/admin/login` + `/admin` inbox (quotes & contacts), logout | M4, M5 |
| M8 | Data migration & parity | migrate legacy tables → Submission/AdminUser, count verification, dry-run | M0 |
| M9 | Hardening & QA | security audit, eslint/tsc/tests, Lighthouse, a11y, load/perf | M6, M7, M8 |
| M10 | Deployment & cutover | prod build, DNS/redirects (PHP→Next), cert, monitor, rollback | M9 |

---

## 3. Milestone detail

### M0 — Kickoff & tooling
**Objective:** Environment ready; real secrets rotated; nothing broken on the live legacy site.
- [ ] `git init`, create `.gitignore` (node_modules, .env*, *.sql, dist), commit baseline.
- [ ] Create `frontend/`, `backend/` folders (structure via `npx create-next-app@latest frontend`,
       `npm create express`… whatever chosen), verify `npm run dev` boots both.
- [ ] **Rotate secrets (docs/02 Step 0):** new DB password, new Gmail app-password, regenerate
      reCAPTCHA site+secret keys; update a secrets manager or the local device only (never commit).
- [ ] Local MySQL DB + a `.env` for backend (dev), `NEXT_PUBLIC_API_URL` + gateway setup (proxy
      `frontend/api/*` → backend).
- [ ] Add `.env.example` files (no values).
**DoD:** both apps boot locally; `git status` clean of secrets; no `.env`, `.sql` reachable via URL.

### M1 — Backend foundation
- [ ] Express 5 + TS app skeleton (`src/index.ts`, `app.ts`), cors/helmet/express.json.
- [ ] `prisma init`, `db/schema` (AdminUser, Submission), `prisma migrate dev --name init`, seed
      **one** admin user with bcrypt-hashed password (default dev, change later).
- [ ] Central error handler + 404; JSON logging (masked IPs); `GET /health`.
- [ ] `.env` loader + config validation (fail fast).
**DoD:** `GET /health` → 200 JSON; DB migrated; blank `AdminUser` + `Submission` tables exist;
`npm run lint && npm run typecheck && npm test` (bootstrap test) green.

### M2 — Auth (admin)
- [ ] `POST /api/v1/auth/login` (zod, compare bcrypt), issue signed JWT in httpOnly SameSite=Lax cookie.
- [ ] `GET /api/v1/auth/me` uses cookie; `POST /api/v1/auth/logout` clears.
- [ ] `requireAuth` middleware → 401 without token.
- [ ] Generic error message on failure (prevents admin-user enumeration).
**DoD:** curl-with-cookie flow: login (right creds) → `/me` OK; wrong creds → 401; no token → 401.
The legacy public-login bug is gone.

### M3 — Lead APIs (contact + quote)
- [ ] zod schemas (name/email/phone/services/message), mirrors legacy rules; honeypot field.
- [ ] Google reCAPTCHA verify via `fetch` (secret from env).
- [ ] `express-rate-limit` on both POSTs (e.g. 5/min/IP).
- [ ] `Submission` persistence (source QUOTE/CONTACT).
- [ ] `nodemailer` mailer service: SMTP env config, templated HTML, customer + admin emails,
      try/catch + log on failure (never break 200).
- [ ] Tests (node:test or vitest): valid request inserts+mail; validation failure → 400; rate limit → 429.
**DoD:** curl POST with real reCAPTCHA token goes to DB + sends 2 emails; invalid payload → 400 with
field errors; 6th request in a minute → 429.

### M4 — Admin data APIs
- [ ] `GET /submissions?source=&page=` (order createdDt desc, paginate), `PATCH ./:id/read`,
      `DELETE ./:id` behind `requireAuth`.
- [ ] Query via Prisma only; never raw param interpolation.
**DoD:** authenticated curl returns items; filters work; PATCH/DELETE respond 200/204; unauthenticated
→ 401.


### M5 — Frontend Foundation (Next.js App Router + shadcn/ui + Tailwind CSS)

**Objective:** Build the frontend foundation using Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui with page-based routing and reusable layouts.

> **Status — implemented 2026-08-08 on `feat/m5-frontend-foundation` (awaiting review).**
> DoD evidence: all 26 public routes prerender statically at `next build`; `npm run lint`,
> `npm run typecheck`, `npm run build`, `npm run format:check` pass; homepage renders with
> shared layout/Header/Footer on `npm run dev`.
>
> **Typography decision (per M5 brief, recorded):** legacy Muli was retired from Google Fonts —
> body uses **Mulish** (Muli's official successor) and headings use **Comfortaa**, both via
> `next/font` (`--font-muli` / `--font-comfortaa` CSS vars). Brand palette mapped to shadcn
> tokens in `frontend/src/app/globals.css` (`#17B788` primary green, `#0D1432` navy,
> `#091B4B` footer, `#74777B` ink).

#### Tasks

##### Project Setup
- [x] Initialize the project with the latest Next.js (App Router) and TypeScript.
- [x] Configure Tailwind CSS.
- [x] Install and configure shadcn/ui.
- [x] Configure ESLint, Prettier, path aliases, and environment variables.

##### Folder Structure
- [x] Create a scalable App Router structure.

```
app/   (implemented under src/app per create-next-app convention)
├── layout.tsx
├── page.tsx
├── loading.tsx
├── error.tsx
├── not-found.tsx
├── about/
│   └── page.tsx
├── services/
│   ├── page.tsx
│   ├── hvac/
│   │   └── page.tsx
│   ├── electrical/
│   │   └── page.tsx
│   ├── plumbing/
│   │   └── page.tsx
│   ├── fit-out/
│   │   └── page.tsx
│   ├── renovation/
│   │   └── page.tsx
│   ├── wood-work/
│   │   └── page.tsx
│   ├── tiling/
│   │   └── page.tsx
│   ├── ceiling/
│   │   └── page.tsx
│   ├── glass-aluminium/
│   │   └── page.tsx
│   ├── cleaning/
│   │   └── page.tsx
│   ├── lighting/
│   │   └── page.tsx
│   ├── steel-works/
│   │   └── page.tsx
│   └── waterproofing/
│       └── page.tsx
├── our-team/
│   └── page.tsx
├── contact/
│   └── page.tsx
├── privacy-policy/
│   └── page.tsx
├── terms-and-conditions/
│   └── page.tsx
├── refund-policy/
│   └── page.tsx
└── thank-you/
    └── page.tsx
```

##### Layout & UI
- [x] Create a global layout (`layout.tsx`).
- [x] Build reusable Header, Navigation, Footer, and Mobile Menu components.
- [x] Configure the design system using shadcn/ui.
- [x] Apply the company branding (colors, typography, logo, spacing).
- [x] Create reusable UI components (Button, Card, Input, Dialog, Sheet, etc.).

##### SEO
- [x] Configure page metadata using the Next.js Metadata API.
- [x] Add Open Graph, Twitter Cards, and canonical URLs.
- [x] Generate `robots.txt` and `sitemap.xml`.
- [x] Add the Google AdSense script to the root layout.

##### Development Configuration
- [x] Configure API rewrites:

```ts
/api/v1/* → http://localhost:<BACKEND_PORT>/api/v1/*
```

- [x] Configure `next/font` for optimized typography.
- [x] Configure image optimization.

#### Definition of Done (DoD)

- ✅ App Router page structure completed.
- ✅ All public routes created with `page.tsx`.
- ✅ Global layout, Header, and Footer implemented.
- ✅ shadcn/ui integrated successfully.
- ✅ Responsive navigation completed.
- ✅ SEO metadata configured.
- ✅ `npm run dev`, `npm run lint`, `npm run typecheck`, and `npm run build` pass successfully.
- ✅ Homepage renders correctly with shared layout and reusable components.

### M6 — Public pages & forms
- [ ] Data components: services data array (14 services, slug, title, description, imagery) reused by
      service index + detail pages.
- [ ] Build each page per FR-01 using shared `PageHero`/`ServiceCard`/`Banner` components.
- [ ] `<ContactForm>` + `<QuoteForm>` client components: controlled inputs, client reCAPTCHA widget,
      POST to `/api/v1/contact|quote`, success → route `/thank-you`, field error UI, loading/disable.
- [ ] `/thank-you`, `/contact`, `/about`, `/our-team`, legal pages.
- [ ] 301 migrate map: old slugs (`/hvac`) → new (`/services/hvac`) via `next.config` redirects.
**DoD:** click-through of every public page works, forms submit end-to-end to M3 API, URL redirects
from legacy slugs verified.

### M7 — Admin UI
- [ ] `/admin/login` page: email+password → `POST /auth/login`, httpOnly cookie; redirect to `/admin`.
- [ ] `/admin` (protected layout): two tabs “Quotes” / “Contacts” calling `/submissions`, tables like
      legacy (name/email/phone/services/message/date), mark-read + delete buttons, `mailto:`/`wa.me` links.
- [ ] route guard: server session check via `getServerSession`/cookie fetch → redirect to login.
**DoD:** an admin logs in, sees both lead types, filters, marks read/delete (with confirm); logged-out
admin is bumped to `/admin/login`.

### M8 — Data migration (read-only legacy → new)
- [ ] One-time script `backend/scripts/migrate-legacy.ts`:
      connect to old dump/lib MySQL, `SELECT` all rows from `freequote`,`contactcontact`,`indexcontact`,
      normalize `date`/`time` string (e.g. `26-Apr-2025 02:35:29 PM` → parse ISO), write as `Submission`.
      `login` → `AdminUser` (bcrypt hash; relation); verify `COUNT(*)` per source == legacy.
- [ ] Run against dry-run copy first; show diff report for sign-off.
- [ ] Business approval → run against live new DB; keep old `.sql` dump as offline backup.
**DoD:** counts match exactly; spot-check 10 records (name/email/services/date); admins can log in
with the verified password (or password enforced reset). No legacy tables altered or deleted yet.

### M9 — Security, QA, hardening
- [ ] Full endpoints security review against `docs/02-security-plan.md` steps 1–8: prepared
      statements, escaping, CSRF/CORS, helmet, rate limits, reCAPTCHA, secret logging.
- [ ] `ESLint + TS strict` green; unit tests for validation + auth + migration script.
- [ ] Playwright/e2e smoke: home → quote, contact → thank-you, admin login → inbox.
- [ ] Lighthouse (mobile ≥90 home, ≥85 all main pages); accessibility scan (axe) fixes.
- [ ] Manual security sheet: (invalid login, reCAPTCHA open across tabs, XSS via <script> in contact
      name on admin view, spammers rate-limited).
**DoD:** no failing critical check; screenshots/Percy snapshot list reviewed and signed.
*M9 continues:* image perf pass (webp, explicit sizes) + SEO metadata final pass.

### M10 — Deployment & cutover
- [ ] Build docs: `npm run build` backend + frontend; copy static output.
- [ ] Config target env (MySQL credentials, JWT_SECRET, SMTP, reCAPTCHA, Next cache) on prod server /
      Vercel settings; verify `/health` and admin login on prod.
- [ ] DNS/HTTPS: point domain to new node; force HTTPS; keep `301` rewrite from
      `*.php` clean URLs (e.g. `/about.php` → `/about`) until SEO crawls transition.
- [ ] Old PHP retired: `*.php` no longer served (redirect to new site) — keep archive zip of legacy.
- [ ] Run through `docs/01-code-review-findings.md` checklist as final sanity check; then follow
      `docs/05-deployment-checklist.md` ops items.
**DoD:** live domain serves Next pages + `/api/v1` from Express + MySQL prod; forms + admin tested on
prod; old `.php` paths receive 301s; rollback plan (flip DNS back / restore PHP) exists and tested.

## 4. Execution protocol

- We execute **milestone by milestone**: after each milestone, we review (approve) and note
  acceptance evidence in this doc (checkmark in box) before the next start.
- Branch policy: `main` always green; work in `feat/` branches per milestone (git is initialized in
  M0).
- If a contradiction with the frozen BRD/SRS arises, raise note and stop.

*End.*