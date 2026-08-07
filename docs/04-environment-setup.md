# 04 — Environment Setup (XAMPP / PHP on Windows)

This gets you a working **local development copy** of `public_html`.

Choose: **XAMPP** (fastest all-in-one) or **dedicated PHP CLI** for Composer/PHPUnit later.

Recommended stack: **PHP 8.2+ / 8.3, MySQL 8 or MariaDB 10.4+ (XAMPP ships MariaDB), Apache 2.4**.
The current code targets legacy ~7.x; work toward PHP 8.x compatibility (your code is almost 8-ready).

---

## Option 1 — XAMPP (all-in-one, Windows)

1. Download XAMPP (Windows, PHP 8.2.x) from https://www.apachefriends.org
2. Run the installer (default `C:\xampp`).
3. Open the **XAMPP Control Panel** and:
   - Start **Apache** (port 80)
   - Start **MySQL**
4. Copy your site into the web root:
   ```
   C:\xampp\htdocs\public_html\
   ```
   So your URL is `http://localhost/public_html/`
   (You can also point Apache's DocumentRoot at the folder; simplest is htdocs.)
5. Verify: open `http://localhost/public_html/` — you should see the site's index page.

### Make .htaccess work
- `.htaccess` rewrite engine: ensure Apache > `httpd.conf` has:
  ```apache
  LoadModule rewrite_module modules/mod_rewrite.so
  ```
  (usually enabled by default). And in `<VirtualHost/Directory>` you may need a snippet:
  ```apache
  <Directory "C:/xampp/htdocs">
      Options Indexes FollowSymLinks
      AllowOverride All   ← this is the key one
      Require all granted
  </Directory>
  ```

## Option 2 — PHP default download (CLI tooling only)

For composer/phpunit/linting you want a PHP binary on `PATH`:
1. Grab PHP 8.x "Windows VS16 x64" (Non Thread Safe) from https://windows.php.net/download/
2. Unzip to `C:\php`
3. Copy `php.ini-production` → `php.ini`
4. Uncomment `extension_dir = "ext"`, `extension=mysqli`, `extension=pdo_mysql`,
   `extension=openssl`, `extension=gd`
5. Add `C:\php` to PATH. Verify:
   ```bash
   php -v
   composer --version          # after composer setup
   ```

---

## 1. Set up the database

1. In XAMPP, open `http://localhost/phpmyadmin/`
2. Create database `telalalqema` (collation `utf8mb4_general_ci`)
3. Import the existing dump `u.sql` via the "Import" tab.
   > NOTE: The dump contains your **production** DB credentials and data. For local only
   > you can import it, but then **delete it from the web root** (see security docs).

## 2. Configure `.env` for local

Create `/public_html/.env` (or better, place it ABOVE web_root as the shared hosts allow):

```
DB_HOST=127.0.0.1
DB_NAME=telalalqema
DB_USER=root
DB_PASS=
SMTP_HOST=smtp.gmail.com
SMTP_USER=YOU@Gmail.com
SMTP_PASS=YOU_APP_PASSWORD
SMTP_PORT=587
RECAPTCHA_SITEKEY=your_site_key
RECAPTCHA_SECRET=your_secret
```

> One `root` without password `locally` is fine for dev. Your live `.env` will use the real
> credentials that you rotated after the security fix. Never commit `.env`.

> If SMTP fails locally, options: use your Gmail "App Password" (not your Gmail password),
> or temporarily set `SMTP_PASS` blank and skip send in code for testing. Gmail requires 2FA.
> Consider SMTP reset-aware test account (e.g. `https://ethereal.email` for throwaway SMTP).

## 3. Apply the security fixes BEFORE going to prod

Follow `docs/02-security-plan.md`:
- delete/block `config.php`, `google_callback.php`, `.env`, `*.sql`
- replace the hardcoded login check with real password_verify
- use prepared statements
- add CSRF tokens
- escape all output
- no SQL dumps in the web root

---

## Common local issues & fixes

| Problem | Fix |
|---|---|
| `mysqli` undefined | enable `extension=mysqli` in `C:\php\php.ini`, restart Apache |
| `Undefined array key …` PHP8 warnings | fix code (check with `isset`/`??`), don't silence |
| `.htaccess` gives 500 / "AllowOverride" | ensure `AllowOverride All` for htdocs |
| port 80 busy (Skype/IIS) | XAMPP > Apache > Config > httpd.conf, change `Listen 80` → `Listen 8080`, open localhost:8080 |
| reCAPTCHA fails locally | use test keys from https://developers.google.com/recaptcha/docs/faq#local-dev |
| `allow_url_fopen` issues with `file_get_contents` | keep it on OR swap to curl (recommended) |

---

## Local environment summary for dev process

Create a simple `Makefile` or `composer scripts`:
```bash
# in terminal, from project root
composer install       # after adding composer.json
vendor/bin/php-cs-fixer fix src   # style
vendor/bin/phpstan analyse src    # analysis
vendor/bin/phpunit tests/    # tests
```

Start coding step 2 → `docs/02-security-plan.md`.