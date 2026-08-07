# Telal Al Qema — Codebase Modernization Plan

## Start here: master roadmap

This codebase is a legacy, flat PHP (procedural, MySQLi) website. It works, but it has
**critical security holes** and an architecture that does not scale. This plan is a
prioritized, step-by-step guide to bring it up to modern standards.

---

## Current Status (quick summary)

- **Language:** PHP (no version guarantee, legacy ~5.6/7.x style), MySQLi procedural + manual `$_POST`
- **No framework, no composer, no autoloading, no tests**
- **No separation of concerns** — HTML, PHP, JS, and DB queries are mixed in every file
- **All 14+ service pages duplicate the entire `<head>` block** (each loads Bootstrap/FontAwesome/jQuery multiple times)
- Two duplicate `PHPMailer/` copies; empty files (`config.php`, `google_callback.php`); dead code
- A `.env` file **sits inside the public web root** and contains real production DB/SMTP secrets

---

## PRIORITY LEVELS

| Level | Timeline | What |
|-------|----------|------|
| **P0 — CRITICAL** | Do this week | Security: rotate leaked secrets, fix the broken login, stop SQL injection, protect `.env`, remove hardcoded passwords |
| **P1 — IMPORTANT** | 1–3 weeks | Modernize config, centralize DB/email, add CSRF + rate limiting, sanitize all output, secure sessions |
| **P2 — STRUCTURE** | 1–2 months | Introduce a simple architecture (front controller + router, templates, services, repositories) or adopt a light framework |
| **P3 — QUALITY** | 2–4 months | Composer, PHPCS/PHPStan, unit + integration tests, CI, proper logging, migrations |
| **P4 — PERFORMANCE & OPS** | Ongoing | Asset bundling, caching, CDN, monitoring, staging env |

---

## Roadmap — 5 phases

1. **Phase 0: Environment setup** — install a modern local dev stack (XAMPP/PHP 8.x), git, run the site.
   → see `docs/04-environment-setup.md`
2. **Phase 1: Critical security fixes (P0)** — the ONLY thing that matters right now.
   → see `docs/02-security-plan.md`
3. **Phase 2: Structural modernization (P1–P2)** — config, router, DI-lite, templates.
   → see `docs/03-modernization-plan.md`
4. **Phase 3: Development workflow (P3)** — Composer, tests, CI, code style.
   → see `docs/03-modernization-plan.md` (`Phase E` section)
5. **Phase 4: Ops & monitoring (P4)** — caching, logging, monitoring, backup.
   → see `docs/05-deployment-checklist.md`

> **Golden rules throughout:** Never put credentials in source. Never trust user input.
> Never `echo` raw user data. One file = one job. Version everything.