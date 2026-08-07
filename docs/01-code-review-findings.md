# 01 — Codebase Review (Findings)

Everything below is **real, verified issues found in this codebase**. When you read the file paths, look them up to confirm.

---

## A. CRITICAL SECURITY (P0)

### A1. Secrets committed / hardcoded in source (`sendmailquotation.php`)
```
sendmailquotation.php:46   $recaptcha_secret   = '…';   (real Google secret — hardcoded)
sendmailquotation.php:74-77 SMTP Host / Username / Password hardcoded (Gmail App Password)
sendmailquotation.php:88     hardcoded http://www.telal-contracting.com logo URL (mixed content on https)
.htaccess / .env in public web root
```
- `.env` (real DB + SMTP + reCAPTCHA secrets) sits inside `public_html` **web root**. Anyone who can
  request `/ .env` (or any directory-listing misconfiguration) steals the credentials.
- **Action:** Move `.env` above the web root; block it with `.htaccess`/Nginx regardless. **Rotate every
  password immediately** (DB, Gmail App Password, reCAPTCHA key) because they were shown in this repo.

### A2. Login is broken & open to everyone
`login.php:10` runs:
```php
$sql = "SELECT * FROM login where 'info@telal-contracting.com' = '$email' && 'telal786' = '$pass'";
```
The strings to compare are **literals**, not the submitted column values. `mysqli_fetch_array`
returns a row regardless of what the user typed → **any email + any password logs in**.
Also the password is stored in plain text and shown to anyone who reads the source.

### A3. SQL Injection everywhere
- `register.php:16-27` — string-concatenated query + `move_uploaded_file` to a hardcoded path.
- `login.php:10` — concatenated query.
- `detail.php:3` — `SELECT * FROM quotes` etc. (no params).
- `sendmailcontact.php` / `sendmailquotation.php` — these DO use prepared statements ✅, but the
  pattern is not consistent across the project.

### A4. File-upload RCE
- `register.php:24-28` uploads **any file type with the user-supplied filename** to a predictable path:
  `move_uploaded_file($temp_name1, "admin/user/$uimage");`
  → An attacker can upload a `.php` and execute it on the server. This must be removed or hardened
  (whitelist extensions + images `/`, random storage name, MIME validation).

### A5. Weak password storage
- `register.php:14` — `sha1()` is invalid. Use `password_hash()` for storage and `password_verify()`.

### A6. Output unescaped → Stored XSS
- `detail.php:133-143,169-178` — echoes `name`, `email`, `phone`, `services`, `comment` directly, and
  even embeds raw model values into `href=` attributes.
  → Anyone who submits a form with `<script>` can run JS in the admin panel.
- `login.php:42` and others echo messages into HTML without `htmlspecialchars()`, including message
  strings that include user input on some pages.

### A7. CSRF — no tokens
- Any POST form (`login`, `register`, contact, quote) has no CSRF token. Attacker can force a
  logged-in victim to submit the admin login or submit spam. Sessions never re-generated.

### A8. Sessions weak
- In `detail.php:24` a second `session_start()` runs after output began (notice/warning), cookie flags
  not set (no `HttpOnly`/`SameSite`/`Secure`), and `require` order is inconsistent.

### A9. `.htaccess` exposes sensitive files
- Only clean-URL rules exist. `.env`, `*.sql`, `config`, backups could be downloaded. Need deny rules
  (see `02`).

### A10. Other
- `google_callback.php` — empty, dead.
- `config.php` — empty, dead/disable.
- Duplicate `PHPMailer/` folders (root + `include/PHPMailer/`).

---

## B. ARCHITECTURE & QUALITY (P1–P2)

| Issue | Location | Fix direction |
|---|---|---|
| Flat `*.php` per page, no router | all pages | Single `index.php` front controller + route table |
| HTML + PHP mixed in every file | all pages | Template layer (`include/` partials), views |
| `<head>` duplicated ~20×, loads same libs 2–4× | every page | ONE shared `head.php` + a single asset bundle |
| Bootstrap 5.3.3 CDN **and** local bootstrap.min, jQuery v?? ×2, FA 5 + FA 6 both | headers | one pinned asset set |
| PASSWORD, DB URL, SMTP hardcoded vs `.env` | several | 100% via config/`getenv` |
| `mysqli` mixed OO + procedural | server.php rest | standardize on OO + prepared statements |
| No validation library | forms | server-side validation class/lift `filter_var`+validator |
| Path construction magic strings | everywhere | use `__DIR__`, central config |
| Email logic duplicated twice | two sendmail files | one `MailerService` |
| Table + column names raw strings throughout | detail.php | query builders / repository |
| Errors leaked | `server.php:78` uses generic response (good) but many errors still die() | logging + logger |
| SQL dump right inside web root | `u358308469_telalalqema.sql` | move out / gitignore |

---

## C. PERF, SEO, UX (P3–P4)

1. **Assets:** loading nearly every page pulls in far more CSS/JS than it needs (tinyMCE, layer slider, etc. capable). Split critical vs deferred, minify, cache.
2. **Images:** big unoptimized images (4.png 2.4MB, contracting.jpg 3.7MB, RetailCRM-02.png, several 10k+px) — compress to WebP, lazy otherwise.
3. **SEO:** most pages have generic/empty meta `description` and a leftover title "Real Estate PHP". Add unique titles+descriptions, Open Graph, canonical.
4. **Mixed content — hardcoded `http://` URL at sendmailquotation.php**
5. **A11y/UX:** missing `alt` on key images, raw `header.php` style/script injections, `<img>` missing width/height except a few.

---

## D. What's actually GOOD (keep it)

- `server.php` uses `mysqli_report(...STRICT)`, exception catch with generic response, `utf8mb4`, env-loading helper.
- `sendmailcontact.php` shows a good pattern: trim, validate, prepared statements, reCAPTCHA, PHPMailer + try/catch — **this is the pattern to reuse for everything**.
- `.env` loader now supports quoting; user-friendly alerts via SweetAlert2.
- Clean-url rewrite exists (good idea, incomplete usage).