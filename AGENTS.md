# AGENTS.md

Telal Al Qema Building Contracting — legacy flat procedural PHP/MySQLi site (Dubai) that is **a git repo** (initialized at M0, `main` always green, per-milestone `feat/` branches) alongside the approved rebuild: `frontend/` (Next.js 16 App Router + Tailwind v4 + TS) and `backend/` (TypeScript; Express 5 + Prisma 7 + MySQL landed from M1). The legacy PHP has no framework, no Composer, no tests. `docs/00-...08-*.md` is the modernization roadmap; read `docs/00-readme-roadmap.md` first and treat `docs/02-security-plan.md` as the P0 mandate.

## Target architecture (agreed rebuild, docs/06–08)

The business has approved rewriting the site as two apps, executed milestone-by-milestone per `docs/08-implementation-plan.md` (M0 starts with git init + scaffold): `frontend/` = Next.js (App Router, TS), `backend/` = Express 5 + Prisma 7 + MySQL. Requirements and contracts live in `docs/06-brd.md` + `docs/07-srs.md`. The legacy PHP site stays live until cutover (M10). At M0 the scaffolds boot: `frontend/` = working Next.js 16 app (dev on :3000, `/api/v1/*` proxied to :4000); `backend/` = minimal bootable TS dev server (dev on :4000, `/health` 200) pending the M1 Express app.

## Environment & verification

- Legacy PHP verification is limited to `php -l <file>` (requires PHP on PATH; not currently installed on this machine). New-stack verification: `frontend` → `npm run dev`, `npm run lint`, `npx tsc --noEmit`; `backend` → `npm run dev` (tsx watch), `npm run build` (tsc → `dist/`)». Tools: Node 22, git, npm (pnpm not installed → npm per kickoff decision).
- Local MySQL = **standalone MySQL 8.0.46, no XAMPP**, at `127.0.0.1:3301` (custom `port=3301` in `C:\ProgramData\MySQL\MySQL Server 8.0\my.ini`). Dev db `telalalqema`, app user `telal` (creds in gitignored `backend/.env`; `DATABASE_URL=mysql://telal:<pw>@127.0.0.1:3301/telalalqema`). Client: `C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe`.
- The legacy PHP web-root `.env` (real prod SMTP/reCAPTCHA/DB creds, gitignored) is still read by `server.php`, which dies with "Configuration error" if `DB_NAME`/`DB_USER` are missing; MySQLi strict mode + utf8mb4 are on.
- DB handle is `$connect` (mysqli), created by `include 'server.php'` (6 pages do this). Real tables: `freequote`, `contactcontact`, `indexcontact`, `login` — **there is no `user` table**.

## Architecture (current reality; docs describe a future state)

- One standalone `.php` per page (`index.php`, `hvac.php`, ...). Every page duplicates the full `<head>` block (jQuery/Bootstrap/FontAwesome loaded 2–4×). `include/header.php` + `include/footer.php` are shared by most pages. A new page must copy the head block to match current convention (or follow the shared-`head.php` plan in `docs/03`).
- `.htaccess` (top block, docs/02 STEP 1): deny `.env`/`.sql`/`config.*.php`/`server.php`/`*.md`/`.log` etc. + 403 on `/.git|include|PHPMailer|docs/`. Below that: GET `*.php` → 301 to clean URL, with internal rewrite back. Test clean URLs (e.g. `/about`, not `/about.php`); forms post to `sendmailcontact` / `sendmailquotation` (no `.php`).
- PHPMailer is bundled twice (root + `include/PHPMailer/`); use the root copy as the sendmail files do.
- Reference pattern for new PHP: `sendmailcontact.php` / `sendmailquotation.php` — trim input with `?? ''`, prepared statements, reCAPTCHA, PHPMailer in try/catch, config via `getenv()`.

## Known broken / dangerous — do not trust these

- `login.php:10` compares hardcoded literals, so **any credentials log in** (`$_SESSION['open']=1`) → `detail.php` (admin inbox) is effectively public.
- `register.php` includes empty `config.php` (dead file), uses undefined `$con`, inserts into non-existent `user`, `sha1()` hashing, and arbitrary file upload to `admin/user/`. Expect it to fail.
- `config.php` and `google_callback.php` are empty dead files (listed for deletion in docs).
- `.env` and `u358308469_telalalqema.sql` (4 MB prod dump) sit in the web root and contain **real production DB/SMTP/reCAPTCHA credentials** — never echo, log, or otherwise propagate them. `.htaccess` now blocks them via URL, but the *live files should still be deleted/moved out of the web root and full secrets rotated* (docs/02 STEP 0) — outstanding manual action for the owner, not done at M0.

## Conventions

- Site is English, Dubai contracting; AdSense ID `ca-pub-3498544422186445` is embedded in every page `<head>`.
- Golden rules from docs/00: never put credentials in source, never trust user input, never echo raw user data, escape all output.
