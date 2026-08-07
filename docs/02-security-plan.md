# 02 — Security Hardening Plan (P0/P1)

> **Order matters.** Fix these in the order given. Do NOT deploy anything new until P0 is done.

---

## STEP 0 — Emergency: rotate secrets (do tonight)

1. Change the **database password** + the **Gmail App Password** (`sendmailquotation.php`, `server.php`).
2. Re-generate the **reCAPTCHA keys** (site + secret).
3. Delete `u.sql`, `.env`, `config.php`, `google_callback.php` from the web root OR add block rules
   (do both: edit the real files AND delete the dump from the web root).
4. **Never** put them back into git / web root.

---

## STEP 1 — Protect sensitive files (server side)

`.htaccess` (Apache) — add at the **top**:

```apache
# ---- Block sensitive files ----
<FilesMatch "^(\.env|\.git|\.sql|config.*\.php|server\.php|.*\.md)$">
  Require all denied
</FilesMatch>
<FilesMatch "\.(sql|log|bak|old|env)$">
  Require all denied
</FilesMatch>

# Deny direct access to hidden + include dirs
RedirectMatch 403 ^/(\.git|include|PHPMailer|docs)/

# Basic headers (mirror site only)
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Content-Security-Policy "default-src 'self'"
</IfModule>
```

If the host allows moving the doc root, put `.env` **outside** `public_html` (e.g. `~/env/.env`) and
update the path in `server.php`. This is the recommended long-term target.

---

## STEP 2 — Fix the authentication (replace `login.php`)

Replace the constant-compare hack with real user verification:

```php
// login.php — after POST
$stmt = $connect->prepare("SELECT uid, pass_hash, utype FROM login WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$user = $stmt->get_result()->fetch_assoc();

if ($user && password_verify($pass, $user['pass_hash'])) {
    session_regenerate_id(true);               // prevent session fixation
    $_SESSION['open']     = 1;
    $_SESSION['uid']      = $user['uid'];
    $_SESSION['utype']    = $user['utype'];
    header('Location: detail.php');
    exit;
}
// else invalid
```

- **Never** hardcode the user. store hashes (see STEP 4) and compare against DB.
- Use `session_regenerate_id(true)` after login.

## STEP 3 — Fix registration & password hashing

```php
$pass_hash = password_hash($pass, PASSWORD_DEFAULT);
// then prepared INSERT … (never concatenate)
```
Remove the arbitrary file upload entirely, or restrict to images only + random filename +
validate via `getimagesize()` + store **outside** the web root.

## STEP 4 — Fix SQL everywhere → Prepared statements only

Rule: **no `$` variables inside SQL strings, ever.**

Create `docs/step-4-sql-check.md` — a list of every query to convert. Search:
`grep -n "mysqli_query\|SELECT \* FROM\|INSERT INTO" *.php`
Convert each to prepared statements (`?` placeholders) exactly like `sendmailcontact.php` does now.

## STEP 5 — Output escaping everywhere you `echo`

- Every DB value echoed → `htmlspecialchars($value, ENT_QUOTES, 'UTF-8')` or an `e()` helper.
   `helper functions` shared:
  ```php
  function e(string $s): string { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }
  ```
- Every `href`/`src` from user input → `e()` + validate scheme (`mailto:`, `tel:`, `https:`).
- On `detail.php` escape **every** `$row[...]`.

## STEP 6 — CSRF + sessions across all forms

```php
// On every GET page that renders a form:
if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(32));
// On every POST handler first line:
if (!hash_equals($_SESSION['csrf'] ?? '', $_POST['csrf'] ?? '')) { die('Invalid token'); }
// In every form: <input type="hidden" name="csrf" value="<?= $_SESSION['csrf'] ?>">
```

Session cookie hardening in `server.php` **before `session_start()`**:

```php
session_set_cookie_params(['HttpOnly' => true, 'Secure' => true, 'SameSite' => 'Lax']);
```

## STEP 7 — Lock down file uploads (register.php)

- Dropped entirely if possible (the site only needs a contact/quote form).
- If kept: whitelist `jpg|png|webp`, random name, `getimagesize`, max size, store outside webroot.

## STEP 8 — Rate limiting & spam

- Add simple rate limit on contact/quote POST by IP (DB table or file).
- Add a **honeypot field** (hidden, must stay empty).
- For reCAPTCHA, use `curl` instead of `file_get_contents` (more reliable + no `allow_url_fopen` dependency).

---

### Verification

After STEP 1–6:
- [ ] `/sample` pages return 403 for `.env`, `.sql`, `docs/`
- [ ] Login only works with correct credentials; wrong credentials fail.
- [ ] `register` with an invalid image type is rejected; no `.php` file can be uploaded.
- [ ] Inspect: `curl -s http://site/detail.php` does not show session content if not logged in.
- [ ] All form fields show `htmlspecialchars` output — test with `<script>alert(1)</script>`.
- [ ] Old tokens rejected (submit a stale CSRF token).