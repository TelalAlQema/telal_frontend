---
name: telal-brand
description: Telal Al Qema brand palette, typography, and logo usage for the website rebuild (Next.js/Tailwind) and any design work. Use when building or styling the frontend, porting the legacy pages to components, creating marketing/banner assets, or choosing any color, font, button, header, or CTA treatment.
---

# Telal Al Qema — Brand & Design System

Brand-sourced design rules for the rebuild (`docs/06-08`). Source of truth for color is the legacy
theme file `css/color.css`; verify any new color here before using it.

## Logo color palette (verified from `css/color.css` / `css/style.css`)

| Token | Hex | Usage |
|---|---|---|
| **Primary — brand green** | `#17C788` | Site identity accent, headings accents, focus states, hover, active CTA borders |
| **Success/CTA green** (legacy Bootstrap) | `#4CAF50` | Buttons, form submit/`btn-success`, success messages — legacy default; prefer unifying to `#17C788` when styling the rebuild |
| **Secondary — dark navy** | `#0D1432` | Header bar (`bg-secondary`), text-on-light headings sometimes, dark section backgrounds |
| **Dark / footer** | `#091B4B` | Footer background + very dark sections |
| **Light bg** | `#F8F8F8` (gray `#F5F5F5`) | Page/light section backgrounds |
| **Neutral text** | `#74777B` | Ordinary body copy color (site default font color); dark text on light = `#0D1432` |
| **White** | `#FFFFFF` | Text on green/navy, cards on dark |

Rules that matter:
- Green **is the brand**, navy is the structural dark. Headers = navy/green; footer = `#091B4B`.
- **White text on `#17C788`** and on navy is safe; do **not** put `#17C788` text on a light-green/white background (illegible) — use `#0FA56B`-type darker variant for links on white if needed.
- Follow the legacy semantic tokens names where portfolio: `--theme-primary-color`, `--theme-secondary-color`, `--theme-dark-color`, `--theme-footer-color`.

## Typography

- Body: **Muli** (`--theme-ordinary-font: 'Muli', sans-serif`).
- Headings/accents: **Comfortaa** (`--theme-highlight-font`).
- Legacy loads both via Google Fonts. In the rebuild (`docs/07` NFR) these may be replaced with a
  modern system stack — keep the decision at M05 milestone, document it, don't silently mix families.

## Logo & icon assets (ROOT and `images/logo/`)

- `logo.png` (root), `Logo-01.png` (root), `images/logo/telal-logo.png` (nav header).
- `images/logo/title-telal.png` is the favicon asset used per page.
- Brand usage favors the white/transparent logo on the navy header; green accent around it.
- New renders: export at ≥ 2× DPI, keep transparent background, never recolor the logo.

## Using in the Next.js / Tailwind frontend

- Map tokens into one place: Tailwind `theme.extend.colors` or CSS custom properties, e.g.
  `brand: { primary:'#17C788', strong:'#0FA56F', secondary:'#0d1432', dark:'#091b4b', bg:'#f8f8f8', ink:'#74777B' }`.
- Header: navy or white; when white, active nav + hover glow `#17C788`.
- Buttons: primary `#17C788` with white text; secondary outline navy; hover → slightly darker `#16B57D`.
- Success states (styled like the old `btn-success`): use `#17C788`-family, keep `#4CAF50` only for
  Danger/confirm buttons already shipped.
- Forms/fields: light backgrounds `#F8F8F8`, borders `#E0E0E0`, focus-ring `#17C788`.

## Guardrails

- Never introduce new brand colors (no purple/orange/red) — accents stay green-on-navy.
- Never edit `css/color.css` token values casually; if the business changes brand color, update this
  skill + the token file together.
- Legacy duplicates (FontAwesome 5 / 6 both loading) are not brand — ignore old double-loads when extracting colors.