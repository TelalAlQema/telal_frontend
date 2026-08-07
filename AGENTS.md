# AGENTS.md

Telal Al Qema Building Contracting — legacy flat procedural PHP/MySQLi site (Dubai). No framework, no Composer, no tests, **not a git repo**. `docs/00-...05-*.md` is the modernization roadmap; read `docs/00-readme-roadmap.md` first and treat `docs/02-security-plan.md` as the P0 mandate.

## Target architecture (agreed rebuild, docs/06–08)

The business has approved rewriting the site as two apps, executed milestone-by-milestone per `docs/08-implementation-plan.md` (M0 starts with git init + scaffold): `frontend/` = Next.js (App Router, TS), `backend/` = Express 5 + Prisma 7 + MySQL. Requirements and contracts live in `docs/06-brd.md` + `docs/07-srs.md`. The legacy PHP site stays live until cutover (M10). `frontend/` and `backend/` folder are currently empty scaffolds — do not treat them as buildable.

## Environment & verification

- No build/lint/test tooling exists. The only verification available is `php -l <file>` (requires PHP on PATH; not currently installed on this machine).
- Local dev = XAMPP/Apache + MySQL. To run: import `u358308469_telalalqema.sql`, set local DB creds in `.env`. `server.php` reads `.env` at runtime and dies with "Configuration error" if `DB_NAME`/`DB_USER` are missing; MySQLi strict mode + utf8mb4 are on.
- DB handle is `$connect` (mysqli), created by `include 'server.php'` (6 pages do this). Real tables: `freequote`, `contactcontact`, `indexcontact`, `login` — **there is no `user` table**.

## Architecture (current reality; docs describe a future state)

- One standalone `.php` per page (`index.php`, `hvac.php`, ...). Every page duplicates the full `<head>` block (jQuery/Bootstrap/FontAwesome loaded 2–4×). `include/header.php` + `include/footer.php` are shared by most pages. A new page must copy the head block to match current convention (or follow the shared-`head.php` plan in `docs/03`).
- `.htaccess`: GET `*.php` → 301 to clean URL, with internal rewrite back. Test clean URLs (e.g. `/about`, not `/about.php`); forms post to `sendmailcontact` / `sendmailquotation` (no `.php`).
- PHPMailer is bundled twice (root + `include/PHPMailer/`); use the root copy as the sendmail files do.
- Reference pattern for new PHP: `sendmailcontact.php` / `sendmailquotation.php` — trim input with `?? ''`, prepared statements, reCAPTCHA, PHPMailer in try/catch, config via `getenv()`.

## Known broken / dangerous — do not trust these

- `login.php:10` compares hardcoded literals, so **any credentials log in** (`$_SESSION['open']=1`) → `detail.php` (admin inbox) is effectively public.
- `register.php` includes empty `config.php` (dead file), uses undefined `$con`, inserts into non-existent `user`, `sha1()` hashing, and arbitrary file upload to `admin/user/`. Expect it to fail.
- `config.php` and `google_callback.php` are empty dead files (listed for deletion in docs).
- `.env` and `u358308469_telalalqema.sql` (4 MB prod dump) sit in the web root and contain **real production DB/SMTP/reCAPTCHA credentials** — never echo, log, or otherwise propagate them; `.htaccess` has no deny rules yet.

## Conventions

- Site is English, Dubai contracting; AdSense ID `ca-pub-3498544422186445` is embedded in every page `<head>`.
- Golden rules from docs/00: never put credentials in source, never trust user input, never echo raw user data, escape all output.
