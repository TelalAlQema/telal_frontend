# 03 — Modernization Plan (P1–P2)

Goal: keep the same features but restructure so it is testable, maintainable, and safe.
Do this **after** the P0 fixes in `02-security-plan.md`.

The headline change: **from "20 flat PHP pages" → one front controller + a small template/autoload
system.** No framework required if you do not want one; all steps work with plain PHP 8.

---

## Phase A — Single source of truth (config)

1. Create **one** bootstrap file `bootstrap.php`:
   - loads `.env`, creates `$db` (PDO), sets error handling, starts session with hard flags,
     sets `date_default_timezone_set('Asia/Dubai')`.
2. Every page currently including `server.php` → include `bootstrap.php` instead.
3. Delete `config.php` + `google_callback.php`.
4. Move DB, SMTP, reCAPTCHA, site URL into `.env` only.

## Phase B — Asset layer (removes ~90% of `<head>` duplication)

1. Create `include/head.php` and `include/footer.php` that contain the real `<head>` fragment +
   a small set of core scripts.
2. Each page becomes:
   ```php
   $title  = 'Home'; $description = '…'; $css = ['css/page.css']; 
   include __DIR__.'/include/head.php';
   ?>
   <!-- only this page's HTML -->
   <?php include __DIR__.'/include/footer.php'; ?>
   ```
3. Keep exactly ONE copy of jQuery, Bootstrap, FontAwesome (drop FA 5 + FA 6 double-load).

Example `include/head.php`:
```php
<?php $title = $title ?? 'Telal Al Qema Building Contracting'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/style.css">
    <?php foreach ($css ?? [] as $c) : ?>
        <link rel="stylesheet" href="<?= e($c) ?>">
    <?php endforeach; ?>
    <title><?= e($title) ?></title>
</head>
<body>
```

## Phase C — A tiny autoloader + service classes (P2)

Create `src/` with lightweight PSR-4 auto-loading (no composer yet if you want zero-dep):

`composer.json` (just for autoload + deps):
```json
{
  "require": {
    "php": ">=8.1"
  },
  "autoload": { "psr-4": { "App\\": "src/" } }
}
```

`src/Database.php` (PDO wrapper, singleton):
```php
namespace App;
class Database {
    public static function connect(): \PDO {
        $env = fn($k, $d=null) => $_ENV[$k] ?? getenv($k) ?: $d;
        $dsn = "mysql:host={$env('DB_HOST')}:3306;dbname={$env('DB_NAME')};charset=utf8mb4";
        return new \PDO($dsn, $env('DB_USER'), $env('DB_PASS'), [
            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
            \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
            \PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    }
}
```

`src/Mailer.php` (one class wrapping PHPMailer, used by both sendmail files):
```php
namespace App;
class Mailer {
    public static function send(string $to, string $subject, string $body, ?string $replyTo=null): bool { /* … */ }
}
```
`src/Validator.php`, `src/Security.php` (CSRF + `e()`), `src/ContactRequest.php` (repository).

Every handler then 5-lines reuse:
```php
$validator = new \App\Validator($_POST);
if ($validator->fails('name', 'email', 'phone')) { … }
\App\Mailer::send($email, 'Thank you', $body);
```

## Phase D — add a router (P2)

Instead of 22 pages that each render HTML, keep a **front controller**:
- `public/index.php`: `require bootstrap.php; $route = $router->dispatch($_SERVER['REQUEST_URI']);`
- Routes in `config/routes.php`:
  - `/about` → `AboutController::show`
  - `/contact` → `ContactController::show|submit`
  - `/detail` → `AdminInboxController` (must check `$_SESSION['open']`)
- Old files (`hvac.php`, `tiling.php`, …) become **views** only: `resources/views/hvac.html.php`.

Benefit: one entry of control (login check, CSRF, escaping) instead of per-file.

## Phase `MvcMinimal` notes (if you want a framework later)

PHP target PHP 8.2+, PDO, PHPUnit, PHPMailer. Consider: **Laravel** if you need a mature admin,
**Slim 4** if you want minimal and keep the look. Whichever: use Composer from day 1 (Phase C).

## Phase E — Manual dev tooling (P3, framework-agnostic)

1. **Composer** (https://getcomposer.org) — install once:
   ```
   php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
   php composer-setup.php --install-dir=bin --filename=composer
   php -r "unlink('composer-setup.php');"
   ```
2. **Code style:** `composer require --dev friendsofphp/php-cs-fixer` → `vendor/bin/php-cs-fixer fix src/`
3. **Static analysis:** `composer require --dev phpstan/phpstan` → `vendor/bin/phpstan analyse src --level 6`
4. **Tests:** `composer require --dev phpunit/phpunit` → add `tests/ContactRequestTest.php`
5. Add a `.gitignore`:
   ```
   /vendor/ .env  *.sql  /storage/logs/*.log
   ```

## Phase F — Logging & debugging

- Add `App\Log::error($msg, context)` writing to `storage/logs/app.log`.
- `display_errors = Off`, `log_errors = On` in production config.
- `errors_exception → 500.json/page` for public, real message to log.

---

## Step-by-step micro-plan for THIS codebase (do in order)

1. ✓ Setup local environment (see `04-environment-setup.md`).
2. Apply `02-security-plan.md` steps 0–8 to the CURRENT flat code.
3. Convert `login/register` to password_hash + prepared statements.
4. Make all service pages use `include/head.php` + `include/footer.php`.
5. Build `src/Database.php`, `Mailer.php`; refactor both sendmail files to use them.
6. Introduce routes file + `public/index.php`; move templates into `resources/views/`.
7. Add composer + php-cs-fixer + phpunit + phpstan; write first tests for ContactRequest & Auth.
8. Add CI (GitHub Actions): run phpstan + phpunit + cs-fixer on every push.