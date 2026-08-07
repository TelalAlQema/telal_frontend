# 05 — Deployment + Ops Checklist (P3/P4)

When you are moving to production or a real hosting plan.

---

## Hosting: what to ask for / avoid

- Avoid "shared hosting with PHP 5.6". Get **PHP 8.1+ (ideally 8.2/8.3)**.
- **Prefer a host with:**
  - SSH access
  - PHP CLI (for composer/queues)
  - `.env` outside the docroot OR support for its own config approach
  - `mod_rewrite` / Nginx needed for clean URLs you already use
- cPanel users: use **public_html** as the docroot; put `.env`, `docs/`, `vendor/`, `storage/` ABOVE it if possible
  (e.g. your home dir). Otherwise block them via `.htaccess` + server config (see `02-security-plan.md` STEP 1).

## Deployment steps

1. **Backup** current live DB + files (export, store offsite).
2. Rotate ALL secrets (see security doc STEP 0).
3. Build locally, run phpstan + phpunit (see `03-modernization-plan.md` Phase E), commit to a `git` remote.
4. On server: `git pull` into a clean dir, `composer install --no-dev --optimize-autoloader`.
5. Set `.env` to production values.
6. Apply `.htaccess` security rules from `02-security-plan.md` (STEP 1).
7. Move uploads storage + logs out of the web root.
8. HTTPS: enable TLS, then set `Secure` cookies, force https:
   ```apache
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
   ```
9. Keep your existing **clean URL** rules (they already exist in `.htaccess`).

## Monitoring & hygiene

- **Log errors** to `storage/logs/app.log` (`error_reporting(E_ALL); ini_set('display_errors','0');`).
- **Backup** DB nightly (`mysqldump`) + store offsite/automated.
- **Security headers** from `02-security-plan.md` STEP 1 in place — test with https://securityheaders.com
- **HTTPS** everywhere; enforce. Verify no `http://` hardcoded links (`grep -rn "http://" *.php`).
- **Rate limiting** on POST (contact + quote) — add a simple rate-limit class (IP + DB counter).
- **Monitoring:** real uptime + recaptcha failures + 500s.
- **Periodic reviews:** re-run `02-security-plan.md` checks every month.
- **Renew SSL** automatically; monitor certificate expiry.

## It's live. Now run forward

The recommended order for you becomes:
1. `04-environment-setup.md` (local working copy)
2. `02-security-plan.md` (fix the holes)
3. `03-modernization-plan.md` (restructure, tests)
4. `05-deployment-checklist.md` (careful go-live + keep going)

Docs folder = your progress: tick each box as you finish. `01-code-review-findings.md` is the
"before" picture to delete when done.