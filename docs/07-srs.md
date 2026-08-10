# 07 — Software Requirements Specification (SRS)

> Telal Al Qema Building Contracting — Modern Rebuild (Next.js + Express + Prisma + MySQL)
> Version: 1.0 · Status: Draft · Maps to `docs/06-brd.md` (BR-*) and `docs/08-implementation-plan.md`

---

## 1. Introduction

### 1.1 Purpose
The functional and technical specification for rebuilding the company site as two decoupled
applications: `frontend/` (Next.js, TypeScript) and `backend/` (Express + Prisma, TypeScript),
against MySQL. Describes what each app must do, the API contract, the data model, and acceptance
conditions that define "done".

### 1.2 References
- Legacy reality: `AGENTS.md`, `docs/01-code-review-findings.md` (verified issues)
- Security mandate: `docs/02-security-plan.md` (P0)
- Business: `docs/06-brd.md`

### 1.3 Definitions / abbreviations
FR = functional requirement, NFR = non-functional requirement, DoD = definition of done,
Lead = a contact or quotation submission.

---

## 2. Overall description

### 2.1 Architecture (target)
```
frontend/  Next.js latest (App Router, TypeScript, Tailwind) — public pages + admin UI
   \--/api/v1/*  →  proxied to backend during dev; production on same domain
backend/   Express latest (TypeScript) — API only
   \-- Prisma ORM → MySQL 8
Monorepo, single repo, `frontend/` + `backend/` folders, dotenv conf per app.
```
- Legacy `.php` files stay untouched **until cutover** (M10) so no risk during build-out.
- Both apps share the domain (e.g. `/` Next, `/api/*` Express) via reverse proxy / Next rewrites.

### 2.2 Design language
- Port the current brand: green+white scheme, header/nav, footer, banners, images. Keep visual
  identity; do **not** redesign (freeze look via screenshots of the live site).

---

## 3. Functional requirements

### FR-01 Public pages
All pages render server-side (SSR) with unique title + meta description; layout is one shared
Header/Footer component.

| Route | Legacy file | Notes |
|---|---|---|
| `/` | index.php | hero, services carousel, quote form, About/CTA |
| `/about` | about.php | company profile |
| `/services` | mainservices.php | index of all services |
| `/services/hvac` | hvac.php | HVAC Installation & Maintenance |
| `/services/electrical` | electrical.php | Electrical System Installation & Maintenance |
| `/services/home-automation` | automatication.php | Home Automation System |
| `/services/plumbing` | plumbing.php | Plumbing |
| `/services/fit-out` | fitout.php | Fit Out |
| `/services/renovation` | renovation.php | Renovation |
| `/services/wood-work` | woodwork.php | Wood Work / Carpentry |
| `/services/tiling` | tiling.php | Tiling Works |
| `/services/ceiling` | ceiling.php | Ceiling Works |
| `/services/glass-aluminium` | glass.php | Glass & Aluminium Works |
| `/services/cleaning` | cleaning.php | Home & Office Cleaning |
| `/services/lighting` | light.php | Light on Furniture |
| `/services/steel-works` | steel.php | Steel Works |
| `/services/waterproofing` | waterproof.php | Waterproofing |
| `/our-team` | ourteam.php | Team page |
| `/contact` | contact.php | Contact form |
| `/thank-you` | thankyou.php | Post-submit success screen |
| `/privacy-policy` | policy.php | Privacy policy |
| `/terms-and-conditions` | term.md → term.php | Terms & conditions |
| `/refund-policy` | refund.php | Refund & cancellation policy |

> Route naming may be adjusted at M6, but the URL set must stay stable for SEO. Old clean URLs
> (e.g. `/hvac`, `/about`) redirect (301) to new routes where they differ.

### FR-02 Contact form (`/contact`, home)
- Fields: `name`, `email`, `phone`, `services`(`<select>` with the 12-service catalog), `comment`.
- Client validation mirrors today's rules: name letters+spaces 2–100, email valid, phone 7–15 digits,
  message ≤ 1000 chars, block `<`/`{` and links.
- Server re-validates (zod) and rejects invalid input with 422 + localized message.
- reCAPTCHA: site key on client, secret verified server-side (`fetch` to Google, not `file_*`).
- Honeypot field (hidden, must stay empty). Rate limit by IP.
- On success: create lead, send **customer** confirmation email + **admin** notification email
  (SMTP via nodemailer), return success (Next redirects to `/thank-you`).
- On failure: return field errors; UX shows SweetAlert-equivalent message as today.

### FR-3 Quote form (home page)
Same as FR-2 except no `message` field (quote: name/email/phone/services), and lead marked
`source = QUOTE`. Emails/redirect match today (short quote → `/thank-you`).

### FR-4 Email notifications (nodemailer)
- Config from env (`SMTP_HOST/USER/PASS/PORT`), STARTTLS 587, from `info@telal-contracting.com`.
- To customer: branded HTML "Thank You / We received your request.".
- To admin: "New Contact/Quote Request" with replying `Set reply-to` = lead email.
- Failures are logged, never crash the request; guard against header injection (validate email).

### FR-5 Spam mitigation
- reCAPTCHA (v2 checkbox) on both forms, verified server-side.
- `express-rate-limit` on `POST /api/v1/contact` + `/quote`, e.g. 5/min per IP.
- Honeypot; input length caps; block `[\r\n]` in email, `<`/links in name/message.

### FR-6 Admin authentication
- `POST /api/v1/auth/login`: verify email + `bcrypt` hash against `AdminUser`. On success:
  - `session_regenerate`-equivalent: re-issue JWT, set **httpOnly, SameSite=Lax, Secure** cookie,
    store up to 8h; store `lastLoginAt`.
- `GET /api/v1/auth/me`: returns admin identity if cookie valid.
- `POST /api/v1/auth/logout`: clears cookie.
- Middleware `requireAuth` on `/submissions*`. Wrong data → 401, no info leak ("invalid credentials").
- **Kills the legacy bug:** verification is against a real hash in the DB; the old
  literal-comparison login at `login.php:10` is not reproduced.

> Note: Legacy `login` table stores plaintext `telal786` for `info@telal-contracting.com`. In new
> `AdminUser` we store only `bcrypt` hashes. Rotation + the migration in M8 will fail-close.

### FR-7 Admin inbox (`GET /api/v1/submissions`)
- Authenticated only. Returns leads ordered newest-first, filterable by `source`
  (`QUOTE` default view, `CONTACT`, `INDEX_CONTACT`), paginated (e.g. 25/page).
- Fields returned: id, source, name, email, phone, services, message, createdAt, readStatus.
- UI (`/admin`) is two tables like today (quote vs contact) plus optional read/archive flag and
  delete (delete delegated to admin after confirm — optional `DELETE`).
- **Never** echo user input raw — React escapes by default; links file ((a opens mailto/wa)) uses
  URL-encoding for phone/email.

### FR-8 Data model (Prisma)
```prisma
enum SubmissionSource { QUOTE CONTACT INDEX_CONTACT }

model AdminUser {
  id          Int      @id @default(autoincrement())
  email       String   @unique
  passwordHash String
  lastLoginAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Submission {
  id        Int              @id @default(autoincrement())
  source    SubmissionSource
  name      String
  email     String
  phone     String
  services  String
  message   String?
  ip        String?                    // stored masked for spam metrics
  read      Boolean      @default(false)
  createdAt DateTime     @default(now())
  @@index([source, createdAt])
}
```
Rationale: legacy `freequote`, `contactcontact`, `indexcontact` all share the same shape → unified
`Submission.source` enum (equivalent fields), proper types (`DateTime` instead of `varchar date/time`,
`TEXT` message), no `user` table (broken/unsupported today).

### FR-9 SEO & meta
- Every page route provides `<title>`, meta description, OG + canonical, from a route config;
- AdSense account tag stays in `<head>` of all public pages.
- `sitemap.xml` + `robots.txt` from Next metadata API.
- Covertout HTTPS (hardcode `https://www.tel` URLs only).

### FR-10 Error handling
- Backend: central error middleware; unknown route → 404 JSON; validation → 400 with field list;
  unhandled → 500 generic JSON + `console.error` (log).
- Frontend: error as `not-found.tsx` (404) + `error.tsx` (generic retry), form-level messages.

---

## 4. Non-functional requirements

| ID | Category | Requirement |
|---|---|---|
| NFR-01 | Security | Prisma prepared statements only; zod validation; reCAPTCHA; rate limit; helmet; CORS allowlist; bcrypt; JWT httpOnly cookie; no secrets in frontend bundle |
| NFR-02 | Privacy | `email`, `phone`, `ip` NOT logged in plaintext in app logs — masked/absent |
| NFR-03 | Perf | Lighthouse ≥ 90 mobile home; no jQuery; optimize images (webp), lazy below-the-fold |
| NFR-04 | Compatibility | Modern browsers (last 2 versions); mobile-first; responsive preserved |
| NFR-05 | Maintainability | `npm` scripts: `lint`, `typecheck`, `test`, `build`; folder/module separation; PR review |
| NFR-06 | Accessibility | semantic landmarks, labels on all form inputs, focus-visible, alt on images |
| NFR-07 | Deployment | zero-downtime cutover; one-command deploy; rolling back = old PHP alive |

---

## 5. API contract (`/api/v1`)

| Method | Path | Auth | Body/Query | Success | Errors |
|---|---|---|---|---|---|
| POST | `/contact` | visitor | `{name,email,phone,services,message?,g-recaptcha-response}` | 200/201 `{ok:true}` | 400 validation, 429 rate, 502 email fail |
| POST | `/quote` | visitor | same w/o message | 200 `{ok:true}` | 400/429/502 |
| POST | `/auth/login` | no | `{email,password}` | 200 `{ok:true}` + Set-Cookie | 401 invalid |
| GET | `/auth/me` | cookie | – | 200 `{email}` | 401 |
| POST | `/auth/logout` | cookie | – | 200 | – |
| GET | `/submissions` | admin | `?source=QUOTE&page=1` | 200 `{items,pages}` | 401/403 |
| PATCH | `/submissions/:id/read` | admin | `{}` | 200 | 404/401 |
| DELETE | `/submissions/:id` | admin | – | 204 | 404/401 |
| GET | `/health` | no | – | 200 `{status:'ok'}` | – |

All responses JSON; auth via httpOnly cookie `telal_admin`; CORS: same-origin/proxy, allowlist.

---

## 5. Configuration / environment

| App | Var | Purpose |
|---|---|---|
| backend | `DATABASE_URL` | `mysql://user:pass@host:3306/telal...` (Prisma) |
| backend | `JWT_SECRET` | sign admin tokens (≥32 chars) |
| backend | `SMTP_HOST/USER/PASS/PORT` | mail |
| backend | `RECAPTCHA_SECRET` | server-side verify |
| backend | `CORS_ORIGIN`, `APP_PORT` | api listener |
| frontend | `NEXT_PUBLIC_API_URL` | `/api/v1` base for the (or proxy) |
| frontend | `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | client widget |

`.env.example` committed; real `.env` never committed. Secrets in the repo today (`.env`,
`u358308469_telalalqema.sql`, hardcoded SMTP in `sendmailquotation.php`) **must be rotated** first
(see `docs/02-security-plan.md`).

---

## 6. Database migration requirements

- Source: legacy MySQL tables `freequote`, `contactcontact`, `indexcontact`, `login`.
- Migration script (M8): read all rows via MySQLi fallback connection (or a Prisma `legacy` model),
  normalize (`Contact v` from `date`/`time` string; `INDEX_CONTACT` source), insert to `Submission`
  and `AdminUser` (bcrypt-hash the existing admin password; force reset afterwards), verify
  `COUNT(*)` equivalence, then delete the legacy tables **only after** the business sign-off.
- Keep the legacy `.sql` dump as an offline backup until

---

## 7. Data dictionary (ports)

| Legacy | New | Transform |
|---|---|---|
| `freequote` → | `Submission source=QUOTE` | message NULL |
| `contactcontact` → | `Submission source=CONTACT` | message = comment |
| `indexcontact` → | `Submission source=INDEX_CONTACT` | message = comment |
| `login` (email/password) | `AdminUser` (email + bcrypt) | hash login password; reset |

---

## 8. Definition of done (per requirement)

Each FR is only "done" when:
- implemented in backend + (frontend UI if applicable),
- `.env` schema applied with Prisma, lint/typecheck/pass,
- secure-manual test (invalid creds, bot payloads, rate limit, thank-you flow),
- not regress: Lighthouse/perf check for pages touched.

*Next: `docs/08-implementation-plan.md` sequences all this into milestones with acceptance criteria.*