# M5 Report — Blog & Content System (SEO Milestone)

**Status:** Complete · **Branch:** `feat/m5-blog` · **App:** `frontend/` (Next.js)

## Scope (from SEO brief, PDF sections 15–18)

Implement the blog hub and post template exactly as specified in
`Telal_Other_Pages_and_Blog_SEO_Content.pdf`, plus legacy URL preservation for
cutover (M10).

## What was built

### Blog data layer (`src/lib/blog.ts`)
- **Categories** — the 5 pillars from the brief: MEP & Maintenance Tips,
  Renovation & Fit-Out Guides, Smart Homes & Automation, Cost & Buying Guides,
  Company News & Projects. Each post has exactly **one category** (pills).
- **Sample article** — `/blog/how-often-service-ac-dubai`, full approved copy from
  PDF section 17 ("How Often Should You Service Your AC in Dubai? A Complete
  Guide"), no AI-added content:
  - Primary keyword: AC maintenance Dubai; secondary: AC service schedule Dubai,
    HVAC maintenance frequency, AC maintenance tips Dubai.
  - Meta description, intro paragraph, 5 H2 sections, sign list, closing CTA —
  all verbatim from the PDF.
  - Author `Telal Al Qema Team`, **6 min read**, featured image alt
  "HVAC technician servicing an air conditioning unit on a Dubai rooftop".
  - Internal links per template: **HVAC installation & maintenance** → `/services/hvac`
    and **Get a Free HVAC Quote** → `/contact`, plus AMC cross-reference in the
    closing CTA. (The brief's anchor formula for this post was
    "our HVAC installation and maintenance team", used as the inline CTA anchor.)
- **Read time** — `readTimeMinutes` per post, surfaced as "X min read".
- **12-post roadmap** — encoded as `relatedSlugs` on the sample article (AMC worth
  it, duct vs. coil cleaning, villa maintenance checklist). Related cards render
  only once each post exists, so no 404 links at launch.

### Blog hub (`src/app/blog/page.tsx`)
- Title **"Blog | Contracting, MEP & Renovation Tips | Telal Al Qema"**, meta
  description and H1 **"Guides & Insights for Dubai Property Owners"** from the brief.
- **Browse by Topic** filter — server-side filtering via `?category=<slug>`
  (async `searchParams` per Next 16 docs), so the grid is indexable with zero
  client JS.
- Recent Posts grid: featured image, category pill, date, read time, excerpt.

### Blog post template (`src/app/blog/[slug]/page.tsx`)
- Byline (author + publish date + **X min read** + category pill), featured image,
  CTA block now supports an **inline anchor** to a service page plus a custom
  button label/link.
- **Related Posts** section (rendered from existing posts only).
- **BlogPosting schema** upgraded: `timeRequired`, `articleSection`, plus existing
  `headline`, `datePublished`, `author`, `publisher`, `image`, `mainEntityOfPage`,
  `keywords`.

### Legacy URL preservation (`next.config.ts`)
- **301 redirects** from all legacy `.php` paths to the new routes
  (about, ourteam, contact, mainservices, hvac, electrical, plumbing, fitout,
  renovation, woodwork, tiling, ceiling, steel, glass, light, waterproof,
  cleaning, automatication, policy, term, refund, thankyou, detail, login, logout,
  register). `sendmailcontact.php`/`sendmailquotation.php` are **excluded**
  (they are POST handlers for the live legacy forms; retired at M10 cutover).

## Verification
- `npx tsc --noEmit` — clean.
- `npx eslint src` — clean.
- `npx next build` — clean; routes confirmed:
  `/blog`, `/blog/how-often-service-ac-dubai`, `/blog/annual-maintenance-contract-dubai-summer`,
  all 15 `/services/*`, `/about`, `/contact`, `/our-team`, `/sitemap.xml`.

## Deliberate decisions / deviations
1. **Related posts for the sample article** point to *planned* posts; the section
   hides empty results until those posts are published (prevents dead internal links).
2. **Login/register/detail redirect to `/`** — the legacy admin inbox
   (`detail.php`) is effectively public (broken login, see docs/02) and has no
   equivalent in the new site.
3. Category **archive pages** are not created (brief: "do NOT link category pages
   at launch"); the hub filter covers browsing.
4. Publish date **Aug 13, 2026** used for the sample post (today). Adjust
   `date`/`dateLabel` in `src/lib/blog.ts` before launch if a different date is wanted.

## Outstanding / next steps
- Publish remaining roadmap posts against the same template (structure is ready).
- Add real 1200×630 featured images per the alt-text formula when assets arrive.
- M10: remove `sendmail*.php` redirect exceptions and cut over the legacy domain.
- Nothing from this milestone touches the legacy PHP site.
