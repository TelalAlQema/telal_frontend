# 06 — Business Requirements Document (BRD)

> Telal Al Qema Building Contracting — Website Rebuild (Next.js + Express + Prisma + MySQL)
> Version: 1.0 · Status: Draft · Owner: Business Owner / Dev Lead

---

## 1. Document purpose

This document defines **what** the rebuilt website must achieve for the business and **why**,
before any technical detail in `docs/07-srs.md`. It is written for non-technical stakeholders
(company owner, marketing) and the development team.

## 2. Background & context

The current site (legacy flat PHP/MySQLi, `*.php` in the web root) has been live for years and
generates **real business leads** (contact + quotation enquiries, stored in MySQL). It works but is:

- **Insecure** — `login.php` grants admin access to anyone (any credentials succeed), real
  production DB/SMTP/reCAPTCHA secrets sit in the public web root, no SQL-injection/XSS defenses.
- **Unmaintainable** — ~25 standalone pages each duplicate the full `<head>` block, mixed HTML/PHP/JS.
- **Hard to extend** — no framework, no components, no tests, no build tooling, not under git.
- **Spam-heavy** — old contact data shows thousands of junk bot submissions (see legacy tables).

The business outcome we want: **a secure, fast, maintainable corporate website that continues
delivering genuine quotes/contacts to Telal's inbox without interruption.**

## 3. Stakeholders

| Stakeholder | Interest |
|---|---|
| Company owner / admin | Receives and reviews inbound enquiries; manages site access |
| Marketing | SEO, content updates, AdSense revenue |
| Site visitors (Dubai residents/businesses) | find services, get a quote, contact the company |
| Developer team | build and maintain frontend + backend long-term |

## 4. Business goals & objectives

The rebuild must deliver, in order:

1. **G1 — Security:** No public path to admin data; no secrets reachable online; every form input
   validated server-side. *Success: passing the checks in `docs/02-security-plan.md`.*
2. **G2 — Lead continuity:** Contact + quote forms work identically to today (store + email customer +
   email admin) with **no lead lost** during the cutover.
3. **G3 — Modern stack:** frontend `Next.js` + backend `Express/Prisma` + `MySQL`, in two folders
   (`frontend/`, `backend/`), under version control, with committed, reproducible builds.
4. **G4 — Maintainability:** one shared layout/design system; each page is a component; no duplicated
   `<head>` HTML; admin inbox is a real, authenticated product.
5. **G5 — Performance & SEO:** Pages load fast (modern as system images, minimal JS), unique titles/
   descriptions, clean URL structure preserved (`/about`, `/hvac`, …).

## 5. Scope

### In scope
- All public pages (home, about, team, services index + 14 service pages, contact, thank you, legal).
- Contact form + free-quote form (submit → store + reCAPTCHA + emails).
- Admin login/logout and admin inbox (view quotes + contact submissions).
- Migration of existing MySQL data (`freequote`, `contactcontact`, `indexcontact`, `login`) into the
  new schema before cutover (read-only import; old data preserved).
- SEO titles/descriptions, meta, AdSense tag, favicon, clean URLs.

### Out of scope (for this project now)
- Registration of public accounts, file uploads, social login (all currently broken, not requested).
- CMS / page editor; content lives in Next.js code.
- Arabic localization; new services or new pricing.

## 6. Users & personas

| Persona | Jobs to be done |
|---|---|
| Visitor | browse services, understand company, submit contact/quote request, see thank-you |
| Admin/owner | log in securely, review new requests, reply by email/WhatsApp, log out |

## 7. Business requirements

Priorities: **M** = Must, **S** = Should, **C** = Could.

| ID | Requirement | Priority |
|---|---|---|
| BR-1 | All current public pages exist with equivalent content & visual identity (green theme, header, footer) | M |
| BR-2 | Contact form saves a lead, emails customer confirmation + admin notification, shows success screen | M |
| BR-3 | Quote form does the same and is accessible from home | M |
| BR-4 | Admin can log in with a **strong real** password (no login-by-literal bug); sessions expire | M |
| BR-5 | Admin inbox lists and reads the same two lead types today's admin sees (quotes + contacts) | M |
| BR-6 | No production secret is stored in the public web root or in source | M |
| BR-7 | Clean URLs used today keep working (behind `.php` rewrites stay as `301`s where needed) | M |
| BR-8 | Spam mitigation stays for both forms (reCAPTCHA + rate limit + honeypot); significantly fewer junk leads | M |
| BR-9 | Site is fully under git with `frontend/` and `backend/` folders and reproducible builds | M |
| BR-10 | Existing admin login credentials continue to work after migration, else documented password reset | S |
| BR-11 | Admin inbox allows filtering by type and shows dated/timed submissions | S |
| BR-12 | Deployment can happen without downtime | S |
| BR-13 | SEO data visibility: unique `<title>` + meta description per page, AdSense code running after deployment | S |
| BR-14 | Basic automated checks (lint, types, unit tests) run before every release | S |

## 8. Assumptions, constraints, dependencies

- **Assumptions:** MySQL remains the database; hosting supports Node.js + MySQL; the current domain
  `telal-contracting.com` stays; contact email `info@telal-contracting.com` and SMTP account remain
  (secrets to be rotated — see `docs/02` Step 0).
- **Constraints:** legacy app runs unchanged until cutover; old data must not be destroyed;
  no budget for a new framework/cloud unless approved.
- **Dependencies:** access to the hosting control panel / DNS; a fresh set of rotated credentials.

## 9. Success metrics (KPIs)

| Metric | Target |
|---|---|
| Leads collected during migration | no loss (compare counts pre/post) |
| Lead spam | below today's rate (rate limit + captcha active) |
| Dev-time to deliver milestone M1–M3 (backend) | per milestone |
| Admin access without valid credentials | always denied |
| Page speed (Lighthouse on home) | ≥ 90 mobile |

## 10. Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Data loss during migration | Low | High | live DB backup, dry-run script, verify counts |
| Admin blocks themselves (forgot password) | Med | Med | documented reset flow, seed a known admin after rotation |
| Prolonged downtime at cutover | Med | High | dark-launch: build/test behind `.env`, switch DNS last |
| Scope creep (design rewrite creep) | Med | Med | freeze design in screenshot/Specify plan; port visuals |

---

*Next: `docs/07-srs.md` maps every BR above to concrete functional/non-functional requirements and an API/data contract.*