# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server at localhost:3000
npm run build     # Production build (static export to /out)
npm test          # Run tests (TypeScript compile + Node test runner)
npm start         # Start production server
```

The `postbuild` script runs automatically after `build` to generate `sitemap.xml`.

To run a single test file:
```bash
node --test utils/imageOptimization.test.ts
```

## Architecture

**Next.js 15 static export** (Pages Router, not App Router). Configured with `output: 'export'` in [next.config.js](next.config.js), which means no API routes, server-side rendering, or Next.js Image optimization. The site deploys to GitHub Pages via GitHub Actions.

### Data Flow

All site content lives in [constants/data.ts](constants/data.ts) — a single source of truth for experience, articles, conference talks, social links, and other structured data. TypeScript interfaces enforce the schema. Components import directly from this file; updating content means editing only `data.ts`.

### Key Patterns

- **Page wrapper:** [components/ContainerBlock.tsx](components/ContainerBlock.tsx) handles SEO metadata (meta tags, OG tags, canonical URLs) and wraps every page. When `customMeta.type === "article"` it also emits a `BlogPosting` JSON-LD block for Google rich results. Always pass `image`, `date`, and `type: "article"` in `customMeta` on article pages.
- **Image optimization:** Custom lazy loading via [utils/imageOptimization.ts](utils/imageOptimization.ts) and [components/OptimizedImage.tsx](components/OptimizedImage.tsx) with skeleton placeholders — used instead of Next.js `<Image>` (disabled for static export). Pass `priority={true}` for above-the-fold images; this sets both `loading="eager"` and `fetchPriority="high"`. The hero headshot is `public/headshot.webp` (800×800).
- **Analytics:** [utils/analytics.ts](utils/analytics.ts) wraps GA4 event tracking. Google Analytics is injected in [pages/_app.tsx](pages/_app.tsx) via `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- **Theming:** `next-themes` with `class`-based dark mode. Light and dark are a *token swap*, not a class fork — see Design System below.
- **Mobile nav:** [hooks/useSwipe.ts](hooks/useSwipe.ts) detects touch swipe gestures for the mobile menu.
- **Browserslist:** `package.json` targets Chrome/Edge 92+, Firefox 90+, Safari 15.4+ to avoid unnecessary ES2019–2022 polyfills in the production bundle.
- **Fonts:** Three self-hosted variable fonts in `fonts/`, latin subset, registered in [styles/fonts.css](styles/fonts.css): Inter (chrome/data), Instrument Sans (display), Source Serif 4 (prose, roman + italic, no `opsz` axis). 241KB total.

## Design System

**[DESIGN.md](DESIGN.md) is the contract. Read it before changing anything visual.** It is a
constraints file, not a style guide — the rules in §1 are non-negotiable and reviews enforce them.

- **Tokens:** semantic CSS custom properties in [styles/globals.css](styles/globals.css) (`--canvas`, `--ink`, `--accent`, …), mapped to Tailwind names in [tailwind.config.js](tailwind.config.js). Components reference semantic tokens only — never a raw hex, never a primitive.
- **`--rule` vs `--border-interactive`:** decorative dividers have no contrast requirement; interactive component boundaries need 3:1 (WCAG SC 1.4.11). Using `--rule` on a button border is a bug.
- **Verify colors:** `node tools/contrast.js` checks every token pair in both themes and exits non-zero on failure. Re-run it and update DESIGN.md §2.3 after any token change.
- **Site mark:** `node tools/favicon.js` generates the whole icon set — `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, `icon-192/512.png`, `site.webmanifest` — into `public/` from one geometry definition. The files are build output: never hand-edit them, and re-run the script after any change to `--ink` or the dark `--accent`. See DESIGN.md §6.1.
- **Primitives:** [components/primitives.tsx](components/primitives.tsx) holds `Container`, `Section`, `Kicker`, `SectionHeader`, `Action`, and `IndexRow`. The accent-usage rule and separation language live there so they're decided once.
- **Icons:** [components/Icons.tsx](components/Icons.tsx) — one set, 1.5px stroke on a 24px grid, functional only. No decorative icons, no emoji.
- **Tailwind constraints are structural:** `borderRadius` and `fontFamily` are *overridden*, not extended, so `rounded-xl` and `font-mono` do not exist.

`/advisory` is deferred to iteration 2 along with the copy pass — see DESIGN.md §12.

## Blogging

Hosted blog posts are written as markdown files in [posts/](posts/) and served at `/articles/[slug]`.

**To publish a new post:**
1. Create `posts/my-post-slug.md` with this frontmatter:
   ```markdown
   ---
   title: "Post Title"
   date: "2025-03-01"
   description: "Short summary shown in the feed."
   coverImage: ""
   ---
   Content here...
   ```
2. Run `npm run build` — the post is automatically included in the feed and sitemap.

**How it works:**
- [lib/posts.ts](lib/posts.ts) reads markdown files at build time using `gray-matter` (frontmatter) and `marked` (HTML conversion)
- [pages/articles.tsx](pages/articles.tsx) uses `getStaticProps` to merge hosted posts with external articles from `userData.articles`, sorted newest-first
- [pages/articles/[slug].tsx](pages/articles/[slug].tsx) renders individual posts and passes `image`, `date`, and `type: "article"` to `ContainerBlock` to enable article-specific OG tags and `BlogPosting` JSON-LD
- Post body styling lives in the `.post-body` CSS block in [styles/globals.css](styles/globals.css)
- The sitemap includes `<lastmod>` dates sourced from each post's frontmatter `date` field

External linked articles are managed in [constants/data.ts](constants/data.ts) under `userData.articles`.

## CI/CD

Two GitHub Actions workflows in `.github/workflows/`:

- **`ci.yml`** — Runs on pull requests and all non-`main` branch pushes. Runs `npm test` and `npm run build` to validate that the branch compiles and builds cleanly.
- **`deploy.yml`** — Triggers on push to `main` (and manual dispatch). Runs tests, builds the static export, then deploys to GitHub Pages via `actions/deploy-pages`. Node 20 is used in both workflows.

The deploy workflow passes `BASE_PATH: /${{ github.event.repository.name }}` as an env var and reads `NEXT_PUBLIC_GA_MEASUREMENT_ID` from repository variables or secrets.

## Environment Variables

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — Google Analytics 4 measurement ID (set as a GitHub repository variable or secret for CI/CD)
